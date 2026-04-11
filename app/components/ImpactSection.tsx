"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { n: 60,  suffix: "%",  desc: "Fewer missed calls",       color: "from-teal-400 to-cyan-300" },
  { n: 95,  suffix: "%",  desc: "Patient satisfaction",     color: "from-teal-400 to-emerald-300" },
  { n: 30,  suffix: "%",  desc: "Less front-desk workload", color: "from-indigo-400 to-blue-300" },
  { n: 12,  suffix: "+",  desc: "Languages supported",      color: "from-teal-400 to-cyan-300" },
];

const TESTIMONIALS = [
  {
    quote: "Aura has completely changed how we handle morning rush. We used to miss 30–40% of calls before 9AM. Now every call is answered immediately in the patient's own language.",
    name:  "Dr. Ananya Sharma",
    role:  "Medical Director",
    org:   "Metro Multispeciality, Bangalore",
    topColor: "from-teal-400 to-cyan-400",
    ringColor: "ring-teal-400",
  },
  {
    quote: "Our Hindi and Kannada-speaking patients were struggling to communicate. Aura made them feel respected from the first call. Our NPS jumped 22 points in two months.",
    name:  "Priya Menon",
    role:  "Head of Operations",
    org:   "Sunrise Hospitals, Chennai",
    topColor: "from-indigo-400 to-purple-400",
    ringColor: "ring-indigo-400",
  },
  {
    quote: "The ROI was clear in the first week. Fewer staff hours on phone queues, zero missed emergency contacts, and patients booking their own appointments in Telugu. Incredible.",
    name:  "Rajan Pillai",
    role:  "CEO",
    org:   "Lifeline Health Group, Hyderabad",
    topColor: "from-amber-400 to-orange-400",
    ringColor: "ring-amber-400",
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
      {/* Subtle gradient glow behind number */}
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
              Hospitals that chose Aura don&apos;t look back
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map(s => <StatCard key={s.desc} {...s} />)}
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="section-px section-py bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map(({ quote, name, role, org, topColor, ringColor }) => (
              <div key={name}
                className="group flex flex-col gap-5 p-6 sm:p-7 bg-white rounded-2xl border border-slate-100 relative overflow-hidden
                           hover:shadow-[0_12px_40px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300">
                {/* Colored top border */}
                <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${topColor}`} />
                {/* Stars */}
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-amber-400 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  ))}
                </div>
                <p className="text-[14px] sm:text-[15px] text-on-surface-variant leading-[1.75] flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3.5 pt-2 border-t border-slate-100">
                  {/* Larger avatar with colored ring */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${topColor} flex items-center justify-center ring-2 ${ringColor} ring-offset-2 flex-shrink-0`}>
                    <span className="text-white font-extrabold text-[16px]">{name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-primary">{name}</p>
                    <p className="text-[11.5px] text-on-surface-variant">{role} · {org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
