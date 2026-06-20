"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

// ── Types ────────────────────────────────────────────────────
type CallState = "idle" | "ringing" | "ai-speaking" | "listening" | "processing" | "ended" | "mic-denied";
interface Message { role: "user" | "aria"; text: string }

// ── Waveform ─────────────────────────────────────────────────
function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-end justify-center gap-[3px] h-8">
      {[0.5, 1.0, 0.7, 1.4, 0.6, 1.2, 0.4, 1.1, 0.8, 0.6, 1.3, 0.5].map((v, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={active
            ? { height: [3, Math.max(5, 26 * v), 3], backgroundColor: "#00C2A8" }
            : { height: 4, backgroundColor: "rgba(0,194,168,0.25)" }
          }
          transition={active
            ? { duration: 0.85, repeat: Infinity, delay: i * 0.065, ease: "easeInOut" }
            : { duration: 0.4 }
          }
          style={{ width: "3px", height: "4px" }}
        />
      ))}
    </div>
  );
}

// ── Live clock status bar ─────────────────────────────────────
function PhoneStatusBar() {
  const [time, setTime] = useState("10:41");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 pb-1">
      <span className="font-mono text-[11.5px] font-bold text-[#0E1726]">{time}</span>
      <div className="flex items-center gap-1.5">
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="1" fill="#0E1726" opacity="0.8"/>
          <rect x="4" y="4.5" width="3" height="6.5" rx="1" fill="#0E1726" opacity="0.8"/>
          <rect x="8" y="2" width="3" height="9" rx="1" fill="#0E1726" opacity="0.8"/>
          <rect x="12" y="0" width="3" height="11" rx="1" fill="#0E1726" opacity="0.25"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#0E1726" opacity="0.8"/>
          <path d="M4.5 6.8a4.2 4.2 0 0 1 6 0" stroke="#0E1726" strokeWidth="1.4" strokeLinecap="round" opacity="0.8"/>
          <path d="M1.5 4a8 8 0 0 1 12 0" stroke="#0E1726" strokeWidth="1.4" strokeLinecap="round" opacity="0.4"/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
          <rect x="0.5" y="1" width="19" height="9" rx="2.5" stroke="#0E1726" strokeWidth="1.1" opacity="0.8"/>
          <rect x="2" y="2.5" width="13" height="6" rx="1.5" fill="#0E1726" opacity="0.8"/>
          <rect x="20" y="3.5" width="2.5" height="4" rx="1" fill="#0E1726" opacity="0.45"/>
        </svg>
      </div>
    </div>
  );
}

// ── Holographic chip ─────────────────────────────────────────
function HoloChip({
  icon, label, color, delay = 0, floatDir = 1
}: { icon: string; label: string; color: string; delay?: number; floatDir?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -5 * floatDir, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay },
        y:       { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
      }}
      className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${color}35`,
        boxShadow: `0 0 20px ${color}18, 0 4px 16px rgba(14,23,38,0.07), inset 0 1px 2px rgba(255,255,255,0.95)`,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 32px ${color}30, 0 8px 24px rgba(14,23,38,0.10), inset 0 1px 2px rgba(255,255,255,0.95)`,
      }}
    >
      {/* Colored left accent bar */}
      <div
        className="w-[3px] h-[20px] rounded-full flex-shrink-0"
        style={{ background: `linear-gradient(to bottom, ${color}, ${color}60)` }}
      />
      <span
        className="material-symbols-outlined text-[14px]"
        style={{ color, fontVariationSettings: '"FILL" 1' }}
      >
        {icon}
      </span>
      <span className="font-mono text-[9.5px] font-bold text-[#334155] uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

