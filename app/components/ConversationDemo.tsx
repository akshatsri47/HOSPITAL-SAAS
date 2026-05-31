"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "healthcare", label: "Healthcare", icon: "local_hospital" },
  { id: "realestate", label: "Real Estate", icon: "home" },
  { id: "restaurant", label: "Restaurant", icon: "restaurant" },
  { id: "automotive", label: "Automotive", icon: "directions_car" },
];

interface Dialogue {
  patient: string;
  patientTranslation?: string;
  ai: string;
  aiTranslation?: string;
  langLabel: string;
  langScript: string;
  latency: string;
}

const DIALOGUES: Record<string, Dialogue> = {
  healthcare: {
    patient: "मुझे कल डॉक्टर दिखाना है",
    patientTranslation: "I need to see a doctor tomorrow",
    ai: "ज़रूर। किस विभाग में अपॉइंटमेंट चाहिए?",
    aiTranslation: "Sure. Which department do you want an appointment in?",
    langLabel: "HINDI_INBOUND",
    langScript: "हिंदी Detected",
    latency: "0.8s",
  },
  realestate: {
    patient: "Is the 2BHK flat listing in Indiranagar still available?",
    ai: "Yes, it is! Would you like to schedule a physical walkthrough tomorrow at 10 AM?",
    langLabel: "ENGLISH_INBOUND",
    langScript: "English Detected",
    latency: "0.6s",
  },
  restaurant: {
    patient: "Hey, do you have a table for 4 open tonight around 8:30 PM?",
    ai: "Absolutely. I've secured a quiet corner table for 4 under your name at 8:30 PM. See you tonight!",
    langLabel: "ENGLISH_INBOUND",
    langScript: "English Detected",
    latency: "0.7s",
  },
  automotive: {
    patient: "Can I book my car for a standard periodic service this Friday?",
    ai: "Sure! Dr. Auto has slots open at 11 AM and 3 PM. Which time works best for your schedule?",
    langLabel: "ENGLISH_INBOUND",
    langScript: "English Detected",
    latency: "0.6s",
  },
};

export default function ConversationDemo() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [inView, setInView] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const dialogue = DIALOGUES[activeTab];

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-cycling tabs every 4.8 seconds if user hasn't interacted
  useEffect(() => {
    if (userClicked) return;
    const id = setInterval(() => {
      setActiveTab((prev) => {
        const idx = TABS.findIndex((t) => t.id === prev);
        const nextIdx = (idx + 1) % TABS.length;
        return TABS[nextIdx].id;
      });
    }, 4800);
    return () => clearInterval(id);
  }, [userClicked]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setUserClicked(true);
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-px py-20 sm:py-28 bg-white border-b border-[#0E1726]/5 overflow-hidden" 
      id="hear-it-live"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Simple Label */}
        <div className="text-center mb-10 max-w-xl">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-3">
            03 · Platform Conversations
          </p>
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[1.8rem] sm:text-[2.6rem] leading-tight tracking-tight">
            Conversations that flow naturally
          </h2>
        </div>

        {/* Industry Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#F8FAFC] border border-[#0E1726]/5 p-1.5 rounded-2xl max-w-lg w-full">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-secondary shadow-[0_2px_8px_rgba(14,23,38,0.03)] border border-[#0E1726]/3"
                    : "text-[#64748B] hover:text-[#0E1726] border border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ color: isActive ? "#00C2A8" : "inherit" }}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Full-width Single Elegant Card */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-[32px] border border-[#0E1726]/5 bg-white p-6 sm:p-10 shadow-card flex flex-col justify-between relative overflow-hidden"
          style={{ minHeight: "360px" }}
        >
          {/* Subtle Ambient Light Gradients inside the card */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-secondary/3 via-transparent to-[#5B8DEF]/3" />

          {/* Card Top Telemetry header */}
          <div className="relative flex items-center justify-between border-b border-[#0E1726]/5 pb-4 mb-8 z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                Voice Gateway // {dialogue.langLabel}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#0E1726]/5 border border-[#0E1726]/10 px-2.5 py-1 rounded-md">
              <span className="font-mono text-[9px] text-[#334155] font-bold uppercase">
                {dialogue.langScript}
              </span>
            </div>
          </div>

          {/* Conversational Bubbles with clean Crossfade */}
          <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Patient Inbound bubble */}
                <div className="flex items-end gap-3 self-start max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-[#0E1726]/10 flex items-center justify-center flex-shrink-0 text-[#0E1726] font-mono text-[11px] font-bold select-none">
                    P
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#0E1726]/5 rounded-2xl rounded-bl-sm p-4.5 shadow-sm text-left">
                    <p className="text-[9px] font-bold font-mono text-[#64748B] uppercase mb-1">
                      Caller Inbound ({TABS.find((t) => t.id === activeTab)?.label})
                    </p>
                    <p className="text-[13.5px] sm:text-[14.5px] text-[#0E1726] font-semibold leading-relaxed">
                      "{dialogue.patient}"
                    </p>
                    {dialogue.patientTranslation && (
                      <div className="mt-2 pt-2 border-t border-[#0E1726]/5 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider">English //</span>
                        <p className="text-[11px] sm:text-[12px] text-[#64748B] italic leading-normal">
                          {dialogue.patientTranslation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI response bubble */}
                <div className="flex items-end gap-3 self-end flex-row-reverse max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-primary font-mono text-[11px] font-bold select-none">
                    AI
                  </div>
                  <div className="bg-[#0E1726] text-white rounded-2xl rounded-br-sm p-4.5 shadow-md border border-white/5 text-left">
                    <p className="text-[9px] font-bold font-mono text-secondary uppercase mb-1">
                      Xyras Voice Agent // {dialogue.latency}
                    </p>
                    <p className="text-[13.5px] sm:text-[14.5px] text-white leading-relaxed">
                      "{dialogue.ai}"
                    </p>
                    {dialogue.aiTranslation && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold text-secondary uppercase tracking-wider">English //</span>
                        <p className="text-[11px] sm:text-[12px] text-slate-300 italic leading-normal">
                          {dialogue.aiTranslation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Dot Navigation */}
          <div className="relative flex justify-center gap-1.5 mt-8 z-10">
            {TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id ? "bg-secondary w-5" : "bg-[#0E1726]/15 hover:bg-[#0E1726]/30"
                }`}
                aria-label={`Switch to tab ${tab.label}`}
              />
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
