/* ─────────────────────────────────────────────────────────────
   ZENDESK-STYLE ALTERNATING SECTIONS
   Each section: Visual panel (with floating, animated UI cards)
   + Text block (eyebrow · headline · body · CTA)
───────────────────────────────────────────────────────────── */

"use client";

import { useState, useEffect } from "react";

/* ────────────────────────────────────────────────────────────
   LANGUAGE DATA  — 5 tabs, each with a patient message,
   AI reply, and English translation strip
──────────────────────────────────────────────────────────── */
const LANGUAGES = [
  {
    code: "TA",
    label: "Tamil",
    flag: "🇮🇳",
    detectedIn: "2.8s",
    patient: {
      location: "Patient · Chennai",
      text: "நான் என் இரத்தப் பரிசோதனை முடிவுகளை அறிய விரும்புகிறேன்",
      translation: "I would like to know my blood test results",
    },
    ai: {
      label: "Aura AI · Tamil",
      text: "உங்கள் அறிக்கை SMS மூலம் அனுப்பப்பட்டது ✓",
      translation: "Your report has been sent via SMS ✓",
    },
    avatar: { initials: "A", bg: "bg-rose-400" },
  },
  {
    code: "EN",
    label: "English",
    flag: "🇬🇧",
    detectedIn: "1.2s",
    patient: {
      location: "Patient · Mumbai",
      text: "I need to reschedule my appointment with Dr. Mehta",
      translation: "I need to reschedule my appointment with Dr. Mehta",
    },
    ai: {
      label: "Aura AI · English",
      text: "Done! Your appointment is now Thursday at 3 PM with Dr. Mehta ✓",
      translation: "Done! Your appointment is now Thursday at 3 PM with Dr. Mehta ✓",
    },
    avatar: { initials: "S", bg: "bg-blue-400" },
  },
  {
    code: "HI",
    label: "Hindi",
    flag: "🇮🇳",
    detectedIn: "2.1s",
    patient: {
      location: "Patient · Delhi",
      text: "मुझे कार्डियोलॉजी में अपॉइंटमेंट चाहिए",
      translation: "I need an appointment in Cardiology",
    },
    ai: {
      label: "Aura AI · Hindi",
      text: "डॉ. मेहता के साथ सोमवार को दोपहर 11 बजे आपका अपॉइंटमेंट बुक हो गया है ✓",
      translation: "Your appointment is booked with Dr. Mehta, Monday at 11 AM ✓",
    },
    avatar: { initials: "P", bg: "bg-amber-400" },
  },
  {
    code: "BN",
    label: "Bengali",
    flag: "🇮🇳",
    detectedIn: "2.4s",
    patient: {
      location: "Patient · Kolkata",
      text: "আমার শিশুর টিকা কোথায় দিতে হবে?",
      translation: "Where do I get my child vaccinated?",
    },
    ai: {
      label: "Aura AI · Bengali",
      text: "শিশু বিভাগে যান — ড. ভট্টাচার্য শুক্রবার সকাল ১০টায় পাওয়া যাবেন ✓",
      translation: "Visit Pediatrics — Dr. Bhattacharya is available Friday at 10 AM ✓",
    },
    avatar: { initials: "R", bg: "bg-purple-400" },
  },
  {
    code: "MR",
    label: "Marathi",
    flag: "🇮🇳",
    detectedIn: "2.6s",
    patient: {
      location: "Patient · Pune",
      text: "माझ्या ऑर्थोपेडिक्स अपॉइंटमेंटची वेळ बदलायची आहे",
      translation: "I want to change the time of my Orthopedics appointment",
    },
    ai: {
      label: "Aura AI · Marathi",
      text: "डॉ. राव यांच्यासोबत गुरुवारी दुपारी २ वाजता अपॉइंटमेंट निश्चित झाली ✓",
      translation: "Appointment confirmed with Dr. Rao, Thursday at 2 PM ✓",
    },
    avatar: { initials: "K", bg: "bg-teal-400" },
  },
] as const;

type LangIndex = 0 | 1 | 2 | 3 | 4;

