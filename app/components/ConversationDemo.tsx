"use client";

// Safe dev-only logging — never logs API keys or secrets
const DEV = process.env.NODE_ENV === "development";
const log = (...args: unknown[]) => { if (DEV) console.log("[ConversationDemo]", ...args); };

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
//  Constants & Data
// ─────────────────────────────────────────────

const TABS = [
  { id: "healthcare", label: "Healthcare",  icon: "local_hospital" },
  { id: "realestate", label: "Real Estate", icon: "home" },
  { id: "restaurant", label: "Restaurant",  icon: "restaurant" },
  { id: "automotive", label: "Automotive",  icon: "directions_car" },
];

export interface VoiceOption {
  id: string;
  name: string;
  gender: "Male" | "Female";
  tone: string;
  geminiVoice: string;   // verified Gemini prebuilt voice name
  speechRate: number;
  speechPitch: number;
  icon: string;          // material symbol
}

export const VOICE_OPTIONS: VoiceOption[] = [
  { id: "aarav",  name: "Aarav",  gender: "Male",   tone: "Natural",      geminiVoice: "Kore",   speechRate: 0.95, speechPitch: 0.90, icon: "person" },
  { id: "meera",  name: "Meera",  gender: "Female", tone: "Calm",         geminiVoice: "Zephyr", speechRate: 0.90, speechPitch: 1.08, icon: "person" },
  { id: "rohan",  name: "Rohan",  gender: "Male",   tone: "Professional", geminiVoice: "Puck",   speechRate: 0.92, speechPitch: 0.95, icon: "person" },
  { id: "anika",  name: "Anika",  gender: "Female", tone: "Friendly",     geminiVoice: "Leda",   speechRate: 0.96, speechPitch: 1.10, icon: "person" },
  { id: "aryan",  name: "Aryan",  gender: "Male",   tone: "Confident",    geminiVoice: "Charon", speechRate: 0.91, speechPitch: 0.92, icon: "person" },
  { id: "kavya",  name: "Kavya",  gender: "Female", tone: "Clear",        geminiVoice: "Aoede",  speechRate: 0.93, speechPitch: 1.05, icon: "person" },
];

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
  sample: string; // voice preview sentence
}

const LANGUAGES: LanguageOption[] = [
  { code: "en-IN", label: "English",  flag: "🇮🇳", sample: "Hello, this is your AI voice agent." },
  { code: "hi-IN", label: "हिंदी",    flag: "🇮🇳", sample: "नमस्ते, मैं आपका एआई वॉइस एजेंट हूँ।" },
  { code: "ta-IN", label: "தமிழ்",   flag: "🇮🇳", sample: "வணக்கம், நான் உங்கள் ஏஐ குரல் உதவியாளர்." },
  { code: "te-IN", label: "తెలుగు",  flag: "🇮🇳", sample: "నమస్తే, నేను మీ ఏఐ వాయిస్ ఏజెంట్." },
  { code: "es-ES", label: "Español",  flag: "🇪🇸", sample: "Hola, soy tu agente de voz con IA." },
  { code: "de-DE", label: "Deutsch",  flag: "🇩🇪", sample: "Hallo, ich bin Ihr KI-Sprachassistent." },
];

interface Dialogue {
  caller: string;
  ai: string;
  intent: string;
  actionLabel: string;
}

type DialoguesByLang = Record<string, Dialogue>;
type DialoguesByIndustry = Record<string, DialoguesByLang>;

