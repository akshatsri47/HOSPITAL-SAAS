"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Per-card headline suffixes and descriptions ────────────────── */
const STEP_CONTENT = [
  {
    badge: "Language Engine",
    headline: "multilingual calls.",
    description:
      "AI detects language shifts mid-conversation and matches accents instantly across 12+ Indian languages and global dialects.",
  },
  {
    badge: "Custom Pipelines",
    headline: "workflow automation.",
    description:
      "Triggers SQL queries, syncs calendars, books reservations, and updates ledgers — all during a live conversation.",
  },
  {
    badge: "API Gateways",
    headline: "CRM integrations.",
    description:
      "Call transcripts, lead states, custom properties, and audio recordings flow straight into Salesforce, HubSpot, or Zendesk.",
  },
  {
    badge: "Intelligent Routing",
    headline: "human handoffs.",
    description:
      "Smooth routing to live agents when exceptions trigger. Recordings and real-time transcripts arrive instantly.",
  },
];

export default function StickyStorySection() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Persist a single stable array of element references across renders
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!stepRefs.current) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });

      setActiveStep(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to sync initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = STEP_CONTENT[activeStep];

  return (
    <section
      ref={containerRef}
      className="section-px py-16 sm:py-24 bg-white border-b border-[#0E1726]/5 relative"
      id="capabilities"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit space-y-6">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
              05 · Built for scale
            </p>

            {/* Stepper dynamic badge */}
            <div className="h-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block bg-[#F0FDFA] text-[#0F766E] font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
                >
                  {current.badge}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Headline with static + dynamic part */}
            <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.1] tracking-tight">
              Handles every aspect <br className="hidden sm:inline" />
              of your{" "}
              <span className="block sm:inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeStep}
                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-brand-gradient inline-block"
                  >
                    {current.headline}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            {/* Dynamic Description */}
            <div className="min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-[#64748B] text-[15px] sm:text-[16px] max-w-[32ch] leading-relaxed"
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Stepper Navigation Indicator */}
            <div className="hidden lg:flex flex-col gap-4.5 pt-6 border-t border-[#0E1726]/5 max-w-[200px]">
              {[
                "Global Multilingual",
                "Workflow Automation",
                "CRM Integrations",
                "Human Handoff",
              ].map((label, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={label}
                    onClick={() => {
                      stepRefs.current[idx]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className={`flex items-center gap-3 text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-[#0E1726] font-bold translate-x-2"
                        : "text-[#64748B] hover:text-[#0E1726]"
                    }`}
                  >
                    {/* Animated dot / line indicator */}
                    <motion.span
                      animate={{
                        width: isActive ? 20 : 6,
                        backgroundColor: isActive ? "#00C2A8" : "rgba(14,23,38,0.2)",
                      }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="h-1.5 rounded-full flex-shrink-0"
                    />
                    <span className="text-[12.5px] uppercase font-mono tracking-wider">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll progress micro-bar (desktop only) */}
            <div className="hidden lg:block pt-4">
              <div className="h-[2px] bg-[#0E1726]/5 rounded-full overflow-hidden max-w-[200px]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #00C2A8, #5B8DEF)",
                  }}
                  animate={{ width: `${((activeStep + 1) / 4) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <p className="font-mono text-[9px] text-[#64748B] mt-1.5 tracking-wider">
                {activeStep + 1} / 4 capabilities
              </p>
            </div>
          </div>

          {/* Right Column (Scrollable Cards) */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-20 pb-16">
            {/* CARD 1: Multilingual Engine */}
            <div
              ref={(el) => { stepRefs.current[0] = el; }}
              className="rounded-3xl border border-[#0E1726]/5 bg-[#F8FAFC] p-6 sm:p-8 shadow-card flex flex-col justify-between"
              style={{ minHeight: "380px" }}
            >
              <div className="mb-6">
                <span className="inline-block bg-[#F0FDFA] text-[#0F766E] font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  CAPABILITY // Language Engine
                </span>
                <h3 className="font-headline font-bold text-[#0E1726] text-[18px] sm:text-[20px] mb-2">
                  Global Multilingual Support
                </h3>
                <p className="text-[#64748B] text-[13.5px] sm:text-[14px] leading-relaxed">
                  Speak natively in 12+ Indian languages and global dialects. AI
                  detects language shifts mid-conversation and matches accents
                  instantly.
                </p>
              </div>

              {/* Animation Stage: Language loops */}
              <div className="bg-white border border-[#0E1726]/5 rounded-2xl p-5 flex flex-col items-center justify-center space-y-4 shadow-sm relative overflow-hidden min-h-[200px]">
                <div className="w-full flex items-center justify-between border-b border-[#0E1726]/5 pb-2 mb-2">
                  <span className="font-mono text-[9.5px] text-[#64748B] font-bold">
                    X_ENGINE // Active Accents
                  </span>
                  <span className="font-mono text-[9px] text-secondary font-bold">
                    12+ Synced
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 w-full max-w-[280px]">
                  {["Hindi", "Tamil", "Telugu", "Spanish", "German"].map(
                    (t, i) => (
                      <motion.div
                        key={t}
                        animate={
                          i === 2
                            ? {
                                backgroundColor: [
                                  "#FFFFFF",
                                  "#F0FDFA",
                                  "#00C2A8",
                                  "#00C2A8",
                                ],
                                borderColor: [
                                  "rgba(14,23,38,0.1)",
                                  "rgba(0,194,168,0.2)",
                                  "#00C2A8",
                                  "#00C2A8",
                                ],
                                color: [
                                  "#0E1726",
                                  "#0F766E",
                                  "#0E1726",
                                  "#0E1726",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 4.5,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                        className="border border-[#0E1726]/10 bg-white text-[#0E1726] rounded-xl py-3 px-1 text-center font-mono text-[11px] font-bold"
                      >
                        {t}
                      </motion.div>
                    )
                  )}
                  <div className="border border-dashed border-[#0E1726]/20 bg-[#F8FAFC] text-[#64748B]/50 rounded-xl py-3 px-1 text-center font-mono text-[11px] font-bold select-none">
                    More...
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    y: [10, 10, 0, 0, 10],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                    delay: 2.2,
                  }}
                  className="bg-[#F0FDFA] border border-[#00C2A8]/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px] text-secondary">
                    verified
                  </span>
                  <span className="font-mono text-[10px] text-secondary font-bold">
                    Regional Accent Matched
                  </span>
                </motion.div>
              </div>
            </div>

            {/* CARD 2: Workflow Automation */}
            <div
              ref={(el) => { stepRefs.current[1] = el; }}
              className="rounded-3xl border border-[#0E1726]/5 bg-[#F8FAFC] p-6 sm:p-8 shadow-card flex flex-col justify-between"
              style={{ minHeight: "380px" }}
            >
              <div className="mb-6">
                <span className="inline-block bg-[#F0FDFA] text-[#0F766E] font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  CAPABILITY // Custom Pipelines
                </span>
                <h3 className="font-headline font-bold text-[#0E1726] text-[18px] sm:text-[20px] mb-2">
                  Workflow Automation
                </h3>
                <p className="text-[#64748B] text-[13.5px] sm:text-[14px] leading-relaxed">
                  Triggers custom operational pipelines during calls. Sync
                  calendars, make SQL queries, book spots, and update ledgers
                  instantly.
                </p>
              </div>

              {/* Animation Stage: Workflow Ticker */}
              <div className="bg-white border border-[#0E1726]/5 rounded-2xl p-5 flex flex-col items-center justify-center space-y-4 shadow-sm relative overflow-hidden min-h-[200px]">
                <div className="w-full flex items-center justify-between border-b border-[#0E1726]/5 pb-2 mb-1">
                  <span className="font-mono text-[9.5px] text-[#64748B] font-bold">
                    PIPELINE // RUN_LEDGER
                  </span>
                  <span className="font-mono text-[9px] text-[#334155] font-bold uppercase">
                    Ready
                  </span>
                </div>

                <div className="w-full max-w-[270px] space-y-2">
                  <div className="flex items-center justify-between bg-[#F8FAFC] p-2.5 rounded-xl border border-[#0E1726]/5">
                    <span className="text-[12px] font-bold text-[#0E1726] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-secondary">
                        database
                      </span>
                      SQL Database Query
                    </span>
                    <span className="font-mono text-[10px] text-secondary bg-[#F0FDFA] px-2 py-0.5 rounded-md font-bold">
                      COMPLETED
                    </span>
                  </div>

                  {/* SMS box animating */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: [0, 0, 1, 1, 0],
                      x: [-10, -10, 0, 0, 10],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4.5,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    className="bg-[#0E1726] border border-white/5 text-white rounded-2xl p-3 shadow-md text-left w-full relative"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1.5">
                      <span className="text-[8.5px] font-bold text-white/50 tracking-wider">
                        WHATSAPP // WORKFLOW
                      </span>
                      <span className="text-[8px] font-mono text-white/40">
                        JUST NOW
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-200 leading-normal">
                      &quot;Confirming reservation booked via voice. Details
                      logged:{" "}
                      <span className="text-secondary underline">
                        xyr.is/confirm
                      </span>
                      &quot;
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* CARD 3: CRM Integrations */}
            <div
              ref={(el) => { stepRefs.current[2] = el; }}
              className="rounded-3xl border border-[#0E1726]/5 bg-[#F8FAFC] p-6 sm:p-8 shadow-card flex flex-col justify-between"
              style={{ minHeight: "380px" }}
            >
              <div className="mb-6">
                <span className="inline-block bg-[#F0FDFA] text-[#0F766E] font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  CAPABILITY // API Gateways
                </span>
                <h3 className="font-headline font-bold text-[#0E1726] text-[18px] sm:text-[20px] mb-2">
                  CRM Integrations
                </h3>
                <p className="text-[#64748B] text-[13.5px] sm:text-[14px] leading-relaxed">
                  Synchronize call transcripts, lead states, custom properties,
                  and audio recordings straight into Salesforce, HubSpot, or
                  Zendesk.
                </p>
              </div>

              {/* Animation Stage: CRM ledger */}
              <div className="bg-white border border-[#0E1726]/5 rounded-2xl p-5 flex flex-col items-center justify-center space-y-3 shadow-sm relative overflow-hidden min-h-[200px]">
                <div className="w-full flex items-center justify-between border-b border-[#0E1726]/5 pb-2 mb-1">
                  <span className="font-mono text-[9.5px] text-[#64748B] font-bold">
                    API // CRM_SYNC_GATEWAY
                  </span>
                  <span className="font-mono text-[9.5px] text-slate-500">
                    Secure
                  </span>
                </div>

                <div className="w-full max-w-[270px] space-y-2">
                  <div className="flex justify-between items-center text-[12px] font-medium text-[#334155]">
                    <span>Salesforce pipeline status</span>
                    <span className="font-bold text-[#0E1726]">UP TO DATE</span>
                  </div>
                  <div className="flex justify-between items-center text-[12px] font-medium text-[#334155]">
                    <span>HubSpot lead sync</span>
                    <motion.span
                      animate={{ color: ["#0E1726", "#0F766E", "#0F766E"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4.5,
                        ease: "easeInOut",
                      }}
                      className="font-bold"
                    >
                      CONNECTED
                    </motion.span>
                  </div>
                  <div className="h-px bg-[#0E1726]/5 w-full my-1.5" />
                  <div className="flex justify-between items-center text-[12.5px]">
                    <span className="font-bold text-[#0E1726]">
                      Call log sync status
                    </span>
                    <motion.span
                      animate={{
                        scale: [1, 1.05, 1],
                        color: ["#0E1726", "#00C2A8", "#00C2A8"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4.5,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="font-extrabold text-[13.5px]"
                    >
                      SYNCHRONIZED
                    </motion.span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                    delay: 1.8,
                  }}
                  className="bg-[#F0FDFA] border border-[#00C2A8]/20 px-3.5 py-1 rounded-full flex items-center gap-1 mt-1"
                >
                  <span className="font-mono text-[9px] text-secondary font-bold uppercase tracking-wider">
                    CRM Synced Perfectly
                  </span>
                </motion.div>
              </div>
            </div>

            {/* CARD 4: Human Handoff */}
            <div
              ref={(el) => { stepRefs.current[3] = el; }}
              className="rounded-3xl border border-[#0E1726]/5 bg-[#F8FAFC] p-6 sm:p-8 shadow-card flex flex-col justify-between"
              style={{ minHeight: "380px" }}
            >
              <div className="mb-6">
                <span className="inline-block bg-[#FEF2F2] text-[#EF4444] font-mono text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
                  CAPABILITY // Intelligent Routing
                </span>
                <h3 className="font-headline font-bold text-[#0E1726] text-[18px] sm:text-[20px] mb-2">
                  Human Handoff
                </h3>
                <p className="text-[#64748B] text-[13.5px] sm:text-[14px] leading-relaxed">
                  Smooth routing to physical live agents when exceptions trigger.
                  Call recordings and real-time transcripts are sent instantly to
                  support desks.
                </p>
              </div>

              {/* Animation Stage: Human handoff routing telemetry */}
              <div className="bg-white border border-[#0E1726]/5 rounded-2xl p-5 flex flex-col items-center justify-center space-y-4 shadow-sm relative overflow-hidden min-h-[200px]">
                <div className="w-full flex items-center justify-between border-b border-[#0E1726]/5 pb-2 mb-1">
                  <span className="font-mono text-[9.5px] text-[#EF4444] font-bold">
                    ROUTE // LIVE_DESK_TRANS
                  </span>
                  <span className="font-mono text-[9px] text-[#EF4444] font-bold uppercase animate-pulse">
                    Routing On-Prem
                  </span>
                </div>

                <div className="w-full flex items-center justify-center gap-4 py-2 relative">
                  {/* Flashing telephone with professional human photo thumbnail */}
                  <div className="w-14 h-14 rounded-full border border-[#EF4444]/25 overflow-hidden shadow-md flex-shrink-0 relative">
                    <img
                      src="/images/premium_human_agent.png"
                      alt="Physical Support Executive"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                  </div>

                  {/* Pulsing connection line */}
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#EF4444] to-[#0E1726] relative overflow-hidden">
                    <motion.div
                      animate={{ left: ["-100%", "100%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="absolute top-0 bottom-0 w-12 bg-white/60 blur-[2px]"
                    />
                  </div>

                  {/* support monitor */}
                  <div className="w-12 h-12 rounded-full bg-[#0E1726] border border-[#0E1726]/10 flex items-center justify-center shadow-md relative flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-[18px]">
                      support_agent
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    scale: [0.95, 0.95, 1, 1, 0.95],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                    delay: 1.8,
                  }}
                  className="bg-[#FEF2F2] border border-[#EF4444]/20 px-3.5 py-1.5 rounded-full flex items-center gap-1"
                >
                  <span className="font-mono text-[9px] text-[#EF4444] font-bold uppercase tracking-wider">
                    Transferred to Support Desk
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
