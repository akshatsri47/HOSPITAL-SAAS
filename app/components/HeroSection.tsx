"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const LANGUAGE_TAGS = [
  "ENGLISH · GLOBAL",
  "हिंदी · HINDI",
  "தமிழ் · TAMIL",
  "తెలుగు · TELUGU",
  "ESPAÑOL · SPANISH",
  "DEUTSCH · GERMAN",
];

const FLOATING_CHARS = [
  { char: "A", top: "15%", left: "5%", size: "40px", speed: 1.2 },
  { char: "क", top: "25%", left: "45%", size: "44px", speed: 1.5 },
  { char: "த", top: "75%", left: "8%", size: "38px", speed: 1.1 },
  { char: "అ", top: "60%", left: "40%", size: "42px", speed: 1.4 },
  { char: "Ω", top: "80%", left: "48%", size: "34px", speed: 0.9 },
];

const INDUSTRIES = [
  { label: "Hospital", icon: "local_hospital", color: "#00C2A8", outcome: "Appointment Booked" },
  { label: "Real Estate", icon: "home", color: "#5B8DEF", outcome: "Lead Qualified" },
  { label: "Restaurant", icon: "restaurant", color: "#FF9F43", outcome: "Table Reserved" },
  { label: "Automotive", icon: "directions_car", color: "#4B7BEC", outcome: "Service Scheduled" },
  { label: "Education", icon: "school", color: "#A55EEA", outcome: "Support Resolved" },
];

function FloatingCharacter({ char, top, left, size, speed, springX, springY }: typeof FLOATING_CHARS[0] & { springX: any; springY: any }) {
  const x = useTransform(springX, (v: number) => v * 25 * speed);
  const y = useTransform(springY, (v: number) => v * 25 * speed);

  return (
    <motion.div
      className="absolute font-headline font-bold text-[#0E1726]/3 pointer-events-none select-none hidden lg:block"
      style={{
        top,
        left,
        fontSize: size,
        x,
        y,
      }}
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 6 + speed * 2, ease: "easeInOut" }}
    >
      {char}
    </motion.div>
  );
}