const DIALOGUES: DialoguesByIndustry = {
  healthcare: {
    "en-IN": { caller: "Can I book an appointment with Dr. Mehta for tomorrow evening?",       ai: "Of course. Dr. Mehta has slots at 5:30 PM and 6:15 PM. Which one works best?",                     intent: "Appointment Booking",    actionLabel: "APPOINTMENT SCHEDULED" },
    "hi-IN": { caller: "क्या मैं कल शाम डॉ. मेहता के साथ अपॉइंटमेंट बुक कर सकता हूँ?",      ai: "बिलकुल। डॉ. मेहता के पास शाम 5:30 और 6:15 बजे स्लॉट उपलब्ध हैं। आपको कौन सा समय ठीक रहेगा?",  intent: "Appointment Booking",    actionLabel: "APPOINTMENT SCHEDULED" },
    "ta-IN": { caller: "நாளை மாலை டாக்டர் மேத்தாவுடன் சந்திப்பு முன்பதிவு செய்யலாமா?",      ai: "நிச்சயமாக. டாக்டர் மேத்தாவிடம் மாலை 5:30 மற்றும் 6:15 மணிக்கு நேரம் உள்ளது.",                  intent: "Appointment Booking",    actionLabel: "APPOINTMENT SCHEDULED" },
    "te-IN": { caller: "రేపు సాయంత్రం డాక్టర్ మెహతాతో అపాయింట్‌మెంట్ బుక్ చేయగలనా?",        ai: "వాస్తవానికి. డాక్టర్ మెహతా దగ్గర సాయంత్రం 5:30 మరియు 6:15కి స్లాట్లు అందుబాటులో ఉన్నాయి.",     intent: "Appointment Booking",    actionLabel: "APPOINTMENT SCHEDULED" },
    "es-ES": { caller: "¿Puedo reservar una cita con el Dr. Mehta para mañana por la tarde?",  ai: "Por supuesto. El Dr. Mehta tiene disponibilidad a las 5:30 PM y 6:15 PM. ¿Cuál le viene mejor?", intent: "Appointment Booking",    actionLabel: "APPOINTMENT SCHEDULED" },
    "de-DE": { caller: "Kann ich morgen Abend einen Termin bei Dr. Mehta buchen?",              ai: "Natürlich. Dr. Mehta hat Termine um 17:30 und 18:15 Uhr frei. Welche Zeit passt Ihnen besser?",   intent: "Appointment Booking",    actionLabel: "APPOINTMENT SCHEDULED" },
  },
  realestate: {
    "en-IN": { caller: "I'm interested in the 3BHK apartment near Adyar. Can I visit this weekend?", ai: "Sure. I can schedule a property visit for Saturday at 11 AM or 4 PM. Which time suits you?",         intent: "Property Visit Request", actionLabel: "SITE VISIT BOOKED" },
    "hi-IN": { caller: "मुझे अडयार के पास 3BHK फ्लैट में रुचि है। क्या मैं इस वीकेंड देख सकता हूँ?", ai: "जरूर। मैं शनिवार को सुबह 11 बजे या शाम 4 बजे प्रॉपर्टी विजिट शेड्यूल कर सकता हूँ।",             intent: "Property Visit Request", actionLabel: "SITE VISIT BOOKED" },
    "ta-IN": { caller: "அடையாரில் உள்ள 3BHK அடுக்குமாடியில் எனக்கு ஆர்வம் உள்ளது. இந்த வார இறுதியில் பார்க்கலாமா?", ai: "நிச்சயமாக. சனிக்கிழமை காலை 11 அல்லது மாலை 4 மணிக்கு வருகை திட்டமிட முடியும்.",                   intent: "Property Visit Request", actionLabel: "SITE VISIT BOOKED" },
    "te-IN": { caller: "అడయార్ సమీపంలో 3BHK అపార్ట్‌మెంట్‌పై నాకు ఆసక్తి ఉంది. ఈ వీకెండ్ చూడగలనా?", ai: "తప్పకుండా. శనివారం ఉదయం 11 లేదా సాయంత్రం 4 గంటలకు సందర్శన నిర్ణయించగలను.",                     intent: "Property Visit Request", actionLabel: "SITE VISIT BOOKED" },
    "es-ES": { caller: "Estoy interesado en el apartamento de 3 habitaciones cerca de Adyar. ¿Puedo visitarlo este fin de semana?", ai: "Claro. Puedo programar una visita el sábado a las 11 AM o 4 PM. ¿Cuál prefiere?",                   intent: "Property Visit Request", actionLabel: "SITE VISIT BOOKED" },
    "de-DE": { caller: "Ich interessiere mich für die 3-Zimmer-Wohnung in der Nähe von Adyar. Kann ich sie dieses Wochenende besichtigen?", ai: "Natürlich. Ich kann einen Besichtigungstermin am Samstag um 11:00 oder 16:00 Uhr einplanen.",         intent: "Property Visit Request", actionLabel: "SITE VISIT BOOKED" },
  },
  restaurant: {
    "en-IN": { caller: "Can I reserve a table for four tonight at 8?",                          ai: "Yes, a table for four is available at 8 PM. I've reserved it under your name.",                      intent: "Restaurant Booking",     actionLabel: "TABLE RESERVED" },
    "hi-IN": { caller: "क्या मैं आज रात 8 बजे चार लोगों के लिए टेबल बुक कर सकता हूँ?",       ai: "हाँ, रात 8 बजे चार लोगों के लिए टेबल उपलब्ध है। मैंने आपके नाम पर बुक कर दिया है।",               intent: "Restaurant Booking",     actionLabel: "TABLE RESERVED" },
    "ta-IN": { caller: "இன்று இரவு 8 மணிக்கு நான்கு பேருக்கு மேசை முன்பதிவு செய்யலாமா?",     ai: "ஆம், இரவு 8 மணிக்கு நான்கு பேருக்கு மேசை கிடைக்கும். உங்கள் பெயரில் முன்பதிவு செய்தேன்.",        intent: "Restaurant Booking",     actionLabel: "TABLE RESERVED" },
    "te-IN": { caller: "ఈ రాత్రి 8 గంటలకు నలుగురికి టేబుల్ రిజర్వ్ చేయగలనా?",                ai: "అవును, రాత్రి 8 గంటలకు నలుగురికి టేబుల్ అందుబాటులో ఉంది. మీ పేరుతో రిజర్వ్ చేశాను.",             intent: "Restaurant Booking",     actionLabel: "TABLE RESERVED" },
    "es-ES": { caller: "¿Puedo reservar una mesa para cuatro esta noche a las 8?",              ai: "Sí, hay una mesa disponible para cuatro a las 8 PM. La he reservado a su nombre.",                  intent: "Restaurant Booking",     actionLabel: "TABLE RESERVED" },
    "de-DE": { caller: "Kann ich heute Abend um 20 Uhr einen Tisch für vier Personen reservieren?", ai: "Ja, ein Tisch für vier Personen ist um 20 Uhr verfügbar. Ich habe ihn auf Ihren Namen reserviert.", intent: "Restaurant Booking",     actionLabel: "TABLE RESERVED" },
  },
  automotive: {
    "en-IN": { caller: "Can I book my car for a standard periodic service this Friday?",        ai: "Sure. The service center has slots at 11 AM and 3 PM. Which time works best?",                       intent: "Service Booking",        actionLabel: "SERVICE BOOKED" },
    "hi-IN": { caller: "क्या मैं इस शुक्रवार अपनी कार की नियमित सर्विस बुक कर सकता हूँ?",    ai: "जरूर। सर्विस सेंटर में सुबह 11 बजे और दोपहर 3 बजे स्लॉट उपलब्ध हैं। कौन सा समय ठीक रहेगा?",      intent: "Service Booking",        actionLabel: "SERVICE BOOKED" },
    "ta-IN": { caller: "இந்த வெள்ளிக்கிழமை என் கார் சர்வீஸ் முன்பதிவு செய்யலாமா?",           ai: "நிச்சயமாக. சர்வீஸ் சென்டரில் காலை 11 மற்றும் பிற்பகல் 3 மணிக்கு நேரம் உள்ளது.",                 intent: "Service Booking",        actionLabel: "SERVICE BOOKED" },
    "te-IN": { caller: "ఈ శుక్రవారం నా కారుకు సర్వీస్ బుక్ చేయగలనా?",                        ai: "తప్పకుండా. సర్వీస్ సెంటర్‌లో ఉదయం 11 మరియు మధ్యాహ్నం 3 గంటలకు స్లాట్లు ఉన్నాయి.",               intent: "Service Booking",        actionLabel: "SERVICE BOOKED" },
    "es-ES": { caller: "¿Puedo reservar el servicio periódico de mi coche este viernes?",       ai: "Claro. El centro de servicio tiene disponibilidad a las 11 AM y 3 PM. ¿Cuál le conviene?",          intent: "Service Booking",        actionLabel: "SERVICE BOOKED" },
    "de-DE": { caller: "Kann ich meinen Wagen diesen Freitag zur Inspektion bringen?",          ai: "Natürlich. Das Servicecenter hat Termine um 11:00 und 15:00 Uhr frei. Welcher passt Ihnen?",        intent: "Service Booking",        actionLabel: "SERVICE BOOKED" },
  },
};

