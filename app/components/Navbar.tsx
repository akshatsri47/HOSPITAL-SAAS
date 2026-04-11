"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Platform",    href: "#features",     hasArrow: true  },
  { label: "Solutions",   href: "#solutions",    hasArrow: true  },
  { label: "How It Works",href: "#how-it-works", hasArrow: false },
  { label: "Pricing",     href: "#pricing",      hasArrow: false },
  { label: "Customers",   href: "#testimonials", hasArrow: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Utility bar ── */}
      <div className="hidden lg:block bg-[#F8FAFC] border-b border-slate-100">
        <div className="section-px max-w-7xl mx-auto flex justify-end items-center h-8 gap-4">
          <a href="#" className="text-[11.5px] text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">person</span>Sign in
          </a>
          <span className="text-slate-200">|</span>
          <a href="#" className="text-[11.5px] text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">call</span>Contact us
          </a>
          <span className="text-slate-200">|</span>
          <a href="#" className="text-[11.5px] text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">language</span>EN / IN
          </a>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className={`transition-all duration-200 ${scrolled || open ? "bg-white shadow-[0_2px_12px_rgba(15,23,42,0.08)] border-b border-slate-100" : "bg-white"}`}>
        <div className="section-px max-w-7xl mx-auto flex h-[60px] items-center justify-between gap-6">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[17px]">graphic_eq</span>
            </div>
            <span className="text-[16px] font-extrabold text-primary font-headline">aura clinical</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href, hasArrow }) => (
              <a key={label} href={href}
                className="flex items-center gap-0.5 px-3.5 py-2 text-[13.5px] font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-slate-50 transition-all">
                {label}
                {hasArrow && <span className="material-symbols-outlined text-[14px] text-slate-400">keyboard_arrow_down</span>}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a href="#pricing" id="nav-try-free"
              className="bg-secondary text-white text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-secondary/90 transition-all shadow-sm">
              Try it for free
            </a>
            <a href="#how-it-works" id="nav-view-demo"
              className="border border-slate-200 bg-white text-primary text-[13px] font-semibold px-5 py-2.5 rounded-full hover:border-slate-300 hover:bg-slate-50 transition-all">
              View demo
            </a>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <a href="#pricing" className="hidden sm:block bg-secondary text-white text-[12.5px] font-bold px-4 py-2 rounded-full hover:bg-secondary/90 transition-all">
              Try it for free
            </a>
            <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-[22px]">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden bg-white border-t border-slate-100 overflow-hidden transition-all duration-250 ${open ? "max-h-[420px]" : "max-h-0"}`}>
        <nav className="section-px py-3 flex flex-col gap-0.5">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              className="px-4 py-3 text-[14px] font-medium text-slate-600 rounded-xl hover:bg-slate-50 hover:text-primary transition-all">
              {label}
            </a>
          ))}
          <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-2 pb-2">
            <a href="#pricing" className="w-full bg-secondary text-white text-[14px] font-bold py-3.5 rounded-full text-center hover:bg-secondary/90 transition-all">
              Try it for free
            </a>
            <a href="#how-it-works" className="w-full border border-slate-200 text-primary text-[14px] font-semibold py-3.5 rounded-full text-center hover:bg-slate-50 transition-all">
              View demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
