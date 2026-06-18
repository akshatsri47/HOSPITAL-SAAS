import { NextRequest, NextResponse } from "next/server";

// ── Gemini TTS Configuration ──
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * TTS model candidates — tried in order until one responds (not 404).
 * gemini-2.5-flash-preview-tts is the primary working model for this key type.
 */
const TTS_MODEL_CANDIDATES = [
  "gemini-2.5-flash-preview-tts",
  "gemini-2.5-pro-preview-tts",
  "gemini-3.1-flash-tts-preview",
];

// PCM audio specs from Gemini TTS
const SAMPLE_RATE     = 24000;
const BITS_PER_SAMPLE = 16;
const NUM_CHANNELS    = 1;

// ── Verified Gemini Prebuilt Voices ──
const GEMINI_VOICE_MAP: Record<string, string> = {
  aarav: "Kore",
  meera: "Zephyr",
  rohan: "Puck",
  anika: "Leda",
  aryan: "Charon",
  kavya: "Aoede",
  dev:   "Fenrir",
  priya: "Sulafat",
};

const DEFAULT_CALLER_VOICE = "Kore";
const DEFAULT_AGENT_VOICE  = "Zephyr";

const LANGUAGE_NAMES: Record<string, string> = {
  "en-IN": "English",
  "hi-IN": "Hindi",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "es-ES": "Spanish",
  "de-DE": "German",
};

// ─────────────────────────────────────────────────────────
//  API Key Pool — reads up to 5 keys from environment
// ─────────────────────────────────────────────────────────

function loadApiKeys(): string[] {
  const keys: string[] = [];

  // Primary key (backward compatible)
  if (process.env.GEMINI_API_KEY?.trim()) {
    keys.push(process.env.GEMINI_API_KEY.trim());
  }

  // Additional rotation keys
  for (let i = 2; i <= 5; i++) {
    const key = process.env[`GEMINI_API_KEY_${i}`]?.trim();
    if (key && key.length > 10) {
      keys.push(key);
    }
  }

  return keys;
}