const DEFAULT_LANG        = "en-IN";
const DEFAULT_CALLER_VOICE = "aarav";
const DEFAULT_AGENT_VOICE  = "meera";

// ─────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────

function VoiceWaveform({
  isActive, size = "medium", reduceMotion = false,
}: {
  isActive: boolean; size?: "small" | "medium"; reduceMotion?: boolean;
}) {
  const bars    = size === "small" ? 4 : 6;
  const heights = size === "small" ? [8, 12, 10, 8] : [10, 16, 20, 16, 12, 10];
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${isActive ? "bg-secondary" : "bg-[#64748B]/30"}`}
          animate={
            isActive && !reduceMotion
              ? { height: [heights[i], heights[i] * 1.8, heights[i] * 0.6, heights[i] * 1.4, heights[i]] }
              : { height: heights[i] }
          }
          transition={{ duration: 1.2, repeat: isActive && !reduceMotion ? Infinity : 0, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

function CallTimeline({ step }: { step: number }) {
  const steps = [
    { label: "Caller speaks",     icon: "person" },
    { label: "AI listens",        icon: "hearing" },
    { label: "AI responds",       icon: "smart_toy" },
    { label: "Action completed",  icon: "check_circle" },
  ];
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${step >= i ? "bg-secondary/10 border-secondary/30 text-secondary" : "bg-[#F8FAFC] border-[#0E1726]/5 text-[#64748B]"}`}>
            <span className="material-symbols-outlined text-[12px]">{s.icon}</span>
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider hidden sm:inline">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <motion.div className="h-[2px] w-4 bg-secondary" initial={{ scaleX: 0 }} animate={{ scaleX: step > i ? 1 : 0 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ transformOrigin: "left" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/** Single voice pill button */
function VoicePill({
  voice, isSelected, onSelect, onPreview, isPreviewing, disabled,
}: {
  voice: VoiceOption;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
  isPreviewing: boolean;
  disabled: boolean;
}) {
  return (
    <div
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? "bg-secondary/10 border-secondary/50 shadow-sm shadow-secondary/10"
          : "bg-[#F8FAFC] border-[#0E1726]/8 hover:border-secondary/30 hover:bg-secondary/5"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => { if (!disabled) onSelect(); }}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={e => { if ((e.key === "Enter" || e.key === " ") && !disabled) onSelect(); }}
    >
      {/* Gender icon dot */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-secondary text-white" : "bg-[#0E1726]/8 text-[#64748B]"}`}>
        <span className="material-symbols-outlined text-[13px]">
          {voice.gender === "Female" ? "face_3" : "face"}
        </span>
      </div>

      {/* Labels */}
      <div className="flex-1 min-w-0">
        <p className={`font-mono text-[11px] font-bold leading-none ${isSelected ? "text-secondary" : "text-[#0E1726]"}`}>
          {voice.name}
        </p>
        <p className="font-mono text-[9px] text-[#64748B] mt-0.5">
          {voice.gender} · {voice.tone}
        </p>
      </div>

      {/* Preview button */}
      <button
        onClick={e => { e.stopPropagation(); if (!disabled) onPreview(); }}
        disabled={disabled}
        aria-label={`Preview ${voice.name} voice`}
        className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
          isPreviewing
            ? "bg-secondary text-white"
            : "bg-transparent text-[#64748B] hover:text-secondary hover:bg-secondary/10"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <span className="material-symbols-outlined text-[13px]">
          {isPreviewing ? "stop" : "volume_up"}
        </span>
      </button>
    </div>
  );
}

/** Voice selector section for caller or agent */
function VoiceSelector({
  label, icon, selectedId, onSelect, onPreview, previewingId, disabled,
}: {
  label: string; icon: string; selectedId: string;
  onSelect: (id: string) => void;
  onPreview: (voice: VoiceOption) => void;
  previewingId: string | null;
  disabled: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="material-symbols-outlined text-[12px] text-secondary">{icon}</span>
        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748B]">{label}</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {VOICE_OPTIONS.map(v => (
          <VoicePill
            key={v.id}
            voice={v}
            isSelected={selectedId === v.id}
            onSelect={() => onSelect(v.id)}
            onPreview={() => onPreview(v)}
            isPreviewing={previewingId === v.id}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Audio Helpers (module-level, no closures)
// ─────────────────────────────────────────────

async function tryLoadLocalAudio(
  industry: string, lang: string, callerId: string, agentId: string
): Promise<HTMLAudioElement | null> {
  // Priority: specific → lang → generic
  const paths = [
    `/audio/${industry}-${lang}-${callerId}-${agentId}.mp3`,
    `/audio/${industry}-${lang}.mp3`,
    `/audio/${industry}-demo.mp3`,
  ];

  for (const src of paths) {
    const result = await new Promise<HTMLAudioElement | null>(resolve => {
      const audio = new Audio();
      audio.src = src;
      audio.preload = "auto";
      const timeout = setTimeout(() => { cleanup(); resolve(null); }, 1500);
      const cleanup = () => {
        clearTimeout(timeout);
        audio.removeEventListener("canplaythrough", onOk);
        audio.removeEventListener("error", onErr);
      };
      const onOk = () => { cleanup(); resolve(audio); };
      const onErr = () => { cleanup(); resolve(null); };
      audio.addEventListener("canplaythrough", onOk);
      audio.addEventListener("error", onErr);
    });
    if (result) return result;
  }
  return null;
}

interface TtsResult {
  audioBlob: Blob;
  callerDurationMs: number;
  agentDurationMs: number;
  silenceGapMs: number;
}

interface TtsError {
  error: string;
  details?: string;
}

async function generateGeminiTTS(
  callerText: string,
  agentText: string,
  callerVoice: string,
  agentVoice: string,
  industry: string,
  language: string
): Promise<{ result: TtsResult } | { error: TtsError }> {
  try {
    const payload = { callerText, agentText, callerVoice, agentVoice, industry, language };
    // NOTE: payload logged safely — no API key here, that lives server-side only
    log("Calling /api/tts with payload:", { ...payload, callerText: callerText.slice(0, 40) + "...", agentText: agentText.slice(0, 40) + "..." });

    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Try to read structured error from backend
      let errData: TtsError = { error: `HTTP ${res.status}` };
      try { errData = await res.json(); } catch { /* ignore parse error */ }
      log("Gemini TTS failed — server returned:", errData);
      return { error: errData };
    }

    const contentType = res.headers.get("Content-Type") ?? "";
    if (!contentType.includes("audio")) {
      const text = await res.text();
      log("Gemini TTS returned non-audio content-type:", contentType, text.slice(0, 200));
      return { error: { error: "Non-audio response", details: contentType } };
    }

    const callerDurationMs = parseInt(res.headers.get("X-Caller-Duration-Ms") || "3000", 10);
    const agentDurationMs  = parseInt(res.headers.get("X-Agent-Duration-Ms")  || "4000", 10);
    const silenceGapMs     = parseInt(res.headers.get("X-Silence-Gap-Ms")     || "1500", 10);
    const audioSource      = res.headers.get("X-Audio-Source") ?? "gemini-tts";

    const audioBlob = await res.blob();
    log(`Gemini TTS success — source=${audioSource} callerMs=${callerDurationMs} agentMs=${agentDurationMs} blobSize=${audioBlob.size}`);
    return { result: { audioBlob, callerDurationMs, agentDurationMs, silenceGapMs } };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    log("Gemini TTS network/fetch error:", msg);
    return { error: { error: "Fetch failed", details: msg } };
  }
}

function stopAllAudio(
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
  blobUrlRef: React.MutableRefObject<string | null>,
  timersRef: React.MutableRefObject<ReturnType<typeof setTimeout>[]>
) {
  timersRef.current.forEach(clearTimeout);
  timersRef.current = [];
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.onended = null;
    audioRef.current = null;
  }
  if (blobUrlRef.current) {
    URL.revokeObjectURL(blobUrlRef.current);
    blobUrlRef.current = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// ─────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────

export default function ConversationDemo() {
  // ── Industry & language ──
  const [activeTab,    setActiveTab]    = useState("healthcare");
  const [activeLang,   setActiveLang]   = useState(DEFAULT_LANG);

  // ── Voice selection ──
  const [callerVoiceId, setCallerVoiceId] = useState(DEFAULT_CALLER_VOICE);
  const [agentVoiceId,  setAgentVoiceId]  = useState(DEFAULT_AGENT_VOICE);

  // ── Editable script ──
  const defaultDialogue = useCallback(
    (tab: string, lang: string) => DIALOGUES[tab]?.[lang] ?? DIALOGUES[tab]?.["en-IN"] ?? DIALOGUES.healthcare["en-IN"],
    []
  );
  const [callerText, setCallerText] = useState(() => defaultDialogue("healthcare", DEFAULT_LANG).caller);
  const [agentText,  setAgentText]  = useState(() => defaultDialogue("healthcare", DEFAULT_LANG).ai);
  const [isEditingScript, setIsEditingScript] = useState(false);

  // ── Playback state ──
  const [inView,       setInView]       = useState(false);
  const [userClicked,  setUserClicked]  = useState(false);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [playStep,     setPlayStep]     = useState(0);
  const [callTimer,    setCallTimer]    = useState(0);
  const [callStatus,   setCallStatus]   = useState("Live call simulation");
  const [buttonState,  setButtonState]  = useState<"play"|"loading"|"playing"|"replay">("play");
  const [audioMode,    setAudioMode]    = useState<"file"|"tts"|"speech"|"unavailable"|"idle">("idle");
  const [isMuted,      setIsMuted]      = useState(false);

  // ── Voice preview state ──
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);

  // ── UI panels ──
  const [showSettings, setShowSettings] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // ── Refs ──
  const sectionRef  = useRef<HTMLElement>(null);
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef  = useRef<string | null>(null);
  const timersRef   = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isMutedRef  = useRef(isMuted);
  const previewRef  = useRef<HTMLAudioElement | null>(null);

  // Keep muted ref in sync
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  // Intersection observer
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllAudio(audioRef, blobUrlRef, timersRef);
      if (previewRef.current) { previewRef.current.pause(); previewRef.current = null; }
    };
  }, []);

  // ── Reset script when industry or language changes ──
  useEffect(() => {
    const d = defaultDialogue(activeTab, activeLang);
    setCallerText(d.caller);
    setAgentText(d.ai);
    setIsEditingScript(false);
  }, [activeTab, activeLang, defaultDialogue]);

  // ── Stop playback on tab/lang/voice change ──
  const stopPlayback = useCallback((resetToPlay = true) => {
    stopAllAudio(audioRef, blobUrlRef, timersRef);
    setIsPlaying(false);
    setButtonState(resetToPlay ? "play" : "replay");
    setPlayStep(0);
    setCallTimer(0);
    setCallStatus("Live call simulation");
  }, []);

  useEffect(() => {
    if (isPlaying) stopPlayback(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, activeLang, callerVoiceId, agentVoiceId]);

  // Auto-cycling tabs (only when idle)
  useEffect(() => {
    if (userClicked || isPlaying) return;
    const id = setInterval(() => {
      setActiveTab(prev => {
        const idx = TABS.findIndex(t => t.id === prev);
        return TABS[(idx + 1) % TABS.length].id;
      });
    }, 4800);
    return () => clearInterval(id);
  }, [userClicked, isPlaying]);

  // ── Visual timeline sync ──
  const runVisualTimeline = useCallback((
    callerMs: number, silenceMs: number, agentMs: number, actionLabel: string, intent: string
  ) => {
    setPlayStep(0); setCallStatus("Listening…");

    const push = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay);
      timersRef.current.push(t);
      return t;
    };

    push(() => { setPlayStep(1); setCallStatus("Caller speaking…"); }, 300);
    push(() => { setPlayStep(2); setCallStatus(`Processing… (${intent})`); }, 300 + callerMs);
    push(() => { setPlayStep(3); setCallStatus("AI responding…"); },        300 + callerMs + silenceMs);
    push(() => { setPlayStep(4); setCallStatus(actionLabel); },              300 + callerMs + silenceMs + agentMs);
    push(() => {
      setIsPlaying(false); setButtonState("replay");
      setPlayStep(0); setCallTimer(0); setCallStatus("Live call simulation");
    }, 300 + callerMs + silenceMs + agentMs + 2500);

    const interval = setInterval(() => setCallTimer(p => p + 1), 1000);
    timersRef.current.push(interval as unknown as ReturnType<typeof setTimeout>);
  }, []);

  // ── Get current dialogue (with user edits) ──
  const getDialogue = useCallback(() => {
    const base = defaultDialogue(activeTab, activeLang);
    return {
      caller: callerText || base.caller,
      ai: agentText || base.ai,
      intent: base.intent,
      actionLabel: base.actionLabel,
    };
  }, [activeTab, activeLang, callerText, agentText, defaultDialogue]);

  // ── Play with local file ──
  const playWithFile = useCallback((audio: HTMLAudioElement) => {
    setAudioMode("file");
    audioRef.current = audio;
    if (!isMutedRef.current) audio.play().catch(console.warn);
    const total     = (audio.duration || 10) * 1000;
    const callerMs  = total * 0.30;
    const silenceMs = total * 0.15;
    const agentMs   = total * 0.35;
    const d = getDialogue();
    runVisualTimeline(callerMs, silenceMs, agentMs, d.actionLabel, d.intent);
    audio.onended = () => { setIsPlaying(false); setButtonState("replay"); setPlayStep(0); setCallTimer(0); setCallStatus("Live call simulation"); };
  }, [getDialogue, runVisualTimeline]);

  // ── Play with Gemini TTS ──
  const playWithTTS = useCallback((result: TtsResult) => {
    setAudioMode("tts");
    const url = URL.createObjectURL(result.audioBlob);
    blobUrlRef.current = url;
    const audio = new Audio(url);
    audioRef.current = audio;
    if (!isMutedRef.current) audio.play().catch(console.warn);
    const d = getDialogue();
    runVisualTimeline(result.callerDurationMs, result.silenceGapMs, result.agentDurationMs, d.actionLabel, d.intent);
    audio.onended = () => { setIsPlaying(false); setButtonState("replay"); setPlayStep(0); setCallTimer(0); setCallStatus("Live call simulation"); };
  }, [getDialogue, runVisualTimeline]);

  // ── SpeechSynthesis fallback ──
  const playWithSpeech = useCallback(() => {
    const hasSpeech = typeof window !== "undefined" && !!window.speechSynthesis;
    if (!hasSpeech) {
      setAudioMode("unavailable");
      const d = getDialogue();
      runVisualTimeline(3000, 1500, 3500, d.actionLabel, d.intent);
      return;
    }
    setAudioMode("speech");
    const callerVoice = VOICE_OPTIONS.find(v => v.id === callerVoiceId)!;
    const agentVoice  = VOICE_OPTIONS.find(v => v.id === agentVoiceId)!;
    const voices      = window.speechSynthesis.getVoices();
    const langVoices  = voices.filter(v => v.lang.startsWith(activeLang.split("-")[0]));
    const maleVoices  = langVoices.filter(v => !v.name.toLowerCase().includes("female") && !v.name.toLowerCase().includes("woman"));
    const femaleVoices = langVoices.filter(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman") || v.name.toLowerCase().includes("girl"));
    const pickVoice   = (gender: "Male" | "Female") => gender === "Female" ? (femaleVoices[0] || langVoices[0] || voices[0]) : (maleVoices[0] || langVoices[0] || voices[0]);

    const d = getDialogue();
    setPlayStep(0); setCallStatus("Listening…");

    const push = (fn: () => void, delay: number) => {
      const t = setTimeout(fn, delay);
      timersRef.current.push(t);
    };

    push(() => {
      setPlayStep(1); setCallStatus("Caller speaking…");
      if (!isMutedRef.current) {
        const u = new SpeechSynthesisUtterance(d.caller);
        u.voice = pickVoice(callerVoice.gender);
        u.rate  = callerVoice.speechRate;
        u.pitch = callerVoice.speechPitch;
        u.lang  = activeLang;
        u.onend = () => {
          setPlayStep(2); setCallStatus(`Processing… (${d.intent})`);
          push(() => {
            setPlayStep(3); setCallStatus("AI responding…");
            if (!isMutedRef.current) {
              const u2 = new SpeechSynthesisUtterance(d.ai);
              u2.voice = pickVoice(agentVoice.gender);
              u2.rate  = agentVoice.speechRate;
              u2.pitch = agentVoice.speechPitch;
              u2.lang  = activeLang;
              u2.onend = () => {
                push(() => {
                  setPlayStep(4); setCallStatus(d.actionLabel);
                  push(() => { setIsPlaying(false); setButtonState("replay"); setPlayStep(0); setCallTimer(0); setCallStatus("Live call simulation"); }, 2500);
                }, 800);
              };
              window.speechSynthesis.speak(u2);
            } else {
              push(() => { setPlayStep(4); setCallStatus(d.actionLabel); push(() => { setIsPlaying(false); setButtonState("replay"); setPlayStep(0); setCallTimer(0); setCallStatus("Live call simulation"); }, 2500); }, 3500);
            }
          }, 1500);
        };
        window.speechSynthesis.speak(u);
      } else {
        // muted simulation
        push(() => { setPlayStep(2); setCallStatus(`Processing… (${d.intent})`); push(() => { setPlayStep(3); setCallStatus("AI responding…"); push(() => { setPlayStep(4); setCallStatus(d.actionLabel); push(() => { setIsPlaying(false); setButtonState("replay"); setPlayStep(0); setCallTimer(0); setCallStatus("Live call simulation"); }, 2500); }, 3500); }, 1500); }, 3000);
      }
    }, 500);

    const interval = setInterval(() => setCallTimer(p => p + 1), 1000);
    timersRef.current.push(interval as unknown as ReturnType<typeof setTimeout>);
  }, [activeLang, callerVoiceId, agentVoiceId, getDialogue, runVisualTimeline]);

  // ── Main play handler ──
  const handlePlayDemo = async () => {
    if (isPlaying) { stopPlayback(false); return; }

    setIsPlaying(true);
    setButtonState("loading");
    setAudioMode("idle");
    setUserClicked(true);
    stopAllAudio(audioRef, blobUrlRef, timersRef);

    const d = getDialogue();

    // ── Step 1: Try local MP3 ──
    log("Trying local MP3...");
    const localAudio = await tryLoadLocalAudio(activeTab, activeLang, callerVoiceId, agentVoiceId);
    if (localAudio) {
      log("Local MP3 found — playing file");
      setButtonState("playing");
      playWithFile(localAudio);
      return;
    }
    log("Local MP3 not found — trying Gemini TTS...");

    // ── Step 2: Try Gemini TTS ──
    const ttsResponse = await generateGeminiTTS(
      d.caller, d.ai, callerVoiceId, agentVoiceId, activeTab, activeLang
    );

    if ("result" in ttsResponse) {
      log("Gemini TTS success — playing generated audio blob");
      setButtonState("playing");
      playWithTTS(ttsResponse.result);
      return;
    }

    // Gemini failed — log reason and fall back
    log("Gemini TTS failed, falling back to SpeechSynthesis", ttsResponse.error);

    // ── Step 3: SpeechSynthesis / visual-only ──
    log("Using browser SpeechSynthesis fallback");
    setButtonState("playing");
    playWithSpeech();
  };

  // ── Voice preview ──
  const handleVoicePreview = useCallback((voice: VoiceOption) => {
    // Stop main demo if playing
    if (isPlaying) { stopPlayback(false); }

    // If already previewing this voice, stop it
    if (previewingVoiceId === voice.id) {
      if (previewRef.current) { previewRef.current.pause(); previewRef.current = null; }
      window.speechSynthesis?.cancel();
      setPreviewingVoiceId(null);
      return;
    }

    // Stop any other preview
    if (previewRef.current) { previewRef.current.pause(); previewRef.current = null; }
    window.speechSynthesis?.cancel();
    setPreviewingVoiceId(voice.id);

    const langData = LANGUAGES.find(l => l.code === activeLang) ?? LANGUAGES[0];
    const sample   = langData.sample;

    if (typeof window !== "undefined" && window.speechSynthesis) {
      const voices    = window.speechSynthesis.getVoices();
      const langVoice = voices.find(v => v.lang.startsWith(activeLang.split("-")[0]));
      const u = new SpeechSynthesisUtterance(sample);
      if (langVoice) u.voice = langVoice;
      u.rate  = voice.speechRate;
      u.pitch = voice.speechPitch;
      u.lang  = activeLang;
      u.onend = () => setPreviewingVoiceId(null);
      window.speechSynthesis.speak(u);
    } else {
      setPreviewingVoiceId(null);
    }
  }, [activeLang, isPlaying, previewingVoiceId, stopPlayback]);

  // Stop preview when tab/lang changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setPreviewingVoiceId(null);
  }, [activeTab, activeLang]);

  // ── Reset ──
  const handleReset = () => {
    stopPlayback(true);
    setActiveLang(DEFAULT_LANG);
    setCallerVoiceId(DEFAULT_CALLER_VOICE);
    setAgentVoiceId(DEFAULT_AGENT_VOICE);
    const d = defaultDialogue(activeTab, DEFAULT_LANG);
    setCallerText(d.caller);
    setAgentText(d.ai);
    setIsEditingScript(false);
    setShowSettings(false);
  };

  const handleTabClick = (id: string) => {
    if (isPlaying) return;
    setActiveTab(id);
    setUserClicked(true);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const getButtonLabel = () => ({ play: "Play Call Demo", loading: "Generating Audio…", playing: "Stop Demo", replay: "Replay Demo" })[buttonState];
  const getButtonIcon  = () => ({ play: "play_circle", loading: "hourglass_top", playing: "stop_circle", replay: "replay" })[buttonState];

  const callerVoice = VOICE_OPTIONS.find(v => v.id === callerVoiceId) ?? VOICE_OPTIONS[0];
  const agentVoice  = VOICE_OPTIONS.find(v => v.id === agentVoiceId)  ?? VOICE_OPTIONS[1];
  const dialogue    = getDialogue();

  // ─────────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────────
  return (
    <section ref={sectionRef} className="section-px py-20 sm:py-28 bg-white border-b border-[#0E1726]/5 overflow-hidden" id="hear-it-live">
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        {/* ── Header ── */}
        <div className="text-center mb-10 max-w-xl">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-3">03 · Platform Conversations</p>
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[1.8rem] sm:text-[2.6rem] leading-tight tracking-tight">
            Conversations that flow naturally
          </h2>
        </div>

        {/* ── Industry Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 bg-[#F8FAFC] border border-[#0E1726]/5 p-1.5 rounded-2xl max-w-lg w-full">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)} disabled={isPlaying}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? "bg-white text-secondary shadow-sm border border-[#0E1726]/5" : "text-[#64748B] hover:text-[#0E1726] border border-transparent"}`}>
                <span className="material-symbols-outlined text-[14px]" style={{ color: isActive ? "#00C2A8" : "inherit" }}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Top Controls Row: Language + Customize toggle ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 w-full mb-4">

          {/* Language pills */}
          <div className="flex flex-wrap gap-1.5">
            {LANGUAGES.map(lang => (
              <button key={lang.code} onClick={() => { if (!isPlaying) setActiveLang(lang.code); }}
                disabled={isPlaying}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${activeLang === lang.code ? "bg-secondary/10 border-secondary/40 text-secondary" : "bg-[#F8FAFC] border-[#0E1726]/8 text-[#64748B] hover:border-secondary/30 hover:text-[#0E1726]"}`}>
                <span className="text-[12px]">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>

          {/* Customize & Reset */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setShowSettings(s => !s)}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold border transition-all ${showSettings ? "bg-[#0E1726] text-white border-[#0E1726]" : "bg-[#F8FAFC] border-[#0E1726]/10 text-[#64748B] hover:text-[#0E1726]"}`}
              aria-label="Customize demo settings"
            >
              <span className="material-symbols-outlined text-[13px]">tune</span>
              Customize
              <span className="material-symbols-outlined text-[11px]">{showSettings ? "keyboard_arrow_up" : "keyboard_arrow_down"}</span>
            </motion.button>
            <button onClick={handleReset} aria-label="Reset to defaults"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold border border-[#0E1726]/8 text-[#64748B] bg-[#F8FAFC] hover:text-[#0E1726] transition-all">
              <span className="material-symbols-outlined text-[12px]">restart_alt</span>
              Reset
            </button>
          </div>
        </div>

        {/* ── Settings Panel ── */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden"
            >
              <div className="w-full bg-[#F8FAFC] border border-[#0E1726]/8 rounded-2xl p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Caller Voice */}
                  <VoiceSelector
                    label="Caller Voice" icon="person"
                    selectedId={callerVoiceId}
                    onSelect={setCallerVoiceId}
                    onPreview={handleVoicePreview}
                    previewingId={previewingVoiceId}
                    disabled={isPlaying}
                  />

                  {/* Agent Voice */}
                  <VoiceSelector
                    label="AI Agent Voice" icon="smart_toy"
                    selectedId={agentVoiceId}
                    onSelect={setAgentVoiceId}
                    onPreview={handleVoicePreview}
                    previewingId={previewingVoiceId}
                    disabled={isPlaying}
                  />

                  {/* Editable Script */}
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[12px] text-secondary">edit_note</span>
                        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#64748B]">Edit Script</p>
                      </div>
                      <button
                        onClick={() => setIsEditingScript(e => !e)}
                        className="font-mono text-[9px] font-bold text-secondary hover:underline"
                      >
                        {isEditingScript ? "Done" : "Edit"}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Caller text */}
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-wider text-[#64748B] mb-1">Caller</p>
                        {isEditingScript ? (
                          <textarea
                            value={callerText}
                            onChange={e => setCallerText(e.target.value)}
                            rows={3}
                            className="w-full text-[12px] text-[#0E1726] bg-white border border-[#0E1726]/10 rounded-xl p-2.5 resize-none focus:outline-none focus:border-secondary/50 font-sans leading-relaxed"
                          />
                        ) : (
                          <div className="text-[12px] text-[#0E1726] bg-white border border-[#0E1726]/5 rounded-xl p-2.5 leading-relaxed min-h-[60px]">
                            &ldquo;{callerText}&rdquo;
                          </div>
                        )}
                      </div>
                      {/* AI text */}
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-wider text-[#64748B] mb-1">AI Agent</p>
                        {isEditingScript ? (
                          <textarea
                            value={agentText}
                            onChange={e => setAgentText(e.target.value)}
                            rows={3}
                            className="w-full text-[12px] text-[#0E1726] bg-white border border-[#0E1726]/10 rounded-xl p-2.5 resize-none focus:outline-none focus:border-secondary/50 font-sans leading-relaxed"
                          />
                        ) : (
                          <div className="text-[12px] text-[#0E1726] bg-white border border-[#0E1726]/5 rounded-xl p-2.5 leading-relaxed min-h-[60px]">
                            &ldquo;{agentText}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active selection summary */}
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-[#0E1726]/5">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#64748B]">Active:</span>
                  <span className="flex items-center gap-1 bg-white border border-[#0E1726]/8 px-2 py-1 rounded-lg font-mono text-[9px] text-[#0E1726]">
                    <span className="material-symbols-outlined text-[10px] text-secondary">person</span>
                    {callerVoice.name} · {callerVoice.tone}
                  </span>
                  <span className="text-[#64748B] font-mono text-[9px]">→</span>
                  <span className="flex items-center gap-1 bg-white border border-[#0E1726]/8 px-2 py-1 rounded-lg font-mono text-[9px] text-[#0E1726]">
                    <span className="material-symbols-outlined text-[10px] text-secondary">smart_toy</span>
                    {agentVoice.name} · {agentVoice.tone}
                  </span>
                  <span className="flex items-center gap-1 bg-white border border-[#0E1726]/8 px-2 py-1 rounded-lg font-mono text-[9px] text-[#0E1726]">
                    <span className="material-symbols-outlined text-[10px] text-secondary">language</span>
                    {LANGUAGES.find(l => l.code === activeLang)?.label}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Play Button Row ── */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <motion.button
            onClick={handlePlayDemo}
            disabled={buttonState === "loading"}
            whileHover={buttonState !== "loading" ? { scale: 1.02 } : {}}
            whileTap={buttonState !== "loading" ? { scale: 0.98 } : {}}
            aria-label={isPlaying ? "Stop demo" : "Play call demo"}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg transition-all border disabled:opacity-70 disabled:cursor-wait ${
              isPlaying
                ? "bg-red-500 text-white border-red-600 shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30"
                : "bg-secondary text-white border-secondary/20 shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30"
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${buttonState === "loading" ? "animate-spin" : ""}`}>
              {getButtonIcon()}
            </span>
            {getButtonLabel()}
          </motion.button>

          {/* Mute */}
          <motion.button onClick={handleToggleMute} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#0E1726]/10 text-[#64748B] hover:text-[#0E1726] hover:border-[#0E1726]/20 transition-all shadow-sm"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}>
            <span className="material-symbols-outlined text-[18px]">{isMuted ? "volume_off" : "volume_up"}</span>
          </motion.button>

          {/* ── Audio Source Badge ── */}
          <AnimatePresence mode="wait">
            {audioMode !== "idle" && (
              <motion.div
                key={audioMode}
                initial={{ opacity: 0, scale: 0.85, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 4 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-[9px] font-bold uppercase tracking-wider ${
                  audioMode === "tts"
                    ? "bg-secondary/10 border-secondary/40 text-secondary"
                    : audioMode === "file"
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : audioMode === "speech"
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                <span className="material-symbols-outlined text-[11px]">
                  {audioMode === "tts"     ? "neurology"
                  : audioMode === "file"   ? "audio_file"
                  : audioMode === "speech" ? "record_voice_over"
                  :                          "volume_off"}
                </span>
                {audioMode === "tts"     ? "Audio: Gemini TTS"
                : audioMode === "file"   ? "Audio: Local MP3"
                : audioMode === "speech" ? "Audio: Browser Voice"
                :                          "Audio: Visual Only"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Call Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-[32px] border bg-white p-6 sm:p-10 shadow-card flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
            isPlaying && playStep >= 1 && playStep <= 3
              ? "border-secondary/30 shadow-[0_0_40px_rgba(0,194,168,0.15)]"
              : "border-[#0E1726]/5"
          }`}
          style={{ minHeight: "480px" }}
        >
          {/* Ambient gradient */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isPlaying && playStep >= 1 && playStep <= 3 ? "opacity-100 bg-gradient-to-br from-secondary/5 via-transparent to-[#5B8DEF]/5" : "opacity-50 bg-gradient-to-tr from-secondary/3 via-transparent to-[#5B8DEF]/3"}`} />

          {/* Status header */}
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#0E1726]/5 pb-4 mb-6 z-10 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-widest">{callStatus}</span>
              </div>
              {isPlaying && (
                <div className="flex items-center gap-1.5 bg-[#0E1726] text-white px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[10px]">timer</span>
                  <span className="font-mono text-[10px] font-bold">{formatTime(callTimer)}</span>
                </div>
              )}
            </div>
            {/* Voice badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <div className="flex items-center gap-1.5 bg-[#0E1726]/5 border border-[#0E1726]/10 px-2.5 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[11px] text-[#64748B]">person</span>
                <span className="font-mono text-[8px] text-[#334155] font-bold uppercase">{callerVoice.name}</span>
              </div>
              <span className="material-symbols-outlined text-[11px] text-[#64748B]">arrow_forward</span>
              <div className="flex items-center gap-1.5 bg-[#0E1726]/5 border border-[#0E1726]/10 px-2.5 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[11px] text-secondary">smart_toy</span>
                <span className="font-mono text-[8px] text-[#334155] font-bold uppercase">{agentVoice.name} · {TABS.find(t => t.id === activeTab)?.label} AI</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative z-10 mb-6 overflow-x-auto">
            <CallTimeline step={playStep} />
          </div>

          {/* Conversation bubbles */}
          <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + activeLang}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Caller bubble */}
                <motion.div
                  initial={isPlaying ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                  animate={isPlaying && playStep >= 1 ? { opacity: 1, x: 0 } : isPlaying ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3 self-start max-w-[90%]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E1726] to-[#1E293B] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-white">person</span>
                  </div>
                  <div className={`bg-[#F8FAFC] border rounded-2xl rounded-tl-sm p-4 shadow-sm text-left transition-all ${isPlaying && playStep === 1 ? "border-secondary/30 shadow-lg shadow-secondary/10" : "border-[#0E1726]/5"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[9px] font-bold font-mono text-[#64748B] uppercase">Caller · {callerVoice.name}</p>
                      <VoiceWaveform isActive={isPlaying && playStep === 1} size="small" reduceMotion={reduceMotion} />
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-[#0E1726] font-medium leading-relaxed">&ldquo;{dialogue.caller}&rdquo;</p>
                  </div>
                </motion.div>

                {/* AI processing indicator */}
                {isPlaying && playStep === 2 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center justify-center gap-2 py-2">
                    <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-4 py-2 rounded-full">
                      <VoiceWaveform isActive={true} size="small" reduceMotion={reduceMotion} />
                      <span className="font-mono text-[10px] font-bold text-secondary uppercase">Intent: {dialogue.intent}</span>
                    </div>
                  </motion.div>
                )}

                {/* AI bubble */}
                <motion.div
                  initial={isPlaying ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  animate={isPlaying && playStep >= 3 ? { opacity: 1, x: 0 } : isPlaying ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3 self-end flex-row-reverse max-w-[90%]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-[#00A890] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-white">smart_toy</span>
                  </div>
                  <div className={`bg-[#0E1726] text-white rounded-2xl rounded-tr-sm p-4 shadow-md border text-left transition-all ${isPlaying && playStep === 3 ? "border-secondary/50 shadow-xl shadow-secondary/20" : "border-white/5"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[9px] font-bold font-mono text-secondary uppercase">Xyras AI · {agentVoice.name}</p>
                      <VoiceWaveform isActive={isPlaying && playStep === 3} size="small" reduceMotion={reduceMotion} />
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-white leading-relaxed">&ldquo;{dialogue.ai}&rdquo;</p>
                  </div>
                </motion.div>

                {/* Action chip */}
                <motion.div
                  initial={isPlaying ? { opacity: 0, y: 10, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
                  animate={isPlaying && playStep >= 4 ? { opacity: 1, y: 0, scale: 1 } : isPlaying ? { opacity: 0, y: 10, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: isPlaying && playStep >= 4 ? 0.2 : 0 }}
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-secondary to-[#00E0B8] text-white px-5 py-2.5 rounded-full shadow-lg shadow-secondary/30">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">{dialogue.actionLabel}</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="relative flex justify-center gap-1.5 mt-8 z-10">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => handleTabClick(tab.id)} disabled={isPlaying}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${activeTab === tab.id ? "bg-secondary w-5" : "bg-[#0E1726]/15 hover:bg-[#0E1726]/30"}`}
                aria-label={`Switch to ${tab.label}`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
