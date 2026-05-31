"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const INTEGRATIONS = [
  { name: "Salesforce CRM", icon: "hub" },
  { name: "Epic Systems", icon: "local_hospital" },
  { name: "Twilio Voice", icon: "call" },
  { name: "HubSpot", icon: "sync" },
  { name: "PostgreSQL", icon: "database" },
  { name: "WhatsApp Sync", icon: "chat" },
  { name: "Zendesk Desk", icon: "support_agent" },
  { name: "Cal.com API", icon: "calendar_month" },
];

export default function IntegrationsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const doubleIntegrations = [...INTEGRATIONS, ...INTEGRATIONS];

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={ref}
      className="bg-[#F8FAFC] py-20 sm:py-28 border-b border-[#0E1726]/5"
    >
      <div className="section-px max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Simple sentence heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-headline font-extrabold text-[#0E1726] text-[1.8rem] sm:text-[2.5rem] leading-tight tracking-tight">
            Works with the systems your business already uses.
          </p>
        </motion.div>

        {/* Marquee Track Container */}
        <div className="relative w-full overflow-hidden py-2 select-none pointer-events-none">
          {/* Fading side masks for gradient fade */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

          {/* Scrolling Track */}
          <div className="flex w-max gap-8 animate-marquee">
            {doubleIntegrations.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2.5 px-6 py-4.5 rounded-2xl bg-white border border-[#0E1726]/5 shadow-[0_2px_12px_rgba(14,23,38,0.01)]"
              >
                {/* Grayscale hospital logo icon */}
                <div className="w-8 h-8 rounded-xl bg-[#0E1726]/5 flex items-center justify-center text-[#0E1726]/70">
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                </div>
                <span className="font-mono text-[11.5px] font-bold text-[#0E1726]/60 tracking-wider">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
