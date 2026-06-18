"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const CAPABILITIES = [
  { label: "Voice Agents", desc: "Low-latency human-like voice agents", icon: "record_voice_over" },
  { label: "Inbound Calls", desc: "Route and answer calls instantly 24/7", icon: "call_received" },
  { label: "Outbound Calls", desc: "Automate high-volume lead qualification", icon: "call_made" },
  { label: "Appointment Booking", desc: "Sync live calendars and log slots", icon: "calendar_today" },
  { label: "Lead Qualification", desc: "Sift potential clients instantly", icon: "filter_alt" },
  { label: "Customer Support", desc: "Resolve ticketing queries in seconds", icon: "support_agent" },
];

const SOLUTIONS = [
  { label: "Healthcare", desc: "Triage patients, appointments, billing", icon: "local_hospital", href: "/healthcare" },
  { label: "Real Estate", desc: "Qualify property leads & book viewings", icon: "home", href: "/real-estate" },
  { label: "Restaurants", desc: "Automate booking table reservations", icon: "restaurant", href: "/restaurants" },
  { label: "Automotive", desc: "Book test drives and scheduling", icon: "directions_car", href: "/automotive" },
  { label: "Education", desc: "Nurture registrations & answer FAQs", icon: "school", href: "/#solutions" },
  { label: "Financial Services", desc: "Answer ledger balances & card status", icon: "account_balance", href: "/#solutions" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [spinLogo, setSpinLogo] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSpinLogo(true);
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#F8FAFC]/85 backdrop-blur-md border-b border-[#0E1726]/5 py-3 shadow-[0_1px_3px_rgba(14,23,38,0.02)]" 
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        
        {/* Logo left */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <svg 
            className={`w-7 h-7 text-secondary transition-transform duration-1000 ease-out ${
              spinLogo ? "rotate-[360deg]" : ""
            }`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 4.24 4.24" />
            <path d="m14.83 9.17 4.24-4.24" />
            <path d="m14.83 14.83 4.24 4.24" />
            <path d="m9.17 14.83-4.24 4.24" />
            <circle cx="12" cy="12" r="4" fill="currentColor" className="animate-pulse" />
          </svg>
          <span className="font-headline font-extrabold text-[20px] tracking-tight text-primary">
            xyras<span className="text-secondary font-sans font-black">.</span>
          </span>
        </Link>

        {/* Desktop Links Center */}
        <nav className="hidden lg:flex items-center gap-6">
          
          {/* Products Hover Megamenu */}
          <div 
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="relative px-3 py-2 text-[12.5px] font-mono uppercase tracking-wider text-[#334155] hover:text-[#0E1726] font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-1">
              Products
              <span className={`material-symbols-outlined text-[15px] transition-transform duration-300 ${showDropdown ? "rotate-180 text-secondary" : ""}`}>
                expand_more
              </span>
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[700px] z-50 pointer-events-auto"
                >
                  <div 
                    className="bg-white border border-[#0E1726]/8 rounded-[28px] p-6.5 shadow-card grid grid-cols-12 gap-8 relative overflow-hidden"
                    style={{
                      boxShadow: "0 24px 70px rgba(14,23,38,0.08), 0 1px 3px rgba(14,23,38,0.02)"
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-secondary/2 via-transparent to-[#5B8DEF]/2" />
                    
                    {/* Left Column - Voice Platform */}
                    <div className="col-span-7 space-y-4 z-10">
                      <h6 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#0E1726]/5 pb-2 mb-3">
                        Voice Platform
                      </h6>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {CAPABILITIES.map((item) => (
                          <Link
                            key={item.label}
                            href="/#capabilities"
                            className="flex items-start gap-3 p-1.5 rounded-xl hover:bg-[#F8FAFC] transition-all group text-left"
                          >
                            <div className="w-8.5 h-8.5 rounded-lg bg-[#0E1726]/5 text-[#0E1726]/70 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-colors flex-shrink-0">
                              <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                            </div>
                            <div>
                              <h5 className="text-[11.5px] font-bold text-[#0E1726] tracking-tight group-hover:text-secondary transition-colors">{item.label}</h5>
                              <p className="text-[9.5px] text-[#64748B] leading-tight mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Industry Solutions */}
                    <div className="col-span-5 space-y-4 z-10 border-l border-[#0E1726]/5 pl-6">
                      <h6 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#0E1726]/5 pb-2 mb-3">
                        Solutions
                      </h6>
                      <div className="grid grid-cols-1 gap-3">
                        {SOLUTIONS.slice(0, 4).map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-start gap-3 p-1.5 rounded-xl hover:bg-[#F8FAFC] transition-all group text-left"
                          >
                            <div className="w-7.5 h-7.5 rounded-lg bg-[#0E1726]/5 text-[#0E1726]/60 flex items-center justify-center group-hover:bg-[#5B8DEF] group-hover:text-white transition-colors flex-shrink-0">
                              <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                            </div>
                            <div>
                              <h5 className="text-[11px] font-bold text-[#0E1726] tracking-tight group-hover:text-[#5B8DEF] transition-colors">{item.label}</h5>
                              <p className="text-[9.5px] text-[#64748B] leading-snug mt-0.5">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/#capabilities"
            className="relative px-3 py-2 text-[12.5px] font-mono uppercase tracking-wider text-[#334155] hover:text-[#0E1726] font-semibold transition-colors duration-200 group"
          >
            Platform
            <span className="absolute bottom-1.5 left-3 right-3 h-[1.5px] rounded-full bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>

          <Link 
            href="/pricing"
            className={`relative px-3 py-2 text-[12.5px] font-mono uppercase tracking-wider font-semibold transition-colors duration-200 group ${
              pathname === "/pricing" ? "text-[#0E1726]" : "text-[#334155] hover:text-[#0E1726]"
            }`}
          >
            Pricing
            <span className={`absolute bottom-1.5 left-3 right-3 h-[1.5px] rounded-full bg-secondary transition-transform duration-300 origin-left ${
              pathname === "/pricing" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
          </Link>

          <Link 
            href="/manifesto"
            className={`relative px-3 py-2 text-[12.5px] font-mono uppercase tracking-wider font-semibold transition-colors duration-200 group ${
              pathname === "/manifesto" ? "text-[#0E1726]" : "text-[#334155] hover:text-[#0E1726]"
            }`}
          >
            Manifesto
            <span className={`absolute bottom-1.5 left-3 right-3 h-[1.5px] rounded-full bg-[#0088FF] transition-transform duration-300 origin-left ${
              pathname === "/manifesto" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`} />
          </Link>
        </nav>

        {/* Desktop CTA right */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <MagneticButton strength={0.3}>
            <Link
              href="/pricing"
              data-cursor="cta"
              className="hover-shine cta-magnetic relative overflow-hidden inline-flex items-center justify-center font-bold text-[13px] uppercase tracking-wide px-5 py-2.5 rounded-full border border-secondary text-primary transition-all duration-300"
              style={{ background: "rgba(0,194,168,0.08)" }}
            >
              <span className="relative z-10 flex items-center gap-1">
                Book Demo
                <span className="material-symbols-outlined text-[15px]">bolt</span>
              </span>
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link 
            href="/pricing" 
            className="sm:inline-flex hidden bg-secondary text-primary font-bold text-[12px] uppercase tracking-wider px-4 py-2 rounded-full hover:bg-secondary/90 transition-all shadow-sm"
          >
            Book Demo
          </Link>
          <button 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle menu"
            className="w-9 h-9 rounded-full flex items-center justify-center text-primary bg-[#0E1726]/5 hover:bg-[#0E1726]/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">{open ? "close" : "menu"}</span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[440px] border-b border-[#0E1726]/5" : "max-h-0"
        }`}
        style={{
          background: "rgba(248, 250, 252, 0.96)",
          backdropFilter: "blur(20px)",
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-2">
          <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#64748B] border-b border-[#0E1726]/5 pb-1">
            Industry Solutions
          </div>
          {SOLUTIONS.slice(0, 4).map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-[13px] font-mono uppercase tracking-wider text-[#334155] rounded-xl hover:bg-[#0E1726]/5 hover:text-primary font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-[#0E1726]/5 my-1" />
          <Link 
            href="/#capabilities" 
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-[13px] font-mono uppercase tracking-wider text-[#334155] rounded-xl hover:bg-[#0E1726]/5 hover:text-primary font-bold transition-all"
          >
            Platform
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-[13px] font-mono uppercase tracking-wider text-[#334155] rounded-xl hover:bg-[#0E1726]/5 hover:text-primary font-bold transition-all"
          >
            Pricing
          </Link>
          <Link 
            href="/manifesto" 
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-[13px] font-mono uppercase tracking-wider text-[#334155] rounded-xl hover:bg-[#0E1726]/5 hover:text-primary font-bold transition-all"
          >
            Manifesto
          </Link>
          <div className="mt-2 pt-3 border-t border-[#0A0A0F]/5 flex flex-col gap-2 pb-2">
            <Link 
              href="/pricing" 
              onClick={() => setOpen(false)}
              className="w-full bg-secondary text-primary font-bold py-3 text-center text-[13px] uppercase tracking-wide rounded-full shadow-sm"
            >
              Book Demo
            </Link>
          </div>
        </nav>
      </div>

    </header>
  );
}
