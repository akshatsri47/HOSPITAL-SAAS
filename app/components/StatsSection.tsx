"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { val: "24×7", numericVal: null, suffix: "", desc: "Availability", label: "Always answering", icon: "schedule" },
  { val: "12", numericVal: 12, suffix: "+", desc: "Languages", label: "Natively triaged", icon: "language" },
  { val: "<2 sec", numericVal: null, suffix: "", desc: "Response Time", label: "Zero hold queues", icon: "bolt" },
];

function useCountUp(target: number | null, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === null) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

type MetricItem = { val: string; numericVal: number | null; suffix: string; desc: string; label: string; icon: string };

function MetricCard({ val, numericVal, suffix, desc, label, icon, inView, delay }: MetricItem & { inView: boolean; delay: number }) {
  const count = useCountUp(numericVal, inView);
  const displayVal = numericVal !== null ? `${count}${suffix}` : val;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="group flex flex-col items-center text-center space-y-3"
    >
      {/* Icon badge */}
      <div className="w-10 h-10 rounded-2xl bg-[#0E1726]/5 border border-[#0E1726]/8 flex items-center justify-center mb-1 group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-all duration-300">
        <span className="material-symbols-outlined text-[18px] text-secondary">{icon}</span>
      </div>
      <div className="font-headline font-extrabold text-[3.5rem] sm:text-[4.5rem] leading-none text-primary transition-transform duration-300 group-hover:scale-105 tabular-nums">
        {displayVal}
      </div>
      <div className="font-body font-bold text-[#0E1726] text-[15px] sm:text-[16px]">
        {desc}
      </div>
      <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#64748B] font-bold">
        {label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-px py-24 sm:py-36 bg-[#F8FAFC] border-b border-[#0E1726]/5 overflow-hidden"
      id="stats"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        {/* Large editorial quote */}
        <div className="text-center max-w-3xl mb-16 sm:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline font-normal italic text-[#0E1726] text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-tight tracking-tight"
          >
            &ldquo;One platform. <br className="hidden sm:inline" />
            <span className="text-secondary font-headline italic font-bold">Every conversation.&rdquo;</span>
          </motion.p>
        </div>

        {/* Gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full max-w-xs h-px mb-16 sm:mb-24 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, #00C2A8, #5B8DEF, transparent)" }}
        />

        {/* 3 Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 w-full">
          {METRICS.map((m, idx) => (
            <MetricCard key={m.desc} {...m} inView={inView} delay={0.2 + idx * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
