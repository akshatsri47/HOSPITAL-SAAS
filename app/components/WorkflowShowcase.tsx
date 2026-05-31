"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Workflow card data (Generic Business & SaaS Use Cases) ── */
const WORKFLOWS = [
  {
    title: "Lead Qualification",
    description:
      "Pre-screen inbound prospects, score leads, and book product demonstrations directly into calendars 24×7.",
    icon: "leaderboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    accent: "#00C2A8",
  },
  {
    title: "Customer Support",
    description:
      "Resolve frequent customer service tickets, answer standard account FAQs, and trigger live status checks instantly.",
    icon: "headset_mic",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80",
    accent: "#5B8DEF",
  },
  {
    title: "Smart Scheduling",
    description:
      "Book consulting consultations, schedule client appointments, and coordinate complex multi-person availability.",
    icon: "calendar_month",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
    accent: "#A78BFA",
  },
  {
    title: "Logistics & Ops",
    description:
      "Update real-time delivery statuses, trace package courier locations, and automatically adjust warehousing logs.",
    icon: "local_shipping",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    accent: "#FBBF24",
  },
  {
    title: "E-Commerce Checkout",
    description:
      "Authorize secure transaction states, verify coupon eligibility, and process seamless refund pipelines on the spot.",
    icon: "shopping_bag",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    accent: "#EF4444",
  },
];

export default function WorkflowShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="section-px py-20 sm:py-28 bg-white border-b border-[#0E1726]/5 overflow-hidden"
      id="workflows"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 sm:mb-18"
        >
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-4">
            06 · Built for Every Workflow
          </p>
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[3rem] lg:text-[3.6rem] leading-tight tracking-tight mb-4">
            Built for Every Workflow,{" "}
            <br className="hidden sm:inline" />
            Every Team
          </h2>
          <p className="text-[#64748B] text-[15px] sm:text-[16px] max-w-[48ch] mx-auto leading-relaxed">
            From hyper-growth startups to global enterprise service teams, Xyras
            adapts to your operational needs and scales with your ambitions.
          </p>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 px-2 scrollbar-hide snap-x snap-mandatory"
               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {WORKFLOWS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group flex-shrink-0 w-[260px] sm:w-[280px] snap-center"
              >
                {/* Card image wrapper */}
                <div
                  className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[260px] mb-4 shadow-card group-hover:shadow-card-hover transition-all duration-500 bg-[#0E1726]"
                >
                  {/* Stock Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Elegant navy overlay to maintain text/icon contrast */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0E1726]/20 via-[#0E1726]/50 to-[#0E1726]/85" />

                  {/* Decorative grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Accent Colored Line Indicator */}
                  <div 
                    className="absolute top-0 inset-x-0 h-1.5 transition-opacity opacity-80"
                    style={{ backgroundColor: card.accent }}
                  />

                  {/* Large icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "56px",
                        color: card.accent,
                        opacity: 0.9,
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.icon}
                    </motion.span>
                  </div>

                  {/* Arrow button */}
                  <div className="absolute bottom-4 left-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: card.accent,
                        borderColor: `${card.accent}50`,
                      }}
                    >
                      <span className="material-symbols-outlined text-white text-[16px]">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card text content */}
                <div className="px-1">
                  <h3 className="font-headline font-bold text-[#0E1726] text-[17px] sm:text-[18px] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[#64748B] text-[13px] sm:text-[13.5px] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