export default function HeroSection() {
  const [langIdx, setLangIdx] = useState(0);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  // Cycle languages
  useEffect(() => {
    const id = setInterval(() => {
      setLangIdx((prev) => (prev + 1) % LANGUAGE_TAGS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Cycle active industry outcome loop every 3.2 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndustryIdx((prev) => (prev + 1) % INDUSTRIES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  // Parallax capture
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const activeInd = INDUSTRIES[activeIndustryIdx];

  return (
    <section 
      className="relative min-h-[92vh] lg:min-h-[100vh] flex flex-col justify-center items-center overflow-hidden py-24 sm:py-32 section-px bg-[#F8FAFC]"
    >
      <style jsx>{`
        @keyframes crossfade {
          0% { opacity: 0; transform: translateY(5px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
        .animate-lang {
          animation: crossfade 2.8s infinite ease-in-out;
        }
      `}</style>

      {/* Premium Universal Tech Mesh texture background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] select-none z-0"
        style={{
          backgroundImage: "url('/images/tech_mesh_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      />

      {/* Subtle glowing tech orb overlay */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/5 to-transparent blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/5 to-[#5B8DEF]/5 blur-[100px] pointer-events-none z-0" />

      {/* Floating background scripts */}
      {FLOATING_CHARS.map((c, i) => (
        <FloatingCharacter 
          key={i} 
          {...c} 
          springX={springX} 
          springY={springY} 
        />
      ))}

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 relative">
        
        {/* LEFT COLUMN - Premium Big-Tech Copy */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col items-start text-left">
          
          <div className="h-6 mb-1">
            <span 
              key={langIdx}
              className="animate-lang font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/10 border border-[#00C2A8]/20 px-3.5 py-1 rounded-md uppercase tracking-widest whitespace-nowrap"
            >
              {LANGUAGE_TAGS[langIdx]}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-headline font-extrabold text-[2.8rem] sm:text-[4rem] lg:text-[4.6rem] xl:text-[5rem] leading-[1.08] text-primary tracking-tight">
              Every business call. <br />
              <span className="text-secondary font-headline font-extrabold italic">Answered instantly.</span>
            </h1>
            <p className="font-body text-[#64748B] text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed max-w-[42ch]">
              AI voice agents that answer calls, qualify leads, book appointments, handle support, and operate 24×7 in multiple languages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <motion.a 
              whileHover={{ y: -2.5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              href="/#pricing"
              className="w-full sm:w-auto bg-secondary text-primary font-extrabold text-[13.5px] uppercase tracking-wider px-8 py-4.5 rounded-full text-center shadow-[0_6px_24px_rgba(0,194,168,0.25)]"
            >
              Book Demo
            </motion.a>
            <motion.a 
              whileHover={{ backgroundColor: "rgba(14,23,38,0.08)", y: -2.5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              href="/#hear-it-live"
              className="w-full sm:w-auto border border-[#0E1726]/15 bg-[#0E1726]/5 text-[#0E1726] font-extrabold text-[13.5px] uppercase tracking-wider px-8 py-4.5 rounded-full text-center"
            >
              Listen to a Call
            </motion.a>
          </div>
        </div>

        {/* RIGHT COLUMN - Retell-style Central AI Core Flow pipeline */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div 
            className="w-full max-w-[390px] h-[450px] rounded-[36px] bg-white border border-[#0E1726]/5 p-6 shadow-card flex flex-col justify-between relative overflow-hidden"
            style={{
              boxShadow: "0 24px 60px rgba(14,23,38,0.05), inset 0 1px 2px rgba(255,255,255,0.8)"
            }}
          >
            {/* Visual telemetry light glow overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-secondary/2 via-transparent to-[#5B8DEF]/2" />

            <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-3">
              <span className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                Xyras Platform Core
              </span>
              <span className="font-mono text-[9.5px] text-secondary font-bold animate-pulse">
                Live Gateway
              </span>
            </div>

            {/* Central core pipeline stage */}
            <div className="flex-1 relative flex flex-col items-center justify-center py-4">
              
              {/* Outer surrounding input tags (glowing nodes) */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-64 h-64 border border-[#0E1726]/3 rounded-full flex items-center justify-center relative select-none">
                  
                  {/* Surrounding Nodes positions */}
                  {INDUSTRIES.map((ind, idx) => {
                    // Position around circle mathematically
                    const angle = (idx * 2 * Math.PI) / INDUSTRIES.length - Math.PI / 2;
                    const r = 110; // radius
                    const x = r * Math.cos(angle);
                    const y = r * Math.sin(angle);
                    
                    const isSelected = activeIndustryIdx === idx;

                    return (
                      <motion.div
                        key={ind.label}
                        animate={isSelected ? {
                          scale: 1.15,
                          borderColor: ind.color,
                          boxShadow: `0 0 16px ${ind.color}33`,
                          backgroundColor: "#FFFFFF"
                        } : {
                          scale: 1.0,
                          borderColor: "rgba(14,23,38,0.08)",
                          boxShadow: "none",
                          backgroundColor: "#F8FAFC"
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute w-9 h-9 rounded-full border flex items-center justify-center text-[#0E1726] flex-shrink-0 cursor-default"
                        style={{
                          left: `calc(50% + ${x}px - 18px)`,
                          top: `calc(50% + ${y}px - 18px)`,
                        }}
                      >
                        <span 
                          className="material-symbols-outlined text-[16px] transition-colors"
                          style={{ color: isSelected ? ind.color : "#64748B" }}
                        >
                          {ind.icon}
                        </span>

                        {/* Particle stream in active state */}
                        {isSelected && (
                          <motion.div
                            initial={{ left: x > 0 ? "0%" : "100%", top: y > 0 ? "0%" : "100%", opacity: 0.8 }}
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

              {/* Central Glowing Processor Core */}
              <div className="relative z-10 w-28 h-28 flex items-center justify-center">
                
                {/* Outer Ring pulses */}
                <motion.div 
                  animate={{
                    scale: [1, 1.15, 1],
                    borderColor: [activeInd.color, activeInd.color, activeInd.color],
                  }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed opacity-45 pointer-events-none"
                />

                <motion.div
                  animate={{
                    boxShadow: `0 0 40px ${activeInd.color}25`,
                    borderColor: activeInd.color,
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-20 h-20 rounded-full bg-white border flex flex-col items-center justify-center transition-all duration-300 relative"
                >
                  {/* Glowing core pulse */}
                  <motion.div 
                    animate={{
                      scale: [0.95, 1.05, 0.95],
                      backgroundColor: [activeInd.color, activeInd.color, activeInd.color],
                      opacity: [0.08, 0.16, 0.08]
                    }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="absolute inset-2 rounded-full"
                  />

                  {/* Core symbol status */}
                  <span 
                    className="material-symbols-outlined text-[26px] z-10 transition-colors duration-400"
                    style={{ color: activeInd.color }}
                  >
                    graphic_eq
                  </span>
                </motion.div>
              </div>

              {/* Active Voice Waveform Stream Simulator */}
              <div className="h-10 flex items-center justify-center gap-1 mt-6 z-20">
                {[0.4, 0.9, 0.6, 1.2, 0.5, 0.8, 1.1, 0.7, 0.3].map((val, idx) => (
                  <motion.div
                    key={idx}
                    className="w-1.5 rounded-full"
                    animate={{
                      height: [8, Math.max(8, 36 * val), 8],
                      backgroundColor: activeInd.color
                    }}
                    transition={{
                      duration: 1.0,
                      repeat: Infinity,
                      delay: idx * 0.07,
                      ease: "easeInOut"
                    }}
                    style={{
                      height: "8px",
                      width: "3px"
                    }}
                  />
                ))}
              </div>

              {/* Floating Outcome Box Below */}
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
                    <span 
                      className="material-symbols-outlined text-[15px]" 
                      style={{ color: activeInd.color }}
                    >
                      check_circle
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                      {activeInd.outcome}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            <div className="border-t border-[#0E1726]/5 pt-3 flex items-center justify-between">
              <span className="font-mono text-[9px] text-[#64748B] uppercase">
                Latency // 0.8s avg
              </span>
              <span className="font-mono text-[9px] text-[#64748B] uppercase">
                Concurrency 10k+
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
