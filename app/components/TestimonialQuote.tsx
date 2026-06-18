"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Xyras reduced our missed appointment calls by over 80% in the first month. Patients now get instant responses in Hindi and Tamil — something our front desk simply couldn't do at 2 AM.",
    author: "Dr. Meera Pillai",
    role: "CMO, Fortis Group Hospitals",
    industry: "Healthcare",
    icon: "local_hospital",
    accentColor: "#00C2A8",
  },
  {
    quote:
      "Our dealership used to miss 40+ service booking calls a week. Since deploying Xyras, every call is answered instantly and the booking confirms directly in our DMS. Revenue impact is real.",
    author: "Rahul Sharma",
    role: "Operations Director, AutoNation India",
    industry: "Automotive",
    icon: "directions_car",
    accentColor: "#A55EEA",
  },
  {
    quote:
      "We handle 300+ reservation calls on weekends. Xyras handles them all simultaneously with perfect table-allocation logic. Our hosts now focus on hospitality, not the phone.",
    author: "Chef Priya Venkatesh",
    role: "Founder, The Spice Route Group",
    industry: "Restaurants",
    icon: "restaurant",
    accentColor: "#FF9F43",
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[14px] text-yellow-400"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function TestimonialQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [active, setActive] = useState(0);

  // Auto-cycle testimonials every 6s
  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden select-none"
      id="testimonials"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(160deg, #0a1f1a 0%, #0B1215 35%, #080C0F 70%, #050708 100%)",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow — adapts to active testimonial color */}
      <motion.div
        key={active}
        animate={{ opacity: [0, 0.07, 0.07] }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: current.accentColor }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full opacity-[0.03] blur-[80px]"
        style={{ background: "#5B8DEF" }}
      />

      <div className="relative section-px py-20 sm:py-32 lg:py-40 max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <div className="w-8 h-px bg-white/20" />
          <span className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-widest">
            Customer Stories
          </span>
          <div className="w-8 h-px bg-white/20" />
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative min-h-[280px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-8 px-4 sm:px-8 lg:px-16"
            >
              <StarRating />

              <blockquote>
                <p className="font-headline font-extrabold text-white text-[1.3rem] sm:text-[1.9rem] lg:text-[2.3rem] leading-[1.3] tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>

              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-px bg-white/15" />
                <div className="flex items-center gap-3 mt-1">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${current.accentColor}20`, border: `1px solid ${current.accentColor}40` }}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ color: current.accentColor, fontVariationSettings: '"FILL" 1' }}
                    >
                      {current.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[12px] font-bold text-white/80">{current.author}</p>
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{current.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots with spring hover */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? "w-6 h-2 bg-white/70" : "w-2 h-2 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
