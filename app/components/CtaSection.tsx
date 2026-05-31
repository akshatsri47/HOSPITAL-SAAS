"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={ref} 
      className="section-px py-24 sm:py-36 bg-white" 
      id="pricing"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[36px] overflow-hidden relative px-6 sm:px-16 lg:px-24 py-16 sm:py-24 text-center border border-[#0E1726]/5 shadow-card"
          style={{
            background: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #F0FDFA 100%)",
          }}
        >
          {/* Subtle Ambient icons decoration in background */}
          <div className="absolute top-8 left-8 opacity-[0.03] pointer-events-none select-none hidden md:block text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: "72px" }}>mic</span>
          </div>
          <div className="absolute bottom-8 right-8 opacity-[0.03] pointer-events-none select-none hidden md:block text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: "64px" }}>graphic_eq</span>
          </div>

          {/* Active stats indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1726]/5 border border-[#0E1726]/10 mb-8 shadow-sm select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            <span className="font-mono text-[10px] font-bold text-[#334155] uppercase tracking-widest">
              Built for business operations
            </span>
          </div>

          {/* Headline (DM Serif Display) */}
          <h2 className="font-headline font-extrabold text-primary text-[2.4rem] sm:text-[3.6rem] lg:text-[4rem] leading-none tracking-tight mb-6">
            Never miss another business call.
          </h2>
          <p className="text-[#64748B] text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed max-w-[36ch] mx-auto mb-10">
            Set up your multilingual AI voice desk in 48 hours. Secure, automated, compliant.
          </p>

          {/* Core Booking CTA Button */}
          <div className="max-w-xs mx-auto relative z-10">
            <motion.a
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              href="mailto:demo@xyras.ai?subject=Xyras Hospital Voice Agent Demo Request"
              className="w-full bg-secondary text-primary font-mono font-bold text-[12px] uppercase tracking-wider py-4.5 rounded-xl shadow-[0_6px_24px_rgba(0,194,168,0.25)] flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              Book Free Demo
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </motion.a>
          </div>

          {/* WhatsApp / Quick contact desk fallback */}
          <div className="mt-10 pt-6 border-t border-[#0E1726]/5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-[12.5px] text-[#64748B] font-medium">Have operations questions?</span>
            <motion.a 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 font-mono font-bold text-[11px] uppercase px-4.5 py-2 rounded-full transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">chat</span>
              Or WhatsApp Us: +91 98765 43210
            </motion.a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
