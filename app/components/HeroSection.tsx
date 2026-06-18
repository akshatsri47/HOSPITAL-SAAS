"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const LANGUAGE_TAGS = [
  "ENGLISH · GLOBAL",
  "हिंदी · HINDI",
  "தமிழ் · TAMIL",
  "తెలుగు · TELUGU",
  "ESPAÑOL · SPANISH",
  "DEUTSCH · GERMAN",
];

const FLOATING_CHARS = [
  { char: "A",  top: "15%", left: "5%",  size: "40px", speed: 1.2 },
  { char: "क", top: "25%", left: "45%", size: "44px", speed: 1.5 },
  { char: "த", top: "75%", left: "8%",  size: "38px", speed: 1.1 },
  { char: "అ", top: "60%", left: "40%", size: "42px", speed: 1.4 },
  { char: "Ω",  top: "80%", left: "48%", size: "34px", speed: 0.9 },
];

const INDUSTRIES = [
  { label: "Hospital",    icon: "local_hospital", color: "#00C2A8", outcome: "Appointment Booked" },
  { label: "Real Estate", icon: "home",           color: "#5B8DEF", outcome: "Lead Qualified"     },
  { label: "Restaurant",  icon: "restaurant",     color: "#FF9F43", outcome: "Table Reserved"     },
  { label: "Automotive",  icon: "directions_car", color: "#4B7BEC", outcome: "Service Scheduled"  },
  { label: "Education",   icon: "school",         color: "#A55EEA", outcome: "Support Resolved"   },
];

/* ── Floating parallax character ────────────────────────────── */
function FloatingCharacter({
  char, top, left, size, speed, springX, springY,
}: typeof FLOATING_CHARS[0] & { springX: ReturnType<typeof useSpring>; springY: ReturnType<typeof useSpring> }) {
  const x = useTransform(springX, (v: number) => v * 25 * speed);
  const y = useTransform(springY, (v: number) => v * 25 * speed);
  return (
    <motion.div
      className="absolute font-headline font-bold text-[#0E1726]/3 pointer-events-none select-none hidden lg:block"
      style={{ top, left, fontSize: size, x, y }}
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 6 + speed * 2, ease: "easeInOut" }}
    >
      {char}
    </motion.div>
  );
}

