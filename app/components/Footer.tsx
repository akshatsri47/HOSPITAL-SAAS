"use client";
import React from "react";

const COLS = {
  Product:   ["AI Voice Agent", "Multilingual Triage", "Smart Scheduling", "Analytics Dashboard", "Integrations"],
  Solutions: ["Hospital OPD", "Diagnostic Labs", "Pharmacy Helpline", "Emergency Routing", "Telemedicine"],
  Company:   ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
  Resources: ["Documentation", "API Reference", "Help Center", "Status Page", "Security"],
};

/* ── Inline brand SVG icons (Material Symbols doesn't have social brands) ── */
function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}
function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "LinkedIn", Icon: IconLinkedIn, color: "#0A66C2", href: "#" },
  { label: "X (Twitter)", Icon: IconTwitter,  color: "#e2e8f0", href: "#" },
  { label: "YouTube",  Icon: IconYouTube,  color: "#FF0000", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #0F172A 0%, #07111e 100%)" }}>
      {/* Teal top divider */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #0D9488 30%, #5EEAD4 60%, transparent 100%)" }} />

      <div className="section-px max-w-7xl mx-auto pt-12 sm:pt-16 pb-8 sm:pb-10">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <a href="/" className="inline-flex items-center">
              <span
                className="font-headline font-extrabold text-[20px] tracking-tight"
                style={{
                  background: "linear-gradient(90deg, #5EEAD4 0%, #0D9488 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                xyras
              </span>
            </a>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              AI-powered multilingual voice triage for Indian hospitals. Every patient call, answered.
            </p>
            {/* Compliance badges */}
            <div className="flex gap-2 flex-wrap mt-1">
              {["HIPAA", "ISO 27001", "SOC 2"].map(b => (
                <span key={b} className="text-[10.5px] font-bold px-2.5 py-1 rounded-md bg-secondary/15 text-teal-300 border border-secondary/25">
                  {b}
                </span>
              ))}
            </div>

            {/* Social icons — icon + label side by side */}
            <div className="flex flex-col gap-2 mt-1">
              {SOCIALS.map(({ label, Icon, color, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors duration-200 group w-fit"
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/25 transition-all duration-200 flex-shrink-0"
                    style={{ color: "inherit" }}
                  >
                    <Icon />
                  </span>
                  <span className="text-[12px] font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([group, links]) => (
            <div key={group}>
              <h6 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.14em] mb-4">{group}</h6>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-slate-400 hover:text-teal-400 transition-colors duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-6 sm:mb-7" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-slate-500">© 2025 Xyras AI Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[12px] text-slate-500 hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="text-[12px] text-slate-500 hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="text-[12px] text-slate-500 hover:text-teal-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* ── Big wordmark — Zendesk style ── */}
      <div
        className="relative overflow-hidden select-none"
        style={{ paddingTop: "0.5rem", paddingBottom: "1.5rem" }}
      >
        {/* Subtle glow behind text */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 via-transparent to-transparent pointer-events-none" />
        <p
          className="text-center font-headline font-extrabold leading-none tracking-tighter w-full"
          style={{
            fontSize: "clamp(5rem, 22vw, 18rem)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(94,234,212,0.20) 55%, rgba(13,148,136,0.10) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            /* No negative bottom margin — padded container handles spacing */
          }}
        >
          xyras
        </p>
      </div>
    </footer>
  );
}
