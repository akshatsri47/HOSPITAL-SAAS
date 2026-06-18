import { NextRequest, NextResponse } from "next/server";

// ── Gemini TTS Configuration ──
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_TTS_MODEL = "gemini-2.5-flash-tts";

// PCM audio specs from Gemini TTS (signed 16-bit, 24kHz, mono)
const SAMPLE_RATE = 24000;
const BITS_PER_SAMPLE = 16;
const NUM_CHANNELS = 1;

// ── Verified Gemini Prebuilt Voices (30 total, all confirmed for gemini-2.5-flash-tts) ──
const GEMINI_VOICE_MAP: Record<string, string> = {
  aarav: "Kore",     // Male, Natural/Firm
  meera: "Zephyr",   // Female, Calm/Bright
  rohan: "Puck",     // Male, Professional/Upbeat
  anika: "Leda",     // Female, Friendly/Youthful
  aryan: "Charon",   // Male, Confident/Deep
  kavya: "Aoede",    // Female, Clear/Musical
  dev:   "Fenrir",   // Male, Strong
  priya: "Sulafat",  // Female, Warm
};

const DEFAULT_CALLER_VOICE = "Kore";
const DEFAULT_AGENT_VOICE  = "Zephyr";

// ── Language display names for Gemini prompt ──
const LANGUAGE_NAMES: Record<string, string> = {
  "en-IN": "English",
  "hi-IN": "Hindi",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "es-ES": "Spanish",
  "de-DE": "German",
};

function resolveGeminiVoice(voiceId: string | undefined, isAgent: boolean): string {
  if (!voiceId) return isAgent ? DEFAULT_AGENT_VOICE : DEFAULT_CALLER_VOICE;
  const resolved = GEMINI_VOICE_MAP[voiceId.toLowerCase()];
  if (!resolved) {
    console.warn(`[TTS] Unknown voice ID "${voiceId}", using default`);
    return isAgent ? DEFAULT_AGENT_VOICE : DEFAULT_CALLER_VOICE;
  }
  return resolved;
}

// ── WAV helpers ──

function createWavHeader(pcmDataLength: number): Buffer {
  const header     = Buffer.alloc(44);
  const byteRate   = SAMPLE_RATE * NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  const blockAlign = NUM_CHANNELS * (BITS_PER_SAMPLE / 8);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcmDataLength, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(NUM_CHANNELS, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(BITS_PER_SAMPLE, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcmDataLength, 40);
  return header;
}

function generateSilence(durationMs: number): Buffer {
  const numSamples = Math.floor((SAMPLE_RATE * durationMs) / 1000);
  return Buffer.alloc(numSamples * (BITS_PER_SAMPLE / 8));
}

// ── Gemini speech generation ──

async function generateSpeech(
  text: string,
  voiceName: string,
  languageName: string,
  apiKey: string
): Promise<Buffer> {
  const url = `${GEMINI_API_BASE}/${GEMINI_TTS_MODEL}:generateContent?key=${apiKey}`;

  // Instruct Gemini to speak in the correct language using the exact provided text
  const promptText = `Speak naturally in ${languageName}. Read exactly this text aloud as spoken conversation: ${text}`;

  const requestBody = {
    contents: [{ parts: [{ text: promptText }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName },
        },
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    // Log full error server-side (safe — API key is in URL param only, not in logs)
    let errorBody = "(unreadable)";
    try { errorBody = await response.text(); } catch { /* ignore */ }
    console.error(
      `[TTS] Gemini API error — status=${response.status} voice=${voiceName} lang=${languageName}`,
      errorBody.slice(0, 500) // truncate to avoid log bloat
    );
    throw new Error(`Gemini API responded with HTTP ${response.status}`);
  }

  const data = await response.json();
  const candidates = data?.candidates;

  if (!candidates?.length) {
    console.error("[TTS] Gemini returned no candidates. Full response:", JSON.stringify(data).slice(0, 500));
    throw new Error("No candidates in Gemini response");
  }

  const parts = candidates[0]?.content?.parts;
  if (!parts?.length) {
    throw new Error("No content parts in Gemini response");
  }

  const audioPart = parts.find(
    (p: { inlineData?: { mimeType: string; data: string } }) =>
      p.inlineData?.mimeType?.startsWith("audio/")
  );

  if (!audioPart?.inlineData?.data) {
    console.error("[TTS] No audio inlineData found in parts:", JSON.stringify(parts).slice(0, 500));
    throw new Error("No audio data in Gemini response");
  }

  console.log(`[TTS] ✓ Audio generated — voice=${voiceName} lang=${languageName} size=${audioPart.inlineData.data.length} chars (base64)`);
  return Buffer.from(audioPart.inlineData.data, "base64");
}

// ── Route handler ──

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[TTS] GEMINI_API_KEY is missing from environment");
      return NextResponse.json(
        { error: "TTS service not configured", details: "GEMINI_API_KEY not set" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const {
      callerText,
      agentText,
      callerVoice,
      agentVoice,
      language = "en-IN",
      industry = "unknown",
    } = body;

    if (!callerText || typeof callerText !== "string") {
      return NextResponse.json({ error: "Missing or invalid callerText" }, { status: 400 });
    }
    if (!agentText || typeof agentText !== "string") {
      return NextResponse.json({ error: "Missing or invalid agentText" }, { status: 400 });
    }

    const resolvedCallerVoice = resolveGeminiVoice(callerVoice, false);
    const resolvedAgentVoice  = resolveGeminiVoice(agentVoice, true);
    const languageName        = LANGUAGE_NAMES[language] ?? "English";

    console.log(
      `[TTS] Request — industry=${industry} lang=${language}(${languageName}) callerVoice=${resolvedCallerVoice} agentVoice=${resolvedAgentVoice}`
    );

    // Generate both audio segments in parallel
    const [callerPcm, agentPcm] = await Promise.all([
      generateSpeech(callerText, resolvedCallerVoice, languageName, apiKey),
      generateSpeech(agentText,  resolvedAgentVoice,  languageName, apiKey),
    ]);

    // Concatenate: caller + 1.5s silence + agent
    const silenceGap  = generateSilence(1500);
    const combinedPcm = Buffer.concat([callerPcm, silenceGap, agentPcm]);
    const wavHeader   = createWavHeader(combinedPcm.length);
    const wavFile     = Buffer.concat([wavHeader, combinedPcm]);

    // Compute exact timing for frontend visual sync
    const bytesPerMs       = (SAMPLE_RATE * (BITS_PER_SAMPLE / 8)) / 1000;
    const callerDurationMs = Math.floor(callerPcm.length / bytesPerMs);
    const agentDurationMs  = Math.floor(agentPcm.length  / bytesPerMs);

    console.log(
      `[TTS] ✓ Complete — callerMs=${callerDurationMs} agentMs=${agentDurationMs} totalBytes=${wavFile.length} elapsed=${Date.now() - startTime}ms`
    );

    return new NextResponse(wavFile, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": wavFile.length.toString(),
        "X-Caller-Duration-Ms": callerDurationMs.toString(),
        "X-Agent-Duration-Ms":  agentDurationMs.toString(),
        "X-Silence-Gap-Ms":     "1500",
        "X-Caller-Voice":       resolvedCallerVoice,
        "X-Agent-Voice":        resolvedAgentVoice,
        "X-Audio-Source":       "gemini-tts",
        // Do not cache — each request may use different voice/language
        "Cache-Control":        "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[TTS] ✗ Failed after ${Date.now() - startTime}ms:`, message);
    return NextResponse.json(
      { error: "Gemini TTS failed", details: message },
      { status: 500 }
    );
  }
}
