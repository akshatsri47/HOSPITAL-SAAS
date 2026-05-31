"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    icon: "shield_lock",
    title: "Encrypted Calls",
    desc: "Fully aligned with HIPAA protocols, SOC 2 Type II, and DPDP frameworks. Call audio streams and database records are highly encrypted.",
    badge: "SOC 2 & HIPAA"
  },
  {
    icon: "cloud_done",
    title: "99.9% Uptime",
    desc: "Robust high-concurrency server architecture ensuring seamless inbound call loops even during intense customer surge waves.",
    badge: "Uptime SLA"
  },
  {
    icon: "clinical_notes",
    title: "Full Audit Logs",
    desc: "Every interaction is categorized, transcribed, and logged with comprehensive audio streams available for corporate audits.",
    badge: "Complete Logs"
  },
  {
    icon: "admin_panel_settings",
    title: "Role-Based Access",
    desc: "Granular administrative privileges ensuring only verified support personnel can cross-reference sensitive customer data profiles.",
    badge: "Data Isolation"
  }
];

export default function TrustSection() {
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
      id="trust"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Simple visual section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-3">
            06 · Enterprise Grade Infrastructure
          </p>
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] sm:text-[3.2rem] tracking-tight">
            Built for enterprise.
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CARDS.map(({ icon, title, desc, badge }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              className="group relative bg-white border border-[#0E1726]/8 rounded-3xl p-6 sm:p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 card-hover-sweep cursor-default"
            >
              {/* Top border sweep visual */}
              <div className="absolute inset-x-0 top-0 h-[2.5px] bg-[#5B8DEF] rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Title & Badge */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#0E1726] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    {icon}
                  </span>
                </div>
                <span className="font-mono text-[9px] font-bold text-[#64748B] bg-[#0E1726]/5 border border-[#0E1726]/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {badge}
                </span>
              </div>

              {/* Text */}
              <h3 className="font-headline font-bold text-[#0E1726] text-[17px] sm:text-[18px] mb-2">
                {title}
              </h3>
              <p className="text-[#64748B] text-[13.5px] sm:text-[14px] leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
