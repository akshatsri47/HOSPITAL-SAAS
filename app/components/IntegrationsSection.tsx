"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const INTEGRATIONS_ROW1 = [
  { name: "Salesforce CRM", icon: "hub" },
  { name: "Epic Systems", icon: "local_hospital" },
  { name: "Twilio Voice", icon: "call" },
  { name: "HubSpot", icon: "sync" },
  { name: "PostgreSQL", icon: "database" },
  { name: "WhatsApp Sync", icon: "chat" },
  { name: "Zendesk Desk", icon: "support_agent" },
  { name: "Cal.com API", icon: "calendar_month" },
];

const INTEGRATIONS_ROW2 = [
  { name: "Practo EHR", icon: "medical_services" },
  { name: "Zoho CRM", icon: "hub" },
  { name: "Freshdesk", icon: "headset_mic" },
  { name: "Stripe Billing", icon: "payments" },
  { name: "Google Calendar", icon: "event" },
  { name: "Slack Alerts", icon: "notifications" },
  { name: "Intercom", icon: "forum" },
  { name: "PipeDrive", icon: "leaderboard" },
];

function MarqueeRow({ items, reverse = false }: { items: typeof INTEGRATIONS_ROW1; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden py-1 select-none pointer-events-none">
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marqueeScroll ${reverse ? "20s" : "24s"} linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white border border-[#0E1726]/5 shadow-[0_2px_12px_rgba(14,23,38,0.01)] flex-shrink-0"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0E1726]/5 flex items-center justify-center text-[#0E1726]/70">
              <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-[#0E1726]/55 tracking-wider whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-4">
            Integrations
          </p>
          <p className="font-headline font-extrabold text-[#0E1726] text-[1.8rem] sm:text-[2.5rem] leading-tight tracking-tight max-w-2xl mx-auto">
            Works with the systems your business already uses.
          </p>
        </motion.div>

        {/* Dual marquee rows */}
        <div className="flex flex-col gap-3">
          <MarqueeRow items={INTEGRATIONS_ROW1} />
          <MarqueeRow items={INTEGRATIONS_ROW2} reverse />
        </div>

      </div>
    </section>
  );
}
