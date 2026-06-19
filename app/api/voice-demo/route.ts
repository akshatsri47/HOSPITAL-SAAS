import { NextRequest, NextResponse } from "next/server";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const ARIA_PROMPT = `You are Aria, a professional AI receptionist for Xyras — an AI voice calling platform.

Rules (follow strictly):
- Respond in 1-2 SHORT sentences only. Max 25 words. Conversational phone tone.
- If the message is empty or a greeting, say: "Hi! This is Aria from Xyras. How can I help you today?"
- You can book appointments, qualify leads, and answer support questions.
- Be warm, clear, and human-like. Never say you're a language model.
- You are a live AI receptionist on a demo call.`;

function loadKeys(): string[] {
  const keys: string[] = [];
  const k1 = process.env.GEMINI_API_KEY?.trim();
  if (k1) keys.push(k1);
  for (let i = 2; i <= 5; i++) {
    const k = process.env[`GEMINI_API_KEY_${i}`]?.trim();
    if (k && k.length > 10) keys.push(k);
  }
  return keys;
}

function maskKey(k: string) { return k.length > 10 ? `${k.slice(0, 6)}...${k.slice(-4)}` : "****"; }

interface HistoryItem { role: "user" | "aria"; text: string }

async function generateText(userText: string, history: HistoryItem[], apiKey: string): Promise<string | null> {
  const contents = [
    ...history.map(h => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: userText || "Hello" }] },
  ];

  try {
    const res = await fetch(`${GEMINI_BASE}/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: ARIA_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 80, temperature: 0.8 },
      }),
    });
    if (!res.ok) { console.error("[VoiceDemo] Text gen failed:", res.status); return null; }
    const data = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch (e) {
    console.error("[VoiceDemo] Text gen network error:", e);
    return null;
  }
}

const TTS_MODELS = ["gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts", "gemini-3.1-flash-tts-preview"];

async function generateSpeech(text: string, apiKey: string): Promise<Buffer | null> {
  const masked = maskKey(apiKey);

  for (const model of TTS_MODELS) {
    const url = `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`;

    for (const snake of [true, false]) {
      const body = snake
        ? { contents: [{ parts: [{ text }] }], generationConfig: { response_modalities: ["AUDIO"], speech_config: { voice_config: { prebuilt_voice_config: { voice_name: "Zephyr" } } } } }
        : { contents: [{ parts: [{ text }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } } } } };

      try {
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

        if (res.ok) {
          const data = await res.json() as { candidates?: { content?: { parts?: { inlineData?: { data: string } }[] } }[] };
          const b64 = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (b64) { console.log(`[VoiceDemo] TTS ✓ key(${masked}) model=${model} fmt=${snake ? "snake" : "camel"}`); return Buffer.from(b64, "base64"); }
        }
        const status = res.status;
        if (status === 429) return null;
        if (status === 404) break;
        if (status === 400) { const t = await res.text(); if (t.includes("generate text")) continue; break; }
        break;
      } catch { break; }
    }
  }
  return null;
}

function makeWav(pcm: Buffer): Buffer {
  const SR = 24000, BPS = 16, CH = 1;
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8);
  h.write("fmt ", 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20);
  h.writeUInt16LE(CH, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * CH * BPS / 8, 28);
  h.writeUInt16LE(CH * BPS / 8, 32); h.writeUInt16LE(BPS, 34);
  h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

export async function POST(req: NextRequest) {
  const keys = loadKeys();
  if (!keys.length) return NextResponse.json({ error: "No API keys configured" }, { status: 503 });

  let body: { userText?: string; history?: HistoryItem[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const userText = (body.userText ?? "").trim();
  const history  = body.history ?? [];

  // Step 1: Generate text response
  let aiText: string | null = null;
  for (const key of keys) {
    aiText = await generateText(userText, history, key);
    if (aiText) break;
  }
  if (!aiText) aiText = "Hi! This is Aria from Xyras. How can I help you today?";

  console.log(`[VoiceDemo] Aria: "${aiText}"`);

  // Step 2: Generate speech
  let pcm: Buffer | null = null;
  for (const key of keys) {
    pcm = await generateSpeech(aiText, key);
    if (pcm) break;
  }

  if (!pcm) {
    // TTS unavailable — return text only so frontend can use SpeechSynthesis
    return NextResponse.json({ text: aiText, audioFailed: true });
  }

  const wav = makeWav(pcm);
  return new NextResponse(new Uint8Array(wav), {
    status: 200,
    headers: {
      "Content-Type": "audio/wav",
      "X-Aria-Response": encodeURIComponent(aiText),
      "Cache-Control": "no-store",
    },
  });
}
