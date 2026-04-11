"use client";

import { useEffect, useRef } from "react";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-px section-py fade-up-section" id="pricing"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-dark-cta rounded-2xl sm:rounded-3xl overflow-hidden relative px-8 sm:px-16 lg:px-24 py-14 sm:py-20 text-center">

          {/* Decorative glows */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-secondary/20 blur-[80px] pointer-events-none animate-pulse-slow" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-teal-300/10 blur-[60px] pointer-events-none" />

          {/* Icon accents */}
          <div className="absolute top-6 left-6 opacity-[0.06] pointer-events-none select-none">
            <span className="material-symbols-outlined text-white" style={{ fontSize: "72px", fontVariationSettings: '"FILL" 1' }}>mic</span>
          </div>
          <div className="absolute bottom-6 right-6 opacity-[0.06] pointer-events-none select-none">
            <span className="material-symbols-outlined text-white" style={{ fontSize: "64px", fontVariationSettings: '"FILL" 1' }}>graphic_eq</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-7 sm:mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-secondary-fixed" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary-fixed" />
            </span>
            <span className="text-[11px] sm:text-[12px] font-semibold text-white">50+ hospitals onboarded</span>
          </div>

          {/* Headline */}
          <h2 className="font-headline font-extrabold text-white leading-tight mb-5
                         text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem]">
            Start answering every patient call today
          </h2>
          <p className="text-slate-400 leading-[1.8] mb-9 sm:mb-10 mx-auto
                        text-[15px] sm:text-[16px] lg:text-[17px] max-w-[40ch]">
            Setup takes 48 hours. No hardware. No engineers. Cancel any time.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" id="cta-start"
              className="w-full sm:w-auto bg-secondary text-white font-bold rounded-xl
                         hover:bg-secondary/90 active:scale-[0.98] transition-all
                         shadow-[0_8px_28px_rgba(13,148,136,0.5)]
                         text-[15px] px-9 py-4">
              Start Free Trial
            </a>
            <a href="#" id="cta-demo"
              className="w-full sm:w-auto bg-white/10 border border-white/25 text-white font-semibold rounded-xl
                         hover:bg-white/18 hover:border-white/40 transition-all
                         text-[15px] px-9 py-4">
              Talk to Sales
            </a>
          </div>

          <p className="text-slate-500 text-[12px] mt-6 font-medium">
            No credit card required · HIPAA compliant · 99.9% uptime SLA
          </p>
        </div>
      </div>
    </section>
  );
}
