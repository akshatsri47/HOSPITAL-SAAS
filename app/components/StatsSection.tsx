"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CAPABILITIES = [
  {
    metric: "100K+ minutes processed",
    title: "Sales & Lead Qualification",
    description:
      "Engage new leads, answer product questions, and qualify opportunities around the clock.",
    icon: "trending_up",
    className:
      "bg-[linear-gradient(145deg,#ECFDF9_0%,#D9F6EF_52%,#C9EEE7_100%)] text-[#0B302B]",
    pillClassName: "border-[#0B302B]/20 bg-white/35",
    glowClassName: "bg-[#64E4CF]/45",
  },
  {
    metric: "50K+ actions automated",
    title: "Bookings & Reminders",
    description:
      "Schedule appointments, send timely reminders, and keep calendars organized automatically.",
    icon: "calendar_month",
    className:
      "bg-[linear-gradient(145deg,#08BEA4_0%,#009D8E_52%,#087B78_100%)] text-white",
    pillClassName: "border-white/35 bg-white/10",
    glowClassName: "bg-[#8DFFF0]/25",
  },
  {
    metric: "24×7 conversations handled",
    title: "Customer Support",
    description:
      "Resolve routine questions instantly and escalate complex conversations to the right team.",
    icon: "support_agent",
    className:
      "bg-[linear-gradient(145deg,#1C2B46_0%,#111C30_55%,#0A1221_100%)] text-white",
    pillClassName: "border-white/25 bg-white/5",
    glowClassName: "bg-[#5B8DEF]/30",
  },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-px bg-white py-24 sm:py-32 overflow-hidden"
      id="stats"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-12 lg:grid-cols-[1.45fr_0.8fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_0_7px_rgba(0,194,168,0.1)]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
                Intelligent call automation
              </span>
            </div>

            <h2 className="max-w-[13ch] font-body text-[3.25rem] font-bold leading-[0.94] tracking-[-0.065em] text-primary sm:text-[4.5rem] lg:text-[5.15rem]">
              Automate every customer conversation
            </h2>

            <motion.span
              initial={{ opacity: 0, rotate: -8, scale: 0.86 }}
              animate={inView ? { opacity: 1, rotate: -5, scale: 1 } : {}}
              transition={{
                delay: 0.35,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute right-[3%] top-[38%] hidden rounded-[18px] bg-[#FFD44A] px-6 py-3 font-handwritten text-[1.45rem] font-bold text-primary shadow-[0_16px_40px_rgba(255,212,74,0.28)] sm:block lg:right-[8%]"
            >
              No-code
            </motion.span>

            <p className="mt-7 max-w-2xl font-body text-[17px] leading-relaxed text-[#526078] sm:text-[20px]">
              Build a reliable AI team for sales, bookings, reminders, and
              everyday customer support—without adding pressure to your staff.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.18,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pb-2 lg:pb-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F8F5] text-lg font-bold text-[#087B6F] ring-1 ring-[#00C2A8]/20">
                XO
              </div>
              <div>
                <p className="text-[18px] font-bold tracking-tight text-primary">
                  Business Operations
                </p>
                <div
                  className="mt-1 flex gap-0.5 text-[#54A817]"
                  aria-label="Five star rating"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className="material-symbols-outlined text-[21px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-[#526078]">
              “Xyras feels like an always-on sales and support team—fast,
              consistent, and ready for every conversation.”
            </p>
          </motion.aside>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3 sm:mt-20 lg:gap-7">
          {CAPABILITIES.map((capability, index) => (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: 34 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.22 + index * 0.1,
                duration: 0.72,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              className={`group relative flex min-h-[450px] flex-col overflow-hidden rounded-[40px] p-7 shadow-[0_22px_60px_rgba(14,23,38,0.09)] ring-1 ring-inset ring-white/20 transition-shadow duration-300 hover:shadow-[0_32px_90px_rgba(14,23,38,0.17)] sm:p-9 ${capability.className}`}
            >
              <div
                className={`absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125 ${capability.glowClassName}`}
              />
              <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute right-7 top-7 h-16 w-16 rounded-full border border-current opacity-[0.08]" />
              <div className="absolute right-[3.2rem] top-[3.2rem] h-2 w-2 rounded-full bg-current opacity-25" />

              <div
                className={`relative z-10 flex w-fit items-center gap-2.5 rounded-full border px-4 py-2.5 text-[11px] font-bold tracking-[-0.01em] backdrop-blur-md ${capability.pillClassName}`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10">
                  <span className="material-symbols-outlined text-[16px]">
                    {capability.icon}
                  </span>
                </span>
                {capability.metric}
              </div>

              <div className="relative z-10 mt-auto pt-20">
                <h3 className="max-w-[11ch] font-body text-[2.55rem] font-bold leading-[0.98] tracking-[-0.06em] sm:text-[2.85rem] lg:text-[3.25rem]">
                  {capability.title}
                </h3>
                <p className="mt-7 max-w-[31ch] text-[16px] leading-relaxed opacity-75 sm:text-[17px]">
                  {capability.description}
                </p>
              </div>

              <div className="absolute bottom-8 right-8 flex h-11 w-11 items-center justify-center rounded-full border border-current opacity-20 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-60">
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
