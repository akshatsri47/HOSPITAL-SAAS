"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TestimonialQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden select-none"
      id="testimonial-quote"
    >
      {/* Background gradient (deep dark green → black) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0a1f1a 0%, #0B1215 35%, #080C0F 70%, #050708 100%)",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow spots */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "#00C2A8" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full opacity-[0.03] blur-[80px]"
        style={{ background: "#5B8DEF" }}
      />

      <div className="relative section-px py-24 sm:py-32 lg:py-40 max-w-5xl mx-auto">
        {/* Opening quotation marks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-12 sm:top-16 lg:top-20 left-6 sm:left-10 lg:left-0"
        >
          <span
            className="font-headline font-extrabold leading-none text-white/[0.08]"
            style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
          >
            &ldquo;
          </span>
        </motion.div>

        {/* Closing quotation marks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-6 sm:right-10 lg:right-0"
        >
          <span
            className="font-headline font-extrabold leading-none text-white/[0.08]"
            style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
          >
            &rdquo;
          </span>
        </motion.div>

        {/* Quote content */}
        <div className="relative z-10 text-center space-y-8 sm:space-y-10 px-4 sm:px-8 lg:px-16">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <p className="font-headline font-extrabold text-white text-[1.4rem] sm:text-[2rem] lg:text-[2.6rem] leading-[1.25] tracking-tight">
              &ldquo;We&apos;re not just building a call center —{" "}
              <br className="hidden lg:inline" />
              we&apos;re rethinking what business communication{" "}
              <br className="hidden lg:inline" />
              looks like in a voice-first,{" "}
              <span className="text-brand-gradient">AI-native world</span>
              ..&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex flex-col items-center gap-3"
          >
            {/* Thin divider */}
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <p className="font-mono text-[12px] sm:text-[13px] text-white/50 tracking-wider uppercase font-bold">
              Xyras Team
            </p>

            {/* Decorative monogram */}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-px bg-white/10" />
              <span className="font-headline text-[11px] text-white/20 tracking-widest">
                XYRAS
              </span>
              <div className="w-6 h-px bg-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
