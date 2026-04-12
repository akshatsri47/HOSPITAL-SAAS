"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Platform",     href: "#features",     hasArrow: true  },
  { label: "Solutions",    href: "#solutions",    hasArrow: true  },
  { label: "How It Works", href: "#how-it-works", hasArrow: false },
  { label: "Pricing",      href: "#pricing",      hasArrow: false },
  { label: "Customers",    href: "#testimonials", hasArrow: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
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
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center pointer-events-none">

      {/* ── Pill navbar — always floating, wider at top, tighter on scroll ── */}
      <div
        className="pointer-events-auto transition-all duration-500 mt-3"
        style={{
          /* At top: ~70% width  |  scrolled: ~60% width */
          width: scrolled ? "min(62%, 900px)" : "min(75%, 1100px)",
          background: scrolled
            ? "rgba(255,255,255,0.80)"
            : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(226,232,240,0.7)",
          boxShadow: scrolled
            ? "0 6px 36px rgba(15,23,42,0.13), 0 1px 4px rgba(15,23,42,0.07)"
            : "0 2px 16px rgba(15,23,42,0.07)",
          borderRadius: "9999px",
        }}
      >
        <div
          className="flex items-center justify-between gap-4"
          style={{
            padding: scrolled ? "0 20px" : "0 24px",
            height:  scrolled ? "50px"   : "58px",
            transition: "all 0.4s ease",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <span
              className="font-headline font-extrabold tracking-tight"
              style={{
                fontSize: scrolled ? "15px" : "17px",
                background: "linear-gradient(90deg, #0D9488 0%, #0f766e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: "font-size 0.4s",
              }}
            >
              xyras
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href, hasArrow }) => (
              <a key={label} href={href}
                className="nav-link group relative flex items-center gap-0.5 px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-primary transition-colors duration-200">
                {label}
                {hasArrow && (
                  <span className="material-symbols-outlined text-[13px] text-slate-400 group-hover:text-slate-600 transition-colors">
                    keyboard_arrow_down
                  </span>
                )}
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a href="#pricing" id="nav-try-free"
              className="bg-secondary text-white text-[12.5px] font-bold px-4 py-2 rounded-full hover:bg-secondary/90 active:scale-[0.97] transition-all shadow-[0_2px_12px_rgba(13,148,136,0.35)] whitespace-nowrap">
              Try it for free
            </a>
            <a href="#how-it-works" id="nav-view-demo"
              className="border border-slate-200 bg-white/60 text-primary text-[12.5px] font-semibold px-4 py-2 rounded-full hover:border-secondary/50 hover:text-secondary transition-all whitespace-nowrap">
              View demo
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a href="#pricing" className="hidden sm:block bg-secondary text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full hover:bg-secondary/90 transition-all shadow-[0_2px_8px_rgba(13,148,136,0.3)]">
              Try it for free
            </a>
            <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-[20px]">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — drops below pill */}
      <div
        className={`pointer-events-auto w-full lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[420px]" : "max-h-0"}`}
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: open ? "1px solid #E2E8F0" : "none",
        }}
      >
        <nav className="section-px py-3 flex flex-col gap-0.5">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)}
              className="px-4 py-3 text-[14px] font-medium text-slate-600 rounded-xl hover:bg-slate-50 hover:text-primary transition-all">
              {label}
            </a>
          ))}
          <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-2 pb-2">
            <a href="#pricing" className="w-full bg-secondary text-white text-[14px] font-bold py-3.5 rounded-full text-center hover:bg-secondary/90 transition-all shadow-[0_2px_12px_rgba(13,148,136,0.35)]">
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
