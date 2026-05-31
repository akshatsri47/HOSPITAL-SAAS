"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const SHOWCASES = [
  {
    idx: "01",
    title: "Healthcare",
    tag: "Clinical Operations",
    desc: "Answer inbound patient calls, check real-time doctor availability, book appointments, and handle ledger questions with sub-second billing checks.",
    icon: "local_hospital",
    color: "#00C2A8",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #F0FDFA 100%)",
    glow: "rgba(0, 194, 168, 0.15)",
    href: "/healthcare",
  },
  {
    idx: "02",
    title: "Real Estate",
    tag: "Sales & Listings",
    desc: "Capture cold property leads, schedule physical walkthrough appointments, and answer tenant maintenance requests natively in any language.",
    icon: "home",
    color: "#5B8DEF",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #EEF2FF 100%)",
    glow: "rgba(91, 141, 239, 0.15)",
    href: "/real-estate",
  },
  {
    idx: "03",
    title: "Restaurants",
    tag: "Hospitality & Bookings",
    desc: "Coordinate dining table reservations, catalog customized guest dietary instructions, and manage outbound order notifications 24/7.",
    icon: "restaurant",
    color: "#FF9F43",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)",
    glow: "rgba(255, 159, 67, 0.15)",
    href: "/restaurants",
  },
  {
    idx: "04",
    title: "Automotive",
    tag: "Dealership Desks",
    desc: "Book periodic vehicle maintenance slots, schedule dealer test-drive hours, and address complex warranty or service policy FAQs instantly.",
    icon: "directions_car",
    color: "#A55EEA",
    bgGradient: "linear-gradient(135deg, #FFFFFF 0%, #FAF5FF 100%)",
    glow: "rgba(165, 94, 234, 0.15)",
    href: "/automotive",
  },
];

export default function IndustryShowcase() {
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
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={ref}
      className="section-px py-20 sm:py-28 bg-[#F8FAFC] border-b border-[#0E1726]/5 overflow-hidden"
      id="solutions"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Simple Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-3">
            04 · Vertical Solutions
          </p>
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] sm:text-[3rem] tracking-tight">
            Built for your industry.
          </h2>
          <p className="text-[#64748B] text-[15px] sm:text-[16px] leading-relaxed max-w-[42ch] mx-auto mt-3">
            Click to explore dedicated AI voice templates and deep programmatic integrations ready for deployment.
          </p>
        </div>

        {/* Showcase Grid - Large, Gorgeous Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SHOWCASES.map((item, idx) => (
            <Link href={item.href} key={item.title} className="block">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: `0 24px 60px ${item.glow}, 0 1px 3px rgba(14,23,38,0.02)`
                }}
                className="group relative rounded-[32px] border border-[#0E1726]/5 p-8 flex flex-col justify-between transition-all duration-350 cursor-pointer overflow-hidden text-left h-full"
                style={{
                  background: item.bgGradient,
                  boxShadow: "0 12px 36px rgba(14,23,38,0.02), 0 1px 2px rgba(14,23,38,0.01)"
                }}
              >
                {/* Top accent sweeping line on hover */}
                <div 
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-[32px] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left"
                  style={{ backgroundColor: item.color }}
                />

                <div className="space-y-6 relative z-10">
                  {/* Header Tag and index */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold text-[#64748B] bg-[#0E1726]/5 border border-[#0E1726]/8 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-slate-300">
                      // {item.idx}
                    </span>
                  </div>

                  {/* Main Copy */}
                  <div className="space-y-2">
                    <h3 className="font-headline font-extrabold text-[#0E1726] text-[22px] sm:text-[24px] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[#64748B] text-[13.5px] sm:text-[14px] leading-relaxed max-w-[42ch]">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Icon and Explore Trigger */}
                <div className="flex items-end justify-between pt-10 relative z-10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-350"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color
                    }}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#0E1726] transition-colors">
                    Explore Solution
                    <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>

              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