// ── Phone Mockup with voice states ───────────────────────────
function PhoneMockup({
  callState, lastMessage, onCallNow, onEndCall
}: {
  callState: CallState;
  lastMessage: string;
  onCallNow: () => void;
  onEndCall: () => void;
}) {
  const isActive = !["idle", "ended", "mic-denied"].includes(callState);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: 290, flexShrink: 0, position: "relative" }}
    >
      {/* Ambient glow behind phone */}
      <div
        className="absolute inset-0 rounded-[52px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(0,194,168,0.18) 0%, rgba(91,141,239,0.10) 50%, transparent 80%)",
          transform: "scale(1.2) translateY(8px)",
          filter: "blur(30px)",
        }}
      />

      {/* Outer holographic ring pulse */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute inset-[-4px] rounded-[50px] pointer-events-none z-0"
        style={{ border: "1px solid rgba(0,194,168,0.25)" }}
      />

      {/* Phone frame */}
      <div
        className="relative z-10"
        style={{
          background: "linear-gradient(160deg, #1E2C45 0%, #0E1726 60%, #0A1020 100%)",
          borderRadius: 44,
          padding: 10,
          boxShadow: `
            0 0 0 1px rgba(0,194,168,0.18),
            0 0 40px rgba(0,194,168,0.10),
            0 32px 80px rgba(14,23,38,0.28),
            0 8px 24px rgba(14,23,38,0.12),
            inset 0 1px 1px rgba(255,255,255,0.06)
          `,
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-[10px] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
          style={{ width: 100, height: 28, background: "linear-gradient(160deg, #1E2C45, #0E1726)", borderRadius: "0 0 20px 20px" }}
        >
          <div style={{ width: 60, height: 6, background: "#0A1020", borderRadius: 4 }} />
        </div>

        {/* Screen */}
        <div
          className="relative overflow-hidden flex flex-col"
          style={{
            borderRadius: 36,
            minHeight: 540,
            background: "linear-gradient(160deg, #F0FDFA 0%, #F8FAFC 40%, #EFF6FF 100%)",
          }}
        >
          {/* Subtle aurora at top of screen */}
          <div
            className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,194,168,0.08) 0%, transparent 100%)",
            }}
          />

          <PhoneStatusBar />

          <div className="flex-1 flex flex-col items-center px-5 pt-3 pb-5 gap-3 relative z-10">

            {/* Agent avatar */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={isActive ? {
                  boxShadow: ["0 0 0 0 rgba(0,194,168,0)", "0 0 0 12px rgba(0,194,168,0.12)", "0 0 0 0 rgba(0,194,168,0)"]
                } : {}}
                transition={{ repeat: Infinity, duration: 2.2 }}
                style={{
                  width: 68, height: 68, borderRadius: "50%",
                  background: "linear-gradient(135deg, #00C2A8 0%, #5B8DEF 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,194,168,0.3), inset 0 1px 2px rgba(255,255,255,0.25)",
                }}
              >
                <span className="font-headline font-bold text-white" style={{ fontSize: 26 }}>A</span>
              </motion.div>

              <div className="text-center">
                <p className="font-body font-semibold text-[14.5px] text-[#0E1726]">Aria from Xyras</p>
                <div className="flex items-center justify-center gap-1.5 mt-0.5">
                  <AnimatePresence mode="wait">
                    {callState === "idle" && (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                        <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[9.5px] text-emerald-600 font-bold uppercase tracking-wider">Available</span>
                      </motion.div>
                    )}
                    {callState === "ringing" && (
                      <motion.p key="ring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[9.5px] text-secondary font-bold uppercase tracking-wider animate-pulse">Connecting...</motion.p>
                    )}
                    {callState === "ai-speaking" && (
                      <motion.p key="speak" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-[9.5px] text-secondary font-bold uppercase tracking-wider">Aria speaking</motion.p>
                    )}
                    {callState === "listening" && (
                      <motion.div key="listen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="font-mono text-[9.5px] text-red-500 font-bold uppercase tracking-wider">Listening</span>
                      </motion.div>
                    )}
                    {callState === "processing" && (
                      <motion.p key="proc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[9.5px] text-[#64748B] font-bold uppercase tracking-wider animate-pulse">Processing</motion.p>
                    )}
                    {callState === "ended" && (
                      <motion.p key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[9.5px] text-[#94A3B8] font-bold uppercase tracking-wider">Call Ended</motion.p>
                    )}
                    {callState === "mic-denied" && (
                      <motion.p key="denied" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[9.5px] text-red-500 font-bold">Mic Unavailable</motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Waveform */}
            <AnimatePresence>
              {isActive && callState !== "ringing" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Waveform active={callState === "ai-speaking"} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message bubble */}
            <AnimatePresence mode="wait">
              {isActive && lastMessage && (
                <motion.div
                  key={lastMessage.slice(0, 20)}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="w-full rounded-2xl px-4 py-2.5 text-center"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,194,168,0.15)",
                    boxShadow: "0 2px 12px rgba(0,194,168,0.08), inset 0 1px 2px rgba(255,255,255,0.9)",
                  }}
                >
                  <p className="font-body text-[11px] text-[#0E1726] leading-snug">{lastMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1" />

            {/* Action buttons */}
            <div className="w-full flex flex-col gap-2.5">
              {callState === "idle" && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={onCallNow}
                    className="w-full font-extrabold text-primary text-[14px] py-3.5 rounded-2xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #00C2A8 0%, #00D4B8 100%)",
                      boxShadow: "0 4px 24px rgba(0,194,168,0.40), 0 1px 4px rgba(0,194,168,0.20), inset 0 1px 1px rgba(255,255,255,0.3)",
                    }}
                  >
                    <span className="relative z-10">Call Me Now</span>
                  </motion.button>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: "rgba(14,23,38,0.07)" }} />
                    <span className="font-body text-[11px] text-[#94A3B8]">or</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(14,23,38,0.07)" }} />
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px] text-[#94A3B8]">phone</span>
                    <span className="font-mono text-[11.5px] text-[#64748B] font-bold tracking-wide">+1 (800) XYRAS-AI</span>
                  </div>
                </>
              )}

              {callState === "ringing" && (
                <div className="flex justify-center py-3">
                  {[0, 0.3, 0.6].map(d => (
                    <motion.div
                      key={d}
                      className="absolute rounded-full"
                      animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: d }}
                      style={{ width: 48, height: 48, border: "1.5px solid #00C2A8" }}
                    />
                  ))}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative"
                    style={{ background: "linear-gradient(135deg, #00C2A8, #5B8DEF)" }}
                  >
                    <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
                  </div>
                </div>
              )}

              {["ai-speaking", "listening", "processing"].includes(callState) && (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={onEndCall}
                  className="w-full text-white font-extrabold text-[13.5px] py-3.5 rounded-2xl flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 4px 20px rgba(239,68,68,0.35)" }}
                >
                  <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>call_end</span>
                  End Call
                </motion.button>
              )}

              {callState === "ended" && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }} onClick={onCallNow}
                  className="w-full font-extrabold text-[13px] py-3 rounded-2xl"
                  style={{
                    background: "rgba(0,194,168,0.1)",
                    border: "1px solid rgba(0,194,168,0.3)",
                    color: "#00C2A8",
                    boxShadow: "0 0 16px rgba(0,194,168,0.12)"
                  }}
                >
                  Call Again
                </motion.button>
              )}

              {callState === "mic-denied" && (
                <p className="text-center font-mono text-[8.5px] text-[#94A3B8] uppercase tracking-wider px-2">
                  Please enable microphone in browser settings
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main HeroSection ─────────────────────────────────────────
export default function HeroSection() {
  const [callState, setCallState]     = useState<CallState>("idle");
  const [messages, setMessages]       = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const audioRef       = useRef<HTMLAudioElement | null>(null);
  const endedRef       = useRef(false);

  useEffect(() => {
    return () => {
      endedRef.current = true;
      audioRef.current?.pause();
      recognitionRef.current?.abort?.();
    };
  }, []);

  const speak = useCallback(async (userText: string, history: Message[]) => {
    if (endedRef.current) return;
    setCallState("processing");

    try {
      const res = await fetch("/api/voice-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userText, history }),
      });
      if (endedRef.current) return;

      if (res.headers.get("Content-Type")?.includes("application/json")) {
        const { text } = await res.json() as { text: string };
        setLastMessage(text);
        setMessages(p => [...p, { role: "aria", text }]);
        setCallState("ai-speaking");
        const utt = new SpeechSynthesisUtterance(text);
        utt.rate = 1.05;
        utt.onend = () => { if (!endedRef.current) startListening([...history, { role: "aria", text }]); };
        window.speechSynthesis.speak(utt);
        return;
      }

      const ariaText = decodeURIComponent(res.headers.get("X-Aria-Response") ?? "");
      if (ariaText) { setLastMessage(ariaText); setMessages(p => [...p, { role: "aria", text: ariaText }]); }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setCallState("ai-speaking");
      audio.onended = () => { URL.revokeObjectURL(url); if (!endedRef.current) startListening([...history, { role: "aria", text: ariaText }]); };
      audio.onerror = () => { if (!endedRef.current) startListening(history); };
      await audio.play().catch(() => {});
    } catch { if (!endedRef.current) startListening(history); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = useCallback((history: Message[]) => {
    if (endedRef.current) return;
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) { setCallState("listening"); return; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec: any = new SR();
    recognitionRef.current = rec;
    rec.continuous = false; rec.interimResults = false; rec.lang = "en-US";
    setCallState("listening");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const userText: string = e.results[0][0].transcript;
      setMessages(p => [...p, { role: "user", text: userText }]);
      setLastMessage(`You: ${userText}`);
      speak(userText, history);
    };
    rec.onerror = () => { if (!endedRef.current) startListening(history); };
    try { rec.start(); } catch { /* */ }
  }, [speak]);

  const handleCallNow = useCallback(async () => {
    endedRef.current = false;
    setMessages([]); setLastMessage(""); setCallState("ringing");
    try { await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { setCallState("mic-denied"); return; }
    setTimeout(() => { if (!endedRef.current) speak("", []); }, 900);
  }, [speak]);

  const handleEndCall = useCallback(() => {
    endedRef.current = true;
    audioRef.current?.pause();
    recognitionRef.current?.abort?.();
    window.speechSynthesis?.cancel();
    setCallState("ended");
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 section-px"
      style={{
        background: `
          radial-gradient(ellipse at 15% 50%, rgba(0,194,168,0.055) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 25%, rgba(91,141,239,0.04) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 90%, rgba(0,194,168,0.03) 0%, transparent 50%),
          #F8FAFC
        `,
      }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, #0E1726 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />

      {/* ── Animated grid lines (2050 feel) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.012]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-px h-full bg-[#0E1726]" style={{ left: `${(i + 1) * 16.6}%` }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-10 lg:gap-12">

        {/* ── TOP COPY — centered ── */}
        <div className="flex flex-col items-center text-center gap-6 max-w-[780px] w-full">

          {/* Futuristic pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(0,194,168,0.2)",
              boxShadow: "0 0 20px rgba(0,194,168,0.10), 0 2px 8px rgba(14,23,38,0.05), inset 0 1px 2px rgba(255,255,255,0.9)",
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(0,194,168,0.12) 50%, transparent 60%)" }}
            />
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"
            />
            <span className="font-mono text-[10px] font-bold text-[#0F766E] uppercase tracking-widest relative z-10">
              AI Can Now Answer &amp; Make Calls On Your Behalf
            </span>
            <span className="text-[13px] relative z-10">🎙️</span>
          </motion.div>

          {/* Headline with floating crafty tags */}
          <div className="relative w-full">
            {/* Floating left tag — teal */}
            <motion.div
              initial={{ opacity: 0, x: -24, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: -5, y: [0, -4, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.35 },
                x: { duration: 0.6, delay: 0.35 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              className="absolute left-[-20px] md:left-[-70px] lg:left-[-120px] xl:left-[-170px] top-[38%] -translate-y-1/2 z-10 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00C2A8, #00D4B8)",
                boxShadow: "0 4px 20px rgba(0,194,168,0.35), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 2px rgba(255,255,255,0.3)",
              }}
            >
              <span className="material-symbols-outlined text-primary text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>swap_calls</span>
              <span className="font-mono text-[9.5px] font-bold text-primary uppercase tracking-wider">Inbound &amp; Outbound</span>
            </motion.div>

            {/* Floating right tag — dark navy */}
            <motion.div
              initial={{ opacity: 0, x: 24, rotate: 4 }}
              animate={{ opacity: 1, x: 0, rotate: 4, y: [0, -5, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.45 },
                x: { duration: 0.6, delay: 0.45 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              }}
              className="absolute right-[-20px] md:right-[-50px] lg:right-[-100px] xl:right-[-150px] top-[18%] -translate-y-1/2 z-10 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #0E1726, #1E2C45)",
                boxShadow: "0 4px 20px rgba(14,23,38,0.30), 0 0 0 1px rgba(0,194,168,0.15), inset 0 1px 2px rgba(255,255,255,0.06)",
              }}
            >
              <span className="material-symbols-outlined text-secondary text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>neurology</span>
              <span className="font-mono text-[9.5px] font-bold text-white uppercase tracking-wider">Human-Like Voice</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline font-extrabold text-primary tracking-tight leading-[1.05] px-4"
              style={{ fontSize: "clamp(2.8rem, 5.8vw, 5.2rem)" }}
            >
              <span className="block">Every business call.</span>
              <span
                className="block italic"
                style={{
                  background: "linear-gradient(135deg, #00C2A8 0%, #5B8DEF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Handled instantly.
              </span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[#64748B] text-[17px] sm:text-[18px] leading-relaxed max-w-[40ch]"
          >
            Human-like AI voice agents that answer calls, book appointments,
            qualify leads, and support customers 24/7.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <MagneticButton strength={0.28}>
              <motion.a
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                href="/#pricing"
                className="hover-shine cta-magnetic inline-flex items-center justify-center gap-2 font-extrabold text-white text-[13.5px] px-8 py-4 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #0E1726 0%, #1E2C45 100%)",
                  boxShadow: "0 4px 24px rgba(14,23,38,0.28), 0 1px 4px rgba(14,23,38,0.15), inset 0 1px 2px rgba(255,255,255,0.06)",
                }}
              >
                View Pricing
              </motion.a>
            </MagneticButton>

            <MagneticButton strength={0.22}>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleCallNow}
                className="inline-flex items-center justify-center gap-2.5 font-extrabold text-[#0E1726] text-[13.5px] px-8 py-4 rounded-full relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,194,168,0.25)",
                  boxShadow: "0 0 20px rgba(0,194,168,0.10), 0 4px 16px rgba(14,23,38,0.07), inset 0 1px 2px rgba(255,255,255,0.9)",
                }}
              >
                <span className="material-symbols-outlined text-[15px] text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>mic</span>
                Try a Conversation
              </motion.button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── PHONE VISUAL — self-contained block ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
          style={{ minWidth: 320 }}
        >
          {/* ── Left chips — positioned relative to phone ── */}
          <div
            className="absolute hidden lg:flex flex-col gap-3 items-end"
            style={{ right: "calc(100% + 20px)", top: "50%", transform: "translateY(-50%)" }}
          >
            <HoloChip icon="language" label="Multilingual" color="#00C2A8" delay={0.55} floatDir={1} />
            <HoloChip icon="auto_stories" label="Trained on Your FAQs" color="#5B8DEF" delay={0.65} floatDir={-1} />
            <HoloChip icon="bolt" label="0.8s Avg Response" color="#F59E0B" delay={0.75} floatDir={1} />
          </div>

          {/* Phone */}
          <PhoneMockup
            callState={callState}
            lastMessage={lastMessage}
            onCallNow={handleCallNow}
            onEndCall={handleEndCall}
          />

          {/* ── Note + CURLY arrow starting from the dot ── */}
          <div
            className="absolute hidden lg:flex flex-col items-start"
            style={{ left: "calc(100% + 12px)", top: "8%" }}
          >
            {/* Handwritten note */}
            <motion.p
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              style={{
                fontFamily: "'Caveat', 'Indie Flower', cursive, sans-serif",
                fontSize: 18,
                color: "#64748B",
                transform: "rotate(-5deg)",
                transformOrigin: "left top",
                lineHeight: 1.3,
                marginLeft: 8,
              }}
            >
              Try a FREE<br />demo call!
            </motion.p>

            {/* Curly S-curve arrow — starts from the dot, wiggles to phone */}
            <motion.svg
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              width="130" height="320" viewBox="0 0 130 320" fill="none"
              style={{ marginTop: -4, marginLeft: 0 }}
            >
              {/* The visible starting dot — glowing teal */}
              <motion.circle
                cx="88"
                cy="14"
                r="4"
                fill="#00C2A8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.85 }}
              />
              {/* Outer glow ring on dot */}
              <motion.circle
                cx="88"
                cy="14"
                r="7"
                fill="none"
                stroke="#00C2A8"
                strokeWidth="1"
                opacity="0.4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 1.3, ease: "easeOut" }}
              />
              {/* Curly wavy path — from dot (88,14) curling down-left to phone */}
              <motion.path
                d="M 88 18 C 105 45, 60 65, 80 95 C 100 125, 45 148, 65 178 C 85 208, 28 228, 15 262 C 8 278, 4 292, 6 308"
                stroke="#94A3B8"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 1.0, ease: "easeInOut" }}
              />
              {/* Arrowhead at bottom */}
              <motion.path
                d="M 1 304 L 6 312 L 14 306"
                stroke="#94A3B8"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.3 }}
              />
            </motion.svg>
          </div>

        </motion.div>

        {/* Mobile chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex lg:hidden items-center gap-2 flex-wrap justify-center"
        >
          {[
            { icon: "language",    label: "Multilingual",         color: "#00C2A8" },
            { icon: "auto_stories",label: "Trained on Your FAQs", color: "#5B8DEF" },
            { icon: "bolt",        label: "0.8s Response",        color: "#F59E0B" },
          ].map(c => (
            <div
              key={c.label}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: `1px solid ${c.color}30`,
                boxShadow: `0 0 12px ${c.color}15`,
              }}
            >
              <span className="material-symbols-outlined text-[12px]" style={{ color: c.color, fontVariationSettings: '"FILL" 1' }}>{c.icon}</span>
              <span className="font-mono text-[9px] font-bold text-[#334155] uppercase tracking-wider">{c.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
