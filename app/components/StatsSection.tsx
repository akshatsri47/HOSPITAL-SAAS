"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { val: "24×7", desc: "Availability", label: "Always answering" },
  { val: "12", desc: "Languages", label: "Natively triaged" },
  { val: "<2 sec", desc: "Response Time", label: "Zero hold queues" },
];

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
        
        {/* Large typography block */}
        <div className="text-center max-w-3xl mb-16 sm:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-headline font-normal italic text-[#0E1726] text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-tight tracking-tight"
          >
            "One platform. <br className="hidden sm:inline" />
            <span className="text-secondary font-headline italic font-bold">Every conversation.</span>"
          </motion.p>
        </div>

        {/* 3 Metrics Grid with huge whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24 w-full">
          {METRICS.map(({ val, desc, label }, idx) => (
            <motion.div
              key={desc}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 + idx * 0.1 }}
              className="flex flex-col items-center text-center space-y-2 group"
            >
              <div className="font-headline font-extrabold text-[3.5rem] sm:text-[4.5rem] leading-none text-primary transition-transform duration-300 group-hover:scale-105">
                {val}
              </div>
              <div className="font-body font-bold text-[#0E1726] text-[15px] sm:text-[16px]">
                {desc}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-wider text-[#64748B] font-bold">
                {label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