/* ── Hero pipeline card with cursor-reactive glare ───────────── */
function HeroCard({
  activeInd,
  activeIndustryIdx,
}: {
  activeInd: typeof INDUSTRIES[0];
  activeIndustryIdx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      show: true,
    });
  };
  const handleMouseLeave = () => setGlare((g) => ({ ...g, show: false }));

  return (
    <motion.div
      ref={cardRef}
      className="w-full max-w-[390px] h-[450px] rounded-[36px] bg-white border border-[#0E1726]/5 p-6 shadow-card flex flex-col justify-between relative overflow-hidden"
      style={{ boxShadow: "0 24px 60px rgba(14,23,38,0.05), inset 0 1px 2px rgba(255,255,255,0.8)" }}
      whileHover={{ y: -6, boxShadow: "0 36px 80px rgba(14,23,38,0.09), inset 0 1px 2px rgba(255,255,255,0.8)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="card"
      data-cursor-label="Platform"
    >
      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-secondary/2 via-transparent to-[#5B8DEF]/2" />

      {/* Cursor-reactive glare */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[36px] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0,194,168,0.07) 0%, transparent 55%)`,
          opacity: glare.show ? 1 : 0,
        }}
      />

      {/* Card header */}
      <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-3 relative z-10">
        <span className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
          Xyras Platform Core
        </span>
        <span className="font-mono text-[9.5px] text-secondary font-bold animate-pulse">
          Live Gateway
        </span>
      </div>

      {/* Central core pipeline */}
      <div className="flex-1 relative flex flex-col items-center justify-center py-4">
        {/* Orbit ring with nodes */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-64 h-64 border border-[#0E1726]/3 rounded-full flex items-center justify-center relative select-none">
            {INDUSTRIES.map((ind, idx) => {
              const angle = (idx * 2 * Math.PI) / INDUSTRIES.length - Math.PI / 2;
              const r = 110;
              const nx = r * Math.cos(angle);
              const ny = r * Math.sin(angle);
              const isSelected = activeIndustryIdx === idx;
              return (
                <motion.div
                  key={ind.label}
                  animate={
                    isSelected
                      ? { scale: 1.15, borderColor: ind.color, boxShadow: `0 0 16px ${ind.color}33`, backgroundColor: "#FFFFFF" }
                      : { scale: 1.0, borderColor: "rgba(14,23,38,0.08)", boxShadow: "none", backgroundColor: "#F8FAFC" }
                  }
                  transition={{ duration: 0.4 }}
                  className="absolute w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0"
                  style={{ left: `calc(50% + ${nx}px - 18px)`, top: `calc(50% + ${ny}px - 18px)` }}
                >
                  <span
                    className="material-symbols-outlined text-[16px] transition-colors"
                    style={{ color: isSelected ? ind.color : "#64748B" }}
                  >
                    {ind.icon}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ left: nx > 0 ? "0%" : "100%", top: ny > 0 ? "0%" : "100%", opacity: 0.8 }}
                      animate={{ left: "50%", top: "50%", opacity: 0.1 }}
                      transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
                      className="absolute w-2 h-2 rounded-full pointer-events-none"
                      style={{ backgroundColor: ind.color }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Central glowing core */}
        <div className="relative z-10 w-28 h-28 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.15, 1], borderColor: [activeInd.color, activeInd.color, activeInd.color] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border-2 border-dashed opacity-45 pointer-events-none"
          />
          <motion.div
            animate={{ boxShadow: `0 0 40px ${activeInd.color}25`, borderColor: activeInd.color }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 rounded-full bg-white border flex flex-col items-center justify-center relative"
          >
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95], backgroundColor: [activeInd.color], opacity: [0.08, 0.16, 0.08] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute inset-2 rounded-full"
            />
            <span className="material-symbols-outlined text-[26px] z-10" style={{ color: activeInd.color }}>
              graphic_eq
            </span>
          </motion.div>
        </div>

        {/* Waveform bars */}
        <div className="h-10 flex items-center justify-center gap-1 mt-6 z-20">
          {[0.4, 0.9, 0.6, 1.2, 0.5, 0.8, 1.1, 0.7, 0.3].map((val, idx) => (
            <motion.div
              key={idx}
              className="rounded-full"
              animate={{ height: [8, Math.max(8, 36 * val), 8], backgroundColor: activeInd.color }}
              transition={{ duration: 1.0, repeat: Infinity, delay: idx * 0.07, ease: "easeInOut" }}
              style={{ height: "8px", width: "3px" }}
            />
          ))}
        </div>

        {/* Outcome label */}
        <div className="absolute bottom-1 flex flex-col items-center z-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustryIdx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0E1726] border border-white/5 text-white px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[15px]" style={{ color: activeInd.color }}>
                check_circle
              </span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                {activeInd.outcome}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Card footer */}
      <div className="border-t border-[#0E1726]/5 pt-3 flex items-center justify-between relative z-10">
        <span className="font-mono text-[9px] text-[#64748B] uppercase">Latency // 0.8s avg</span>
        <span className="font-mono text-[9px] text-[#64748B] uppercase">Concurrency 10k+</span>
      </div>
    </motion.div>
  );
}

/* ── Main HeroSection ────────────────────────────────────────── */
export default function HeroSection() {
  const [langIdx, setLangIdx] = useState(0);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const id = setInterval(() => setLangIdx((p) => (p + 1) % LANGUAGE_TAGS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveIndustryIdx((p) => (p + 1) % INDUSTRIES.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2));
      mouseY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const activeInd = INDUSTRIES[activeIndustryIdx];

  return (
    <section className="relative min-h-[92vh] lg:min-h-[100vh] flex flex-col justify-center items-center overflow-hidden py-24 sm:py-32 section-px bg-[#F8FAFC]">
      <style jsx>{`
        @keyframes crossfade {
          0%   { opacity: 0; transform: translateY(5px); }
          15%  { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
        .animate-lang { animation: crossfade 2.8s infinite ease-in-out; }
      `}</style>

      {/* Tech mesh texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] select-none z-0"
        style={{ backgroundImage: "url('/images/tech_mesh_bg.png')", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "multiply" }}
      />

      {/* Animated gradient blobs */}
      <div className="absolute top-[5%] left-[2%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#00C2A8]/8 to-transparent blur-[120px] pointer-events-none z-0 animate-blob" />
      <div className="absolute bottom-[0%] right-[0%] w-[800px] h-[600px] rounded-full bg-gradient-to-bl from-[#5B8DEF]/7 to-transparent blur-[140px] pointer-events-none z-0 animate-blob-delay-2" />
      <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#00C2A8]/4 to-[#5B8DEF]/4 blur-[100px] pointer-events-none z-0 animate-blob-delay-4" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #0E1726 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* Parallax floating characters */}
      {FLOATING_CHARS.map((c, i) => (
        <FloatingCharacter key={i} {...c} springX={springX} springY={springY} />
      ))}

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 relative">

        {/* LEFT — copy + CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col items-start text-left">
          {/* Language cycling badge */}
          <div className="h-6 mb-1">
            <span
              key={langIdx}
              className="animate-lang font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/10 border border-[#00C2A8]/20 px-3.5 py-1 rounded-md uppercase tracking-widest whitespace-nowrap"
            >
              {LANGUAGE_TAGS[langIdx]}
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-headline font-extrabold text-[2.8rem] sm:text-[4rem] lg:text-[4.6rem] xl:text-[5rem] leading-[1.08] text-primary tracking-tight"
            >
              Every business call. <br />
              <span className="text-secondary font-headline font-extrabold italic">Answered instantly.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-[#64748B] text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed max-w-[42ch]"
            >
              AI voice agents that answer calls, qualify leads, book appointments, handle support, and operate 24×7 in multiple languages.
            </motion.p>
          </div>

          {/* Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton strength={0.28}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                href="/#pricing"
                data-cursor="cta"
                className="hover-shine cta-magnetic neon-border-hover w-full sm:w-auto bg-secondary text-primary font-extrabold text-[13.5px] uppercase tracking-wider px-8 py-4 rounded-full text-center shadow-[0_6px_28px_rgba(0,194,168,0.30)] border border-secondary/30 block"
              >
                Book Demo
              </motion.a>
            </MagneticButton>
            <MagneticButton strength={0.22}>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                href="/#hear-it-live"
                data-cursor="hover"
                className="w-full sm:w-auto border border-[#0E1726]/15 bg-[#0E1726]/5 text-[#0E1726] font-extrabold text-[13.5px] uppercase tracking-wider px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 hover:bg-[#0E1726]/8 transition-colors"
              >
                <span className="flex gap-0.5 items-end h-4">
                  <span className="wave-bar h-2" />
                  <span className="wave-bar h-3" />
                  <span className="wave-bar h-4" />
                  <span className="wave-bar h-3" />
                  <span className="wave-bar h-2" />
                </span>
                Listen to a Call
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2"
          >
            {[
              { icon: "verified", label: "SOC 2 Compliant" },
              { icon: "bolt",     label: "48h Setup"       },
              { icon: "language", label: "12+ Languages"   },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[#64748B]">
                <span
                  className="material-symbols-outlined text-secondary text-[14px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {item.icon}
                </span>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — animated hero card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <HeroCard activeInd={activeInd} activeIndustryIdx={activeIndustryIdx} />
        </motion.div>

      </div>
    </section>
  );
}
