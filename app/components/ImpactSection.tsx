"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { n: 60,  suffix: "%",  desc: "Fewer missed calls",       color: "from-teal-400 to-cyan-300" },
  { n: 95,  suffix: "%",  desc: "Patient satisfaction",     color: "from-teal-400 to-emerald-300" },
  { n: 30,  suffix: "%",  desc: "Less front-desk workload", color: "from-indigo-400 to-blue-300" },
  { n: 12,  suffix: "+",  desc: "Languages supported",      color: "from-teal-400 to-cyan-300" },
];

const PERKS = [
  {
    icon: "rocket_launch",
    title: "Be the first in your city",
    body: "Early hospitals get exclusive first-mover advantage — lock in your territory before a competitor does.",
    color: "from-teal-400 to-cyan-400",
    border: "border-teal-400/20",
    bg: "bg-teal-500/5",
  },
  {
    icon: "savings",
    title: "Founding partner pricing",
    body: "Lock in our lowest rates forever. Founding partners never pay full price — guaranteed in writing.",
    color: "from-indigo-400 to-purple-400",
    border: "border-indigo-400/20",
    bg: "bg-indigo-500/5",
  },
  {
    icon: "support_agent",
    title: "White-glove onboarding",
    body: "Our team personally sets up Xyras for you in 48 hours. Dedicated support, zero friction, zero downtime.",
    color: "from-amber-400 to-orange-400",
    border: "border-amber-400/20",
    bg: "bg-amber-500/5",
  },
];

function useCountUp(target: number, inView: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(id); }
      else setValue(start);
    }, 28);
    return () => clearInterval(id);
  }, [inView, target]);
  return value;
}

function StatCard({ n, suffix, desc, color }: typeof STATS[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(n, inView);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative text-center py-8 px-4 rounded-2xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${color} rounded-t-2xl`} />
      <div className={`font-headline font-extrabold text-[2.8rem] sm:text-[3.2rem] leading-none mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {count}{suffix}
      </div>
      <p className="text-[12.5px] font-semibold text-white/60 uppercase tracking-wide">{desc}</p>
    </div>
  );
}

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="fade-up-section" id="testimonials">

      {/* ── Dark navy stats band ── */}
      <div className="section-px section-py" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F4C42 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <p className="text-teal-400 font-semibold text-[13px] uppercase tracking-[0.18em] mb-3">Results</p>
            <h2 className="font-headline font-extrabold text-white leading-tight text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">
              Built to deliver results from day one
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(s => <StatCard key={s.desc} {...s} />)}
          </div>
        </div>
      </div>

      {/* ── Be our next customer ── */}
      <div className="section-px section-py bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <p className="text-secondary font-semibold text-[12px] uppercase tracking-[0.2em] mb-3">Early Access</p>
            <h2 className="font-headline font-extrabold text-primary leading-tight text-[2rem] sm:text-[2.6rem] lg:text-[3rem] mb-4">
              Be the hospital that sets the standard.
            </h2>
            <p className="text-on-surface-variant text-[15px] sm:text-[16px] leading-[1.8]">
              We&apos;re onboarding our first cohort of hospital partners right now. No legacy integrations. No long contracts.
              Just a smarter front desk — live in 48 hours.
            </p>
          </div>

          {/* Perk cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
            {PERKS.map(({ icon, title, body, color, border, bg }) => (
              <div
                key={title}
                className={`relative flex flex-col gap-4 p-6 sm:p-7 rounded-2xl border ${border} ${bg}
                            hover:shadow-[0_12px_40px_rgba(15,23,42,0.10)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
              >
                <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${color} rounded-t-2xl`} />
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: '"FILL" 1' }}>{icon}</span>
                </div>
                <div>
                  <p className="font-bold text-primary text-[15px] mb-2">{title}</p>
                  <p className="text-on-surface-variant text-[13.5px] leading-[1.75]">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Big CTA strip */}
          <div
            className="relative rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #0F4C42 100%)" }}
          >
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-teal-500/15 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />

            <div className="relative text-center sm:text-left">
              <p className="font-headline font-extrabold text-white text-[1.6rem] sm:text-[2rem] lg:text-[2.4rem] leading-tight mb-2">
                Your hospital could be first. 🏥
              </p>
              <p className="text-slate-300 text-[14px] sm:text-[15px] leading-relaxed max-w-md">
                Limited early-access slots. Cancel anytime. Setup in 48 hours.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="#pricing"
                className="bg-secondary text-white font-bold text-[14px] sm:text-[15px] px-8 py-4 rounded-full
                           hover:bg-secondary/90 active:scale-[0.98] transition-all text-center
                           shadow-[0_6px_24px_rgba(13,148,136,0.5)] whitespace-nowrap"
              >
                Claim early access →
              </a>
              <a
                href="#how-it-works"
                className="font-bold text-[14px] sm:text-[15px] px-8 py-4 rounded-full transition-all text-center whitespace-nowrap"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff" }}
              >
                See how it works
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
