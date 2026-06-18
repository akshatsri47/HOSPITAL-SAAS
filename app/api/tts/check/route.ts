import { NextResponse } from "next/server";

function maskKey(key: string): string {
  if (key.length <= 10) return "****";
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

function loadApiKeys(): { key: string; index: number; masked: string }[] {
  const keys: { key: string; index: number; masked: string }[] = [];

  if (process.env.GEMINI_API_KEY?.trim()) {
    const k = process.env.GEMINI_API_KEY.trim();
    keys.push({ key: k, index: 1, masked: maskKey(k) });
  }

  for (let i = 2; i <= 5; i++) {
    const k = process.env[`GEMINI_API_KEY_${i}`]?.trim();
    if (k && k.length > 10) {
      keys.push({ key: k, index: i, masked: maskKey(k) });
    }
  }

  return keys;
}

/**
 * GET /api/tts/check
 * Tests all configured Gemini API keys and returns a safe diagnostic report.
 * Never exposes full API keys in the response.
 */
export async function GET() {
  const keys = loadApiKeys();

  if (keys.length === 0) {
    return NextResponse.json({
      ok: false,
      totalKeys: 0,
      error: "No API keys configured",
      hint: "Add GEMINI_API_KEY to .env.local and restart the dev server",
    });
  }

  // Test each key in parallel with a minimal TTS request
  const testPayload = {
    contents: [{ parts: [{ text: "Hello." }] }],
    generationConfig: {
      // snake_case required by this API key type
      response_modalities: ["AUDIO"],
      speech_config: {
        voice_config: {
          prebuilt_voice_config: { voice_name: "Kore" },
        },
      },
    },
  };

  const MODEL = "gemini-2.5-flash-preview-tts";

  const results = await Promise.all(
    keys.map(async ({ key, index, masked }) => {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
      console.log(`[TTS/check] Testing key[${index}](${masked})...`);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testPayload),
        });

        const rawText = await res.text();
        let parsed: unknown = null;
        try { parsed = JSON.parse(rawText); } catch { /* keep null */ }

        type GeminiErr = { error?: { code?: number; message?: string; status?: string } };

        if (!res.ok) {
          const geminiError = (parsed as GeminiErr)?.error;
          const isQuota = res.status === 429;
          console.log(`[TTS/check] key[${index}](${masked}) → HTTP ${res.status}${isQuota ? " (QUOTA EXCEEDED)" : ""}`);

          return {
            keyIndex: index,
            masked,
            ok: false,
            httpStatus: res.status,
            isQuota,
            error: geminiError?.message ?? `HTTP ${res.status}`,
            status: geminiError?.status ?? "UNKNOWN",
          };
        }

        // Check audio present
        type GeminiOk = { candidates?: { content?: { parts?: { inlineData?: { mimeType?: string } }[] } }[] };
        const data = parsed as GeminiOk;
        const parts = data?.candidates?.[0]?.content?.parts ?? [];
        const hasAudio = parts.some(p => p.inlineData?.mimeType?.startsWith("audio/"));

        console.log(`[TTS/check] key[${index}](${masked}) → ✓ OK (hasAudio=${hasAudio})`);
        return { keyIndex: index, masked, ok: true, httpStatus: 200, hasAudio };

      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[TTS/check] key[${index}](${masked}) → Network error:`, message);
        return { keyIndex: index, masked, ok: false, httpStatus: 0, error: message, isNetworkError: true };
      }
    })
  );

  const workingKeys   = results.filter(r => r.ok);
  const quotaKeys     = results.filter(r => !r.ok && (r as { isQuota?: boolean }).isQuota);
  const failedKeys    = results.filter(r => !r.ok && !(r as { isQuota?: boolean }).isQuota);

  return NextResponse.json({
    ok: workingKeys.length > 0,
    totalKeys: keys.length,
    workingKeys: workingKeys.length,
    quotaExceededKeys: quotaKeys.length,
    failedKeys: failedKeys.length,
    summary: workingKeys.length > 0
      ? `${workingKeys.length}/${keys.length} key(s) working — Gemini TTS ready`
      : quotaKeys.length === keys.length
      ? `All ${keys.length} key(s) quota exceeded — add more keys or wait for reset`
      : `${failedKeys.length} key(s) failed — check API key validity`,
    keys: results,
  });
}
