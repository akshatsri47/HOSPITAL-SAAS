"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ManifestoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0E1726] overflow-x-clip pt-20">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-20 px-6 relative">
        {/* Ambient Warm Website Glows */}
        <div className="absolute top-[25%] left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#00C2A8]/6 to-transparent blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[25%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#5B8DEF]/6 to-transparent blur-[120px] pointer-events-none z-0" />

        {/* Outer Grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04] select-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, #0E1726 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />

        <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C2A8]/8 border border-[#00C2A8]/15"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-secondary uppercase tracking-[0.25em]">
              Manifesto · The Xyras Imperative
            </span>
          </motion.div>

          {/* Central Visionary Main Image (Premium Stock Photo with Soft Frame) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-[340px] h-[240px] sm:w-[500px] sm:h-[320px] mx-auto rounded-[32px] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 bg-white p-2 border border-[#0E1726]/5"
          >
            {/* Ambient colorful border accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C2A8] via-[#5B8DEF] to-transparent opacity-10 rounded-[32px]" />
            
            {/* The Unsplash stock photo representing collaborative visionaries */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80" 
              alt="Xyras Visionary Team" 
              className="w-full h-full object-cover rounded-[24px]"
            />
          </motion.div>

          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-left"
          >
            <h2 className="font-headline font-extrabold text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-none tracking-tight text-primary">
              The Tyranny of the Machine is Over.
            </h2>
            <p className="text-[#64748B] text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed font-body">
              For decades, we&apos;ve been chained to boxes. Boxes we buy, boxes we upgrade, boxes that rust, boxes that limit. We beg for performance, drown in setup, and watch genius wither while waiting for a GPU to spin up. <span className="italic text-primary font-semibold">This is not computing; this is captivity.</span>
            </p>
          </motion.div>

          <hr className="border-[#0E1726]/10 my-8" />

          {/* Visionary Section (Goal & Visionary After A Lot of Thinking) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 text-left"
          >
            <h3 className="font-headline font-bold text-primary text-[1.6rem] sm:text-[1.8rem] tracking-tight">
              Our Vision: Dematerialized Operations.
            </h3>
            
            <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed">
              We did not build Xyras to simply replace an answering service. We built Xyras to liberate businesses from physical operational caps. True customer communication shouldn&apos;t depend on staff schedules, local office infrastructure, or language availability. 
            </p>

            {/* Visionary Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {[
                {
                  title: "Empathetic Connection",
                  desc: "We engineer AI voice models with true clinical warmth, intuitive pauses, and native regional accent matching."
                },
                {
                  title: "Absolute Democratization",
                  desc: "Giving single-practitioner teams and small startups identical operational muscles as multi-billion dollar global conglomerates."
                }
              ].map((pillar) => (
                <div 
                  key={pillar.title} 
                  className="bg-white border border-[#0E1726]/5 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all"
                >
                  <h4 className="text-[13px] font-bold text-primary font-mono uppercase tracking-wide mb-1.5">{pillar.title}</h4>
                  <p className="text-[#64748B] text-[11.5px] leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Elegant Signature */}
            <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-headline text-[13px] text-primary font-bold tracking-wider">XYRAS AI FOUNDRY</p>
                <p className="font-mono text-[9.5px] text-slate-400 uppercase tracking-widest mt-0.5">EST. 2026 // BENT ON SCALE</p>
              </div>

              <Link 
                href="/"
                className="font-mono text-[11px] font-bold text-[#0E1726] border border-[#0E1726]/15 hover:border-[#0E1726] bg-[#0E1726]/5 hover:bg-[#0E1726]/10 px-5 py-2.5 rounded-full transition-all"
              >
                Back to Home Desk
              </Link>
            </div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