function maskKey(key: string): string {
  if (key.length <= 10) return "****";
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

// ─────────────────────────────────────────────────────────
//  WAV helpers
// ─────────────────────────────────────────────────────────

function createWavHeader(pcmLen: number): Buffer {
  const h          = Buffer.alloc(44);
  const byteRate   = SAMPLE_RATE * NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  const blockAlign = NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + pcmLen, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(NUM_CHANNELS, 22);
  h.writeUInt32LE(SAMPLE_RATE, 24);
  h.writeUInt32LE(byteRate, 28);
  h.writeUInt16LE(blockAlign, 32);
  h.writeUInt16LE(BITS_PER_SAMPLE, 34);
  h.write("data", 36);
  h.writeUInt32LE(pcmLen, 40);
  return h;
}

function generateSilence(ms: number): Buffer {
  return Buffer.alloc(Math.floor((SAMPLE_RATE * ms) / 1000) * (BITS_PER_SAMPLE / 8));
}

function resolveVoice(id: string | undefined, isAgent: boolean): string {
  if (!id) return isAgent ? DEFAULT_AGENT_VOICE : DEFAULT_CALLER_VOICE;
  return GEMINI_VOICE_MAP[id.toLowerCase()] ?? (isAgent ? DEFAULT_AGENT_VOICE : DEFAULT_CALLER_VOICE);
}

// ─────────────────────────────────────────────────────────
//  Core Gemini TTS — with per-request key + model fallback
// ─────────────────────────────────────────────────────────

interface SpeechSuccess { pcm: Buffer; modelUsed: string; keyIndex: number }
interface SpeechFailure { error: string; isQuota: boolean; allKeysExhausted?: boolean }

/**
 * Attempts to generate speech using the provided API keys in rotation.
 * On 429 (quota exceeded): automatically tries the next key.
 * On 404 (model not found): tries the next model candidate.
 * On other errors (400, 401, 403): returns error immediately.
 */
async function generateSpeechWithRotation(
  text: string,
  voiceName: string,
  apiKeys: string[]
): Promise<SpeechSuccess | SpeechFailure> {
  // CRITICAL: Gemini TTS prompt must be PURE TEXT — no meta-instructions.
  const promptText = text.trim();

  /**
   * Different key types need different field-name formats:
   *   AIzaSy... (Google Cloud) → camelCase: responseModalities, speechConfig...
   *   AQ.Ab8... (AI Studio)   → snake_case: response_modalities, speech_config...
   * We try snake_case first, then camelCase on 400 "generate text" error.
   */
  const buildBody = (snake: boolean) => snake
    ? {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          response_modalities: ["AUDIO"],
          speech_config: { voice_config: { prebuilt_voice_config: { voice_name: voiceName } } },
        },
      }
    : {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } },
        },
      };

  // Outer loop: API keys
  for (let ki = 0; ki < apiKeys.length; ki++) {
    const apiKey = apiKeys[ki];
    const masked = maskKey(apiKey);
    let keyQuotaExhausted = false;

    // Middle loop: model candidates
    modelLoop: for (const model of TTS_MODEL_CANDIDATES) {
      const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`;

      // Inner loop: request formats (snake_case first, camelCase as fallback)
      for (const useSnake of [true, false]) {
        const fmt = useSnake ? "snake" : "camel";
        console.log(`[TTS] key[${ki + 1}/${apiKeys.length}](${masked}) model="${model}" fmt=${fmt} voice="${voiceName}"`);

        let res: Response;
        try {
          res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildBody(useSnake)),
          });
        } catch (netErr) {
          const msg = netErr instanceof Error ? netErr.message : String(netErr);
          console.error(`[TTS] Network error key[${ki + 1}] model="${model}" fmt=${fmt}:`, msg);
          continue modelLoop; // skip this model entirely
        }

        if (!res.ok) {
          let rawBody = "";
          try { rawBody = await res.text(); } catch { /* ignore */ }
          let geminiMsg = `HTTP ${res.status}`;
          try {
            const p = JSON.parse(rawBody) as { error?: { message?: string } };
            if (p?.error?.message) geminiMsg = p.error.message;
          } catch { /* not JSON */ }

          console.error(`[TTS] key[${ki + 1}] model="${model}" fmt=${fmt} → HTTP ${res.status}: ${geminiMsg.slice(0, 150)}`);

          if (res.status === 404) {
            continue modelLoop; // model not found — next model
          }
          if (res.status === 429) {
            console.warn(`[TTS] key[${ki + 1}](${masked}) quota exceeded — next key`);
            keyQuotaExhausted = true;
            break modelLoop;
          }
          if (res.status === 400 && geminiMsg.includes("generate text")) {
            // Wrong format — try the other format
            console.warn(`[TTS] key[${ki + 1}] 400 "generate text" with ${fmt} — retrying with ${useSnake ? "camel" : "snake"}`);
            continue; // try next format
          }
          if (res.status === 401 || res.status === 403) {
            // Invalid/no-permission key — skip to next key
            console.warn(`[TTS] key[${ki + 1}](${masked}) auth error ${res.status} — skipping key`);
            keyQuotaExhausted = false;
            break modelLoop;
          }
          // Other errors — return immediately
          return { error: geminiMsg, isQuota: false };
        }

        // Success — parse audio
        const data = await res.json() as {
          candidates?: { content?: { parts?: { inlineData?: { mimeType: string; data: string } }[] } }[]
        };
        const parts    = data?.candidates?.[0]?.content?.parts ?? [];
        const audioPart = parts.find(p => p.inlineData?.mimeType?.startsWith("audio/"));

        if (!audioPart?.inlineData?.data) {
          console.error(`[TTS] key[${ki + 1}] model="${model}" fmt=${fmt} → 200 OK but no audio data`);
          continue modelLoop;
        }

        const pcm = Buffer.from(audioPart.inlineData.data, "base64");
        console.log(`[TTS] ✓ key[${ki + 1}](${masked}) model="${model}" fmt=${fmt} voice="${voiceName}" pcmBytes=${pcm.length}`);
        return { pcm, modelUsed: model, keyIndex: ki + 1 };
      } // end format loop
    } // end model loop

    if (!keyQuotaExhausted) break; // non-quota failure — give up
  } // end key loop

  return { error: "All API keys have exceeded their quota", isQuota: true, allKeysExhausted: true };
}

// ─────────────────────────────────────────────────────────
//  Route Handler
// ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const t0 = Date.now();

  // Load all configured keys
  const apiKeys = loadApiKeys();

  if (apiKeys.length === 0) {
    console.error("[TTS] No API keys configured");
    return NextResponse.json(
      { error: "TTS service not configured", details: "No GEMINI_API_KEY set in environment" },
      { status: 503 }
    );
  }

  console.log(`[TTS] Using ${apiKeys.length} API key(s): [${apiKeys.map((k, i) => `${i + 1}:${maskKey(k)}`).join(", ")}]`);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    callerText,
    agentText,
    callerVoice,
    agentVoice,
    language = "en-IN",
    industry = "unknown",
  } = body as {
    callerText?: string; agentText?: string;
    callerVoice?: string; agentVoice?: string;
    language?: string; industry?: string;
  };

  if (!callerText || typeof callerText !== "string" || !callerText.trim()) {
    return NextResponse.json({ error: "Missing callerText" }, { status: 400 });
  }
  if (!agentText || typeof agentText !== "string" || !agentText.trim()) {
    return NextResponse.json({ error: "Missing agentText" }, { status: 400 });
  }

  const resolvedCaller = resolveVoice(callerVoice as string | undefined, false);
  const resolvedAgent  = resolveVoice(agentVoice  as string | undefined, true);
  const languageName   = LANGUAGE_NAMES[language as string] ?? "English";

  console.log(
    `[TTS] Request — industry="${industry}" lang="${language}"(${languageName}) ` +
    `callerVoice="${resolvedCaller}" agentVoice="${resolvedAgent}" ` +
    `callerLen=${callerText.length} agentLen=${agentText.length}`
  );

  // Generate caller and agent audio in parallel (each with key rotation)
  const [callerResult, agentResult] = await Promise.all([
    generateSpeechWithRotation(callerText, resolvedCaller, apiKeys),
    generateSpeechWithRotation(agentText,  resolvedAgent,  apiKeys),
  ]);

  // Check for failures
  if ("error" in callerResult) {
    const status = callerResult.isQuota ? 429 : 502;
    console.error(`[TTS] ✗ Caller audio failed (quota=${callerResult.isQuota}):`, callerResult.error);
    return NextResponse.json(
      {
        error: callerResult.allKeysExhausted ? "All API keys quota exceeded" : "Gemini TTS failed",
        details: callerResult.error,
        isQuota: callerResult.isQuota,
      },
      { status }
    );
  }

  if ("error" in agentResult) {
    const status = agentResult.isQuota ? 429 : 502;
    console.error(`[TTS] ✗ Agent audio failed (quota=${agentResult.isQuota}):`, agentResult.error);
    return NextResponse.json(
      {
        error: agentResult.allKeysExhausted ? "All API keys quota exceeded" : "Gemini TTS failed",
        details: agentResult.error,
        isQuota: agentResult.isQuota,
      },
      { status }
    );
  }

  // ── Assemble WAV ──
  const silence   = generateSilence(1500);
  const combined  = Buffer.concat([callerResult.pcm, silence, agentResult.pcm]);
  const wavHeader = createWavHeader(combined.length);
  const wavFile   = Buffer.concat([wavHeader, combined]);

  const bytesPerMs       = (SAMPLE_RATE * (BITS_PER_SAMPLE / 8)) / 1000;
  const callerDurationMs = Math.floor(callerResult.pcm.length / bytesPerMs);
  const agentDurationMs  = Math.floor(agentResult.pcm.length  / bytesPerMs);

  console.log(
    `[TTS] ✓ Done — callerMs=${callerDurationMs} agentMs=${agentDurationMs} ` +
    `wavBytes=${wavFile.length} callerKey=${callerResult.keyIndex} agentKey=${agentResult.keyIndex} ` +
    `elapsed=${Date.now() - t0}ms`
  );

  return new NextResponse(wavFile, {
    status: 200,
    headers: {
      "Content-Type":          "audio/wav",
      "Content-Length":        wavFile.length.toString(),
      "X-Caller-Duration-Ms":  callerDurationMs.toString(),
      "X-Agent-Duration-Ms":   agentDurationMs.toString(),
      "X-Silence-Gap-Ms":      "1500",
      "X-Caller-Voice":        resolvedCaller,
      "X-Agent-Voice":         resolvedAgent,
      "X-Model-Used":          callerResult.modelUsed,
      "X-Keys-Used":           `${apiKeys.length}`,
      "X-Audio-Source":        "gemini-tts",
      "Cache-Control":         "no-store",
    },
  });
}
