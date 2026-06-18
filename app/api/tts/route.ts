import { NextRequest, NextResponse } from "next/server";

// ── Gemini TTS Configuration ──
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_TTS_MODEL = "gemini-2.5-flash-tts";

// PCM audio specs from Gemini TTS (signed 16-bit, 24kHz, mono)
const SAMPLE_RATE = 24000;
const BITS_PER_SAMPLE = 16;
const NUM_CHANNELS = 1;

// ── Supported Gemini Prebuilt Voices ──
// All 30 verified voices from gemini-2.5-flash-tts
const GEMINI_VOICE_MAP: Record<string, string> = {
  // Named voices mapped to Gemini voice names
  aarav:  "Kore",          // Male, Natural/Firm
  meera:  "Zephyr",        // Female, Calm/Bright
  rohan:  "Puck",          // Male, Professional/Upbeat
  anika:  "Leda",          // Female, Friendly/Youthful
  aryan:  "Charon",        // Male, Confident/Deep
  kavya:  "Aoede",         // Female, Clear/Musical
  dev:    "Fenrir",        // Male, Strong
  priya:  "Sulafat",       // Female, Warm
};

// Fallback Gemini voices if a requested voice is not in the map
const DEFAULT_CALLER_VOICE = "Kore";
const DEFAULT_AGENT_VOICE  = "Zephyr";

/**
 * Maps a frontend voice ID to a valid Gemini voice name.
 * Falls back to default if the ID is not found.
 */
function resolveGeminiVoice(voiceId: string | undefined, isAgent: boolean): string {
  if (!voiceId) return isAgent ? DEFAULT_AGENT_VOICE : DEFAULT_CALLER_VOICE;
  const resolved = GEMINI_VOICE_MAP[voiceId.toLowerCase()];
  if (!resolved) {
    console.warn(`Unknown voice ID "${voiceId}", falling back to default.`);
    return isAgent ? DEFAULT_AGENT_VOICE : DEFAULT_CALLER_VOICE;
  }
  return resolved;
}

// ── WAV Helpers ──

function createWavHeader(pcmDataLength: number): Buffer {
  const header = Buffer.alloc(44);
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

// ── Gemini Speech Generation ──

async function generateSpeech(
  text: string,
  voiceName: string,
  apiKey: string
): Promise<Buffer> {
  const url = `${GEMINI_API_BASE}/${GEMINI_TTS_MODEL}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text }] }],
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
    const errorText = await response.text();
    console.error(`Gemini TTS API error (${response.status}) voice="${voiceName}":`, errorText);
    throw new Error(`Gemini TTS API returned ${response.status}`);
  }

  const data = await response.json();
  const candidates = data?.candidates;

  if (!candidates?.length) throw new Error("No candidates in Gemini TTS response");

  const parts = candidates[0]?.content?.parts;
  if (!parts?.length) throw new Error("No parts in Gemini TTS response");

  const audioPart = parts.find(
    (p: { inlineData?: { mimeType: string; data: string } }) =>
      p.inlineData?.mimeType?.startsWith("audio/")
  );

  if (!audioPart?.inlineData?.data)
    throw new Error("No audio data in Gemini TTS response");

  return Buffer.from(audioPart.inlineData.data, "base64");
}

// ── Route Handler ──

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json({ error: "TTS service not configured" }, { status: 503 });
    }

    const body = await req.json();
    const { callerText, agentText, callerVoice, agentVoice } = body;

    if (!callerText || !agentText) {
      return NextResponse.json(
        { error: "Missing callerText or agentText" },
        { status: 400 }
      );
    }

    // Resolve voice names (with fallback safety)
    const resolvedCallerVoice = resolveGeminiVoice(callerVoice, false);
    const resolvedAgentVoice  = resolveGeminiVoice(agentVoice, true);

    console.log(`TTS: caller="${resolvedCallerVoice}", agent="${resolvedAgentVoice}"`);

    // Generate both audio segments in parallel
    const [callerPcm, agentPcm] = await Promise.all([
      generateSpeech(callerText, resolvedCallerVoice, apiKey),
      generateSpeech(agentText,  resolvedAgentVoice,  apiKey),
    ]);

    // Concatenate: caller + 1.5s silence + agent
    const silenceGap     = generateSilence(1500);
    const combinedPcm    = Buffer.concat([callerPcm, silenceGap, agentPcm]);
    const wavHeader      = createWavHeader(combinedPcm.length);
    const wavFile        = Buffer.concat([wavHeader, combinedPcm]);

    // Compute exact timing for frontend visual sync
    const bytesPerMs       = (SAMPLE_RATE * (BITS_PER_SAMPLE / 8)) / 1000;
    const callerDurationMs = Math.floor(callerPcm.length / bytesPerMs);
    const agentDurationMs  = Math.floor(agentPcm.length  / bytesPerMs);

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
        "Cache-Control":        "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("TTS generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate audio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