/* ────────────────────────────────────────────────────────────
   PANEL — upgraded multilingual conversation UI
──────────────────────────────────────────────────────────── */
function PanelConversation() {
  const [active, setActive] = useState<LangIndex>(0);
  const [visible, setVisible] = useState(true);
  const [showBadge, setShowBadge] = useState(false);
  const [badgeDismissed, setBadgeDismissed] = useState(false);
  const lang = LANGUAGES[active];

  /* Auto-detection badge: shows after 1 s, hides after 3 s */
  useEffect(() => {
    setBadgeDismissed(false);
    setShowBadge(false);
    const show = setTimeout(() => setShowBadge(true), 900);
    const hide = setTimeout(() => setShowBadge(false), 3800);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [active]);

  /* Cross-fade when switching tabs */
  const switchTab = (i: LangIndex) => {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 220);
  };

  return (
    <div
      className="relative w-full h-full min-h-[520px] sm:min-h-[560px] rounded-3xl overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(145deg, #0a2235 0%, #083a36 60%, #065544 100%)" }}
    >
      {/* Soft glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/15 via-transparent to-transparent pointer-events-none" />

      {/* ── Language tab switcher ── */}
      <div className="relative z-10 flex items-center gap-1 px-4 pt-4 pb-0 overflow-x-auto no-scrollbar">
        {LANGUAGES.map((l, i) => {
          const isActive = i === active;
          return (
            <button
              key={l.code}
              id={`lang-tab-${l.code}`}
              onClick={() => switchTab(i as LangIndex)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={
                isActive
                  ? {
                      background: "linear-gradient(135deg, #0D9488, #5EEAD4)",
                      color: "#fff",
                      boxShadow: "0 2px 12px rgba(13,148,136,0.45)",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Auto-detection badge ── */}
      <div
        className="relative z-20 flex justify-center mt-2"
        style={{
          opacity: showBadge && !badgeDismissed ? 1 : 0,
          transform: showBadge && !badgeDismissed ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          pointerEvents: showBadge && !badgeDismissed ? "auto" : "none",
        }}
      >
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold cursor-pointer select-none"
          style={{
            background: "linear-gradient(135deg, rgba(13,148,136,0.9), rgba(94,234,212,0.85))",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px rgba(13,148,136,0.5)",
            color: "#fff",
          }}
          onClick={() => setBadgeDismissed(true)}
          title="Click to dismiss"
        >
          <span
            className="material-symbols-outlined text-[13px] animate-pulse"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            language
          </span>
          <span>
            {lang.label} detected in{" "}
            <span className="font-extrabold">{lang.detectedIn}</span>
          </span>
          <span className="material-symbols-outlined text-[11px] opacity-70">close</span>
        </div>
      </div>

      {/* ── Chat bubbles with cross-fade ── */}
      <div
        className="relative z-10 flex flex-col justify-center gap-4 px-5 sm:px-7 py-5 flex-1"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
        }}
      >
        {/* Patient bubble */}
        <div className="flex items-end gap-2 self-start max-w-[82%]">
          <div
            className={`w-8 h-8 rounded-full ${lang.avatar.bg} text-white text-[13px] font-bold flex items-center justify-center flex-shrink-0`}
          >
            {lang.avatar.initials}
          </div>
          <div className="bg-white/92 backdrop-blur rounded-2xl rounded-bl-sm p-3 shadow-lg">
            <p className="text-[10.5px] font-semibold text-slate-500 mb-1">
              {lang.patient.location}
            </p>
            <p className="text-[13px] text-slate-800 leading-relaxed font-medium">
              {lang.patient.text}
            </p>
          </div>
        </div>

        {/* ── Side-by-side translation strip (patient) ── */}
        <div
          className="self-start ml-10 flex items-start gap-2 px-3 py-2 rounded-xl max-w-[80%]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(94,234,212,0.18)",
          }}
        >
          <span
            className="material-symbols-outlined text-[13px] text-teal-300 flex-shrink-0 mt-0.5"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            translate
          </span>
          <div className="flex gap-2 flex-wrap">
            <span className="text-[10.5px] text-slate-300 italic leading-relaxed">
              {lang.patient.translation}
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide self-start flex-shrink-0"
              style={{ background: "rgba(13,148,136,0.3)", color: "#5EEAD4" }}
            >
              EN
            </span>
          </div>
        </div>

        {/* AI bubble */}
        <div className="flex items-end gap-2 self-end flex-row-reverse max-w-[82%]">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-[15px]">
              graphic_eq
            </span>
          </div>
          <div
            className="rounded-2xl rounded-br-sm p-3 shadow-lg"
            style={{ background: "linear-gradient(135deg, #0D9488, #5EEAD4)" }}
          >
            <p className="text-[10.5px] font-semibold text-teal-900 mb-1">
              {lang.ai.label}
            </p>
            <p className="text-[13px] text-white leading-relaxed">
              {lang.ai.text}
            </p>
          </div>
        </div>

        {/* ── Side-by-side translation strip (AI) ── */}
        <div
          className="self-end mr-10 flex items-start gap-2 px-3 py-2 rounded-xl max-w-[80%]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(94,234,212,0.18)",
          }}
        >
          <span
            className="material-symbols-outlined text-[13px] text-teal-300 flex-shrink-0 mt-0.5"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            translate
          </span>
          <div className="flex gap-2 flex-wrap">
            <span className="text-[10.5px] text-slate-300 italic leading-relaxed">
              {lang.ai.translation}
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide self-start flex-shrink-0"
              style={{ background: "rgba(13,148,136,0.3)", color: "#5EEAD4" }}
            >
              EN
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar — active language info ── */}
      <div
        className="relative z-10 flex items-center justify-between px-5 py-3 mx-4 mb-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[14px] text-teal-300"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            record_voice_over
          </span>
          <span className="text-[11px] font-semibold text-white/70">
            Speaking in{" "}
            <span className="text-teal-300 font-extrabold">{lang.label}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="relative flex h-2 w-2"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
          </span>
          <span className="text-[10px] font-bold text-teal-300">Live</span>
        </div>
      </div>

      {/* AI badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/30 border border-white/15 rounded-full px-3 py-1.5 z-30">
        <span
          className="material-symbols-outlined text-[#5EEAD4] text-[12px]"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          auto_awesome
        </span>
        <span className="text-[10.5px] font-semibold text-white">AI Generated</span>
      </div>
    </div>
  );
}

/* Visual Panel 2 — 24/7 call dashboard */
function PanelDashboard() {
  const HOURS = [3, 12, 8, 18, 24, 30, 22, 28, 33, 28, 20, 16, 24, 19, 14, 10, 8, 6, 4, 5, 8, 6, 4, 3];
  const max = Math.max(...HOURS);

  return (
    <div
      className="relative w-full h-full min-h-[420px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-white"
      style={{ boxShadow: "0 8px 48px rgba(15,23,42,0.12)" }}
    >
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <p className="font-bold text-[13.5px] text-slate-800">24-Hour Call Volume</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Zero missed calls across all hours</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold text-emerald-700">Live</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-end gap-[3px] h-[120px] sm:h-[140px]">
          {HOURS.map((h, i) => {
            const isCurrent = i === 10;
            return (
              <div key={i} className="flex-1 flex items-end group cursor-default">
                <div
                  className={`w-full rounded-[2px] transition-all duration-300 group-hover:opacity-100 ${isCurrent ? "opacity-100" : "opacity-70"}`}
                  style={{
                    height: `${(h / max) * 100}%`,
                    background: isCurrent
                      ? "linear-gradient(180deg, #0D9488, #5EEAD4)"
                      : "linear-gradient(180deg, #CBD5E1, #E2E8F0)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5">
          {["12am", "6am", "12pm", "6pm", "11pm"].map(h => (
            <span key={h} className="text-[9.5px] text-slate-400">{h}</span>
          ))}
        </div>
      </div>

      {/* Stat chips */}
      <div className="px-6 pt-3 pb-6 grid grid-cols-3 gap-3">
        {[
          { n: "247", l: "Total calls", color: "text-primary" },
          { n: "98.2%", l: "Resolved", color: "text-secondary" },
          { n: "0", l: "Missed", color: "text-secondary" },
        ].map(({ n, l, color }) => (
          <div key={l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
            <div className={`font-headline font-extrabold text-[20px] leading-none ${color}`}>{n}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      {/* Floating badge */}
      <div className="absolute top-4 right-4 bg-secondary text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full shadow-lg">
        3 AM · Still answering
      </div>
    </div>
  );
}

/* Visual Panel 3 — Integrations */
function PanelIntegrations() {
  const INTEGRATIONS = [
    { name: "Epic EHR", icon: "local_hospital", color: "bg-blue-50 text-blue-600 border-blue-100", active: true },
    { name: "Meditech", icon: "medication", color: "bg-teal-50 text-teal-600 border-teal-100", active: true },
    { name: "Practo", icon: "calendar_month", color: "bg-rose-50 text-rose-600 border-rose-100", active: true },
    { name: "Athenahealth", icon: "hub", color: "bg-purple-50 text-purple-600 border-purple-100", active: false },
    { name: "eVitals", icon: "monitor_heart", color: "bg-amber-50 text-amber-600 border-amber-100", active: false },
    { name: "WhatsApp", icon: "chat", color: "bg-emerald-50 text-emerald-600 border-emerald-100", active: true },
  ];

  return (
    <div
      className="relative w-full h-full min-h-[420px] sm:min-h-[480px] rounded-3xl overflow-hidden bg-white"
      style={{ boxShadow: "0 8px 48px rgba(15,23,42,0.12)" }}
    >
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="font-bold text-[13.5px] text-slate-800">Agent Integrations</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Plug-and-play with your existing systems</p>
      </div>
      <div className="p-5 grid grid-cols-2 gap-3">
        {INTEGRATIONS.map(({ name, icon, color, active }) => (
          <div key={name} className={`flex items-center gap-2.5 p-3 rounded-xl border ${color} bg-opacity-80`}>
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold truncate">{name}</p>
            </div>
            {/* Toggle */}
            <div className={`w-9 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 transition-colors ${active ? "bg-secondary justify-end" : "bg-slate-200 justify-start"}`}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        ))}
      </div>
      {/* Bottom banner */}
      <div className="absolute bottom-0 inset-x-0 mx-5 mb-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
        <p className="text-[12px] font-semibold text-slate-600">
          <span className="text-secondary font-bold">+12</span> more integrations available
        </p>
      </div>
    </div>
  );
}

/* ─── Section text block ─────────────────────────────── */
interface TextBlockProps {
  eyebrow: string;
  headline: string;
  body: string;
  bullets: readonly string[];
  cta1: { label: string; href: string };
  cta2?: { label: string; href: string };
}

function TextBlock({ eyebrow, headline, body, bullets, cta1, cta2 }: TextBlockProps) {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <p className="text-secondary font-semibold text-[12px] uppercase tracking-[0.2em]">{eyebrow}</p>
      <h2 className="font-headline font-extrabold text-primary leading-tight
                     text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem]">
        {headline}
      </h2>
      <p className="text-on-surface-variant leading-[1.8] text-[15px] sm:text-[16px]">{body}</p>
      {bullets.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {bullets.map(b => (
            <li key={b} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 flex-shrink-0">check_circle</span>
              <span className="text-[14px] sm:text-[15px] text-on-surface-variant leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-3 pt-1">
        <a href={cta1.href}
          className="inline-flex items-center gap-1.5 bg-primary text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-lg
                     hover:bg-primary/90 transition-all shadow-sm">
          {cta1.label}
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </a>
        {cta2 && (
          <a href={cta2.href}
            className="inline-flex items-center gap-1.5 border border-outline-variant text-primary font-semibold text-[13.5px] px-5 py-2.5 rounded-lg
                       hover:border-secondary hover:text-secondary transition-all">
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
            {cta2.label}
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Alternating sections data ─────────────────────── */
const SECTIONS = [
  {
    reverse: false,
    Panel: PanelConversation,
    text: {
      eyebrow: "MULTILINGUAL AI",
      headline: "Transform every patient conversation",
      body: "Bring together patient calls from all channels, giving Aura the context it needs. Resolve requests automatically from day one — in any of 12 Indian languages.",
      bullets: [
        "Natural language understanding — no IVR menus",
        "Replies in the patient's own language within 800ms",
        "Escalates emergencies automatically to on-call staff",
      ],
      cta1: { label: "Explore AI triage", href: "#features" },
      cta2: { label: "Watch demo", href: "#pricing" },
    },
  },
  {
    reverse: true,
    Panel: PanelDashboard,
    text: {
      eyebrow: "24 / 7 AVAILABILITY",
      headline: "Make missed calls a thing of the past",
      body: "Your hospital front desk is offline from midnight to dawn. Aura isn't. Emergency routing, appointment booking, and lab result queries — handled flawlessly at 3 AM.",
      bullets: [
        "Zero missed calls — guaranteed at every hour",
        "Emergency protocols trigger instant on-call alerts",
        "Complete call log and analytics in your dashboard",
      ],
      cta1: { label: "Explore 24/7 coverage", href: "#features" },
    },
  },
  {
    reverse: false,
    Panel: PanelIntegrations,
    text: {
      eyebrow: "BREAK THE INTEGRATION CEILING",
      headline: "Plug into your systems on day one",
      body: "Aura connects with Epic, Meditech, Practo and every major HMS used in Indian hospitals. No custom engineering. No months of setup. Live in 48 hours.",
      bullets: [
        "12+ pre-built connectors — plug in, not build in",
        "WhatsApp and SMS notifications out of the box",
        "API-first architecture for custom integrations",
      ],
      cta1: { label: "View integrations", href: "#features" },
    },
  },
] as const;

export default function SolutionSection() {
  return (
    <section id="features" className="bg-white">
      {SECTIONS.map(({ reverse, Panel, text }, i) => (
        <div key={i} className={`section-px section-py border-b border-outline-variant/30 ${i % 2 === 1 ? "bg-surface-container-low" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center ${reverse ? "lg:grid-flow-dense" : ""}`}>

              {/* Visual panel */}
              <div className={`${reverse ? "lg:col-start-2" : ""}`}>
                <Panel />
              </div>

              {/* Text */}
              <div className={`${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <TextBlock {...text} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
