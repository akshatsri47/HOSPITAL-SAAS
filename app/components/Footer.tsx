"use client";

import React from "react";
import Link from "next/link";

const COLS = {
  Product:   ["AI Voice Agent", "Multilingual Triage", "Smart Scheduling", "Analytics Dashboard", "Integrations"],
  Solutions: ["Hospital OPD", "Diagnostic Labs", "Pharmacy Helpline", "Emergency Routing", "Telemedicine"],
  Company:   ["About Us", "Manifesto", "Careers", "Blog", "Press Kit", "Contact"],
  Resources: ["Documentation", "API Reference", "Help Center", "Status Page", "Security"],
};

// Map footer links to functional absolute route destinations
function getLinkHref(link: string): string {
  switch (link) {
    case "Manifesto":
      return "/manifesto";
    case "Hospital OPD":
    case "Diagnostic Labs":
    case "Pharmacy Helpline":
    case "Emergency Routing":
    case "Telemedicine":
      return "/healthcare";
    case "AI Voice Agent":
    case "Multilingual Triage":
    case "Smart Scheduling":
    case "Integrations":
      return "/#capabilities";
    default:
      return "/#";
  }
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", Icon: IconLinkedIn, href: "#" },
  { label: "Twitter / X", Icon: IconTwitter, href: "#" },
  { label: "YouTube", Icon: IconYouTube, href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#F8FAFC" }} className="border-t border-[#0E1726]/5">
      {/* Dynamic Voice Line Divider */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #00C2A8 30%, #5B8DEF 60%, transparent 100%)" }} />

      <div className="section-px max-w-7xl mx-auto pt-16 sm:pt-24 pb-10">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 mb-16">
          
          {/* Brand Col (lg:col-span-2) */}
          <div className="col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-headline font-extrabold text-[24px] tracking-tight text-primary">
                xyras<span className="text-secondary font-sans font-black">.</span>
              </span>
            </Link>
            
            <p className="text-[13.5px] text-[#64748B] leading-relaxed max-w-[28ch]">
              Tireless, empathetic multilingual voice agents booking consultations and resolving triage 24×7.
            </p>
            
            {/* Compliance chips */}
            <div className="flex gap-1.5 flex-wrap mt-1">
              {["HIPAA", "ISO 27001", "SOC 2"].map((b) => (
                <span 
                  key={b} 
                  className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md bg-[#0E1726]/5 border border-[#0E1726]/10 text-secondary uppercase tracking-widest"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Social column links */}
            <div className="flex flex-col gap-2 pt-2">
              {SOCIALS.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2.5 text-[#64748B] hover:text-[#0E1726] transition-colors duration-200 group w-fit text-[12.5px] font-medium"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#0E1726]/5 border border-[#0E1726]/10 group-hover:border-[#0E1726]/20 transition-all">
                    <Icon />
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(COLS).map(([group, links]) => (
            <div key={group}>
              <h6 className="font-mono text-[9.5px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                {group}
              </h6>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={getLinkHref(link)}
                      className="text-[13px] text-[#64748B] hover:text-secondary transition-colors duration-200 link-underline group inline-flex items-center gap-1"
                    >
                      <span>{link}</span>
                      <span className="material-symbols-outlined text-[11px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                        arrow_forward
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Mid-line separator */}
        <div className="h-px bg-[#0E1726]/10 mb-8" />

        {/* Newsletter strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 p-5 rounded-2xl bg-[#0E1726]/3 border border-[#0E1726]/8">
          <div>
            <p className="font-bold text-[13.5px] text-[#0E1726]">Stay ahead in AI voice</p>
            <p className="text-[12px] text-[#64748B] mt-0.5">Product updates, case studies, and launch news. No spam.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              aria-label="Email for newsletter"
              className="flex-1 sm:w-56 bg-white border border-[#0E1726]/8 rounded-xl px-4 py-2.5 text-[13px] text-primary focus:border-secondary focus:outline-none transition-colors placeholder:text-[#64748B]/50"
            />
            <button
              type="submit"
              className="bg-secondary text-primary font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-secondary/90 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11.5px] font-mono text-slate-500 tracking-wide">
            © {new Date().getFullYear()} Xyras AI Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-[11.5px] font-mono text-slate-500 hover:text-secondary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Massive Editorial wordmark (Zendesk-Style) */}
      <div className="relative overflow-hidden select-none pb-4 pt-2">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 via-transparent to-transparent pointer-events-none" />
        <p
          className="text-center font-headline font-extrabold leading-none tracking-tighter w-full"
          style={{
            fontSize: "clamp(5rem, 20vw, 16rem)",
            background: "linear-gradient(180deg, rgba(14,23,38,0.06) 0%, rgba(0, 194, 168, 0.14) 60%, rgba(91, 141, 239, 0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
          }}
        >
          xyras
        </p>
      </div>

    </footer>
  );
}
