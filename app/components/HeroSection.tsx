"use client";

import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   EQ WAVEFORM  (thin 2px bars, 5 keyframe profiles, SSR-safe)
───────────────────────────────────────────────────────────── */
const EQ_NAMES = ["eq-a","eq-b","eq-c","eq-d","eq-e"] as const;
const EQ_DURS  = ["0.82s","0.67s","0.95s","0.73s","0.88s"] as const;
const EQ_N     = 28;

function EQWaveform() {
  return (
    <div className="flex items-end w-full" style={{ height: "32px", gap: "2.5px" }}>
      {Array.from({ length: EQ_N }).map((_, i) => (
        <div key={i} style={{
          width: "2px", height: "3px", borderRadius: "1px", flexShrink: 0,
          background: "#5EEAD4",
          boxShadow: "0 0 4px rgba(94,234,212,0.55)",
          animationName: EQ_NAMES[i % 5],
          animationDuration: EQ_DURS[i % 5],
          animationDelay: `${i * 28}ms`,
          animationTimingFunction: "cubic-bezier(0.45,0,0.55,1)",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          willChange: "height",
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD CONTENT — 5 distinct product screens
───────────────────────────────────────────────────────────── */

function CardConsole() {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(true);
  const LANGS = [
    { l: "Hindi · Cardiology",    t: "नमस्ते, मुझे कार्डियोलॉजी में अपॉइंटमेंट चाहिए" },
    { l: "Kannada · Orthopedics", t: "ನಮಸ್ಕಾರ, ಔರಾ ಕ್ಲಿನಿಕಲ್‌ಗೆ ಸ್ವಾಗತ" },
    { l: "Tamil · Lab Reports",   t: "வணக்கம், மருத்துவமனையில் சந்திப்பு வேண்டும்" },
  ];
  useEffect(() => {
    const id = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(p => (p + 1) % LANGS.length); setVis(true); }, 300);
    }, 3500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* App header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[14px]">graphic_eq</span>
          </div>
          <span className="font-bold text-[13px] text-slate-800">Xyras Console</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold text-emerald-700">24 active calls</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Incoming call */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-secondary flex items-center justify-center font-bold text-[14px] flex-shrink-0">R</div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-bold text-slate-800">Mr. Rajesh Kumar</p>
              <p className="text-[11px] text-slate-400">Bangalore · Incoming call</p>
            </div>
            <div className="flex gap-1.5">
              <button className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[13px]">call</span>
              </button>
              <button className="w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400 text-[13px]">call_end</span>
              </button>
            </div>
          </div>
          {/* EQ on dark */}
          <div className="bg-[#0F172A] rounded-xl p-3">
            <EQWaveform />
            <div className={`mt-2 transition-all duration-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              <p className="text-[9px] font-bold text-teal-400 uppercase tracking-widest mb-0.5">{LANGS[idx].l}</p>
              <p className="text-[11px] italic text-slate-300">&ldquo;{LANGS[idx].t}&rdquo;</p>
            </div>
          </div>
        </div>
        {/* Triage */}
        <div className="space-y-2">
          {[
            { done: true,  t: "Language Detected: Kannada"       },
            { done: true,  t: "Intent: Appointment · Orthopedics" },
            { done: true,  t: "Slot confirmed with Dr. Rao"       },
            { done: false, t: "Routing to reception desk…"        },
          ].map(({ done, t }) => (
            <div key={t} className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[14px] ${done ? "text-secondary" : "text-slate-300"}`}>
                {done ? "check_circle" : "radio_button_unchecked"}
              </span>
              <span className={`text-[12px] font-medium ${done ? "text-slate-600" : "text-slate-400 italic"}`}>{t}</span>
            </div>
          ))}
        </div>
        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-[10.5px] font-semibold text-slate-400 mb-1.5">
            <span>Resolution progress</span><span className="text-secondary">74%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-secondary to-[#5EEAD4]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardAnalytics() {
  const LANGS = [
    { lang: "Hindi",   pct: 42, w: "w-[42%]"  },
    { lang: "Tamil",   pct: 27, w: "w-[27%]"  },
    { lang: "Kannada", pct: 18, w: "w-[18%]"  },
    { lang: "Others",  pct: 13, w: "w-[13%]"  },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <span className="font-bold text-[13px] text-slate-800">Today&apos;s Overview</span>
        <span className="text-[11px] text-slate-400">Apr 11, 2025</span>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-5">
        {/* Stat row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: "247",   label: "Calls",      up: "+12%" },
            { n: "98.2%", label: "Resolved",   up: "+2%"  },
            { n: "1.8s",  label: "Avg. Time",  up: "-0.3s"},
          ].map(({ n, label, up }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
              <div className="font-headline font-extrabold text-primary text-[20px] leading-none mb-0.5">{n}</div>
              <div className="text-[10px] text-slate-400 font-medium">{label}</div>
              <div className="text-[9px] text-emerald-600 font-bold mt-0.5">{up}</div>
            </div>
          ))}
        </div>
        {/* Language breakdown */}
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">Language Distribution</p>
          <div className="space-y-2.5">
            {LANGS.map(({ lang, pct, w }) => (
              <div key={lang} className="flex items-center gap-3">
                <span className="text-[12px] text-slate-600 font-medium w-14 flex-shrink-0">{lang}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${w} rounded-full bg-gradient-to-r from-secondary to-[#5EEAD4] transition-all duration-1000`} />
                </div>
                <span className="text-[11px] text-slate-400 font-semibold w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
        {/* Mini trend */}
        <div className="mt-auto bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">trending_up</span>
          <div>
            <p className="text-[12px] font-bold text-emerald-800">+18% more calls resolved vs last week</p>
            <p className="text-[10.5px] text-emerald-600">Multilingual model improved yesterday</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardLanguages() {
  const LANGS = [
    "Hindi","Tamil","Telugu","Kannada","Bengali",
    "Marathi","Gujarati","Punjabi","Malayalam","Odia","Assamese","Urdu",
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <span className="font-bold text-[13px] text-slate-800">Language Coverage</span>
        <span className="text-[11px] bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full font-bold">12 Active</span>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-4">
        {/* Language grid */}
        <div className="grid grid-cols-3 gap-2">
          {LANGS.map((lang) => (
            <div key={lang} className="flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-2">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11.5px] text-slate-700 font-medium truncate">{lang}</span>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <div className="bg-secondary/6 border border-secondary/15 rounded-xl p-3 text-center">
            <div className="font-headline font-extrabold text-secondary text-[22px]">97%</div>
            <div className="text-[10px] text-slate-500 font-medium">Recognition accuracy</div>
          </div>
          <div className="bg-secondary/6 border border-secondary/15 rounded-xl p-3 text-center">
            <div className="font-headline font-extrabold text-secondary text-[22px]">&lt; 800ms</div>
            <div className="text-[10px] text-slate-500 font-medium">Avg. response time</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardScheduling() {
  const SLOTS = [
    { name: "Priya Rao",       lang: "Kannada",  dept: "Orthopedics",  time: "10:00 AM", status: "Confirmed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "Amit Sharma",     lang: "Hindi",    dept: "Cardiology",   time: "11:30 AM", status: "Confirmed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { name: "Meera Pillai",    lang: "Tamil",    dept: "Neurology",    time: "01:00 PM", status: "Booked",    color: "bg-blue-50 text-blue-700 border-blue-200"         },
    { name: "Rajan Mehta",     lang: "Gujarati", dept: "Dermatology",  time: "02:30 PM", status: "Pending",   color: "bg-amber-50 text-amber-700 border-amber-200"      },
    { name: "Deepa Krishnan",  lang: "Telugu",   dept: "Pediatrics",   time: "04:00 PM", status: "Confirmed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <span className="font-bold text-[13px] text-slate-800">Smart Scheduling</span>
        <span className="text-[11px] font-bold text-secondary">47 booked today</span>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-0">
        <div className="grid grid-cols-4 gap-3 pb-2 border-b border-slate-100 mb-1">
          {["Patient","Language","Department","Status"].map(h => (
            <span key={h} className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {SLOTS.map(({ name, lang, dept, time, status, color }) => (
          <div key={name} className="grid grid-cols-4 gap-3 py-2.5 border-b border-slate-50 hover:bg-slate-50 -mx-1 px-1 rounded-lg transition-colors">
            <div>
              <p className="text-[11.5px] font-semibold text-slate-700 truncate">{name}</p>
              <p className="text-[10px] text-slate-400">{time}</p>
            </div>
            <span className="text-[11.5px] text-slate-500 self-center">{lang}</span>
            <span className="text-[11.5px] text-slate-500 self-center truncate">{dept}</span>
            <span className={`self-center text-[10px] font-semibold px-2 py-0.5 rounded-full border w-fit ${color}`}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardMetrics() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-3.5 border-b border-slate-100">
        <span className="font-bold text-[13px] text-slate-800">AI Performance — Live</span>
      </div>
      <div className="flex-1 p-5 flex flex-col gap-4">
        {[
          { label: "Call Resolution Rate",   val: 98,  color: "from-secondary to-[#5EEAD4]"},
          { label: "First-call Resolution",  val: 84,  color: "from-secondary to-[#5EEAD4]"},
          { label: "Patient Satisfaction",   val: 95,  color: "from-secondary to-[#5EEAD4]"},
          { label: "Language Accuracy",      val: 97,  color: "from-secondary to-[#5EEAD4]"},
        ].map(({ label, val, color }) => (
          <div key={label}>
            <div className="flex justify-between text-[11.5px] font-semibold mb-1.5">
              <span className="text-slate-600">{label}</span>
              <span className="text-secondary">{val}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${val}%` }} />
            </div>
          </div>
        ))}

        {/* Bottom stats */}
        <div className="mt-auto grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          {[
            { n: "1M+",  l: "Total calls" },
            { n: "50+",  l: "Hospitals"   },
            { n: "99.9%",l: "Uptime SLA"  },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <div className="font-headline font-extrabold text-primary text-[17px] leading-none mb-0.5">{n}</div>
              <div className="text-[10px] text-slate-400 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE 5 CARDS
───────────────────────────────────────────────────────────── */
const CARDS = [
  { title: "Live Triage",     component: CardConsole    },
  { title: "Analytics",       component: CardAnalytics  },
  { title: "12 Languages",    component: CardLanguages  },
  { title: "Smart Scheduling",component: CardScheduling },
  { title: "AI Metrics",      component: CardMetrics    },
];
const N = CARDS.length; // 5

/* ─────────────────────────────────────────────────────────────
   POSITION MAP
   With N=5, for each card:
     offset 0 → center
     offset 1 → right
     offset 2 → far-right  (invisible, teleports from far-left)
     offset 3 → far-left   (invisible, teleports from far-right)
     offset 4 → left
   Invisible ↔ invisible teleports are imperceptible.
───────────────────────────────────────────────────────────── */
type PosStyle = {
  transform: string;
  opacity: number;
  zIndex: number;
  pointerEvents: "auto" | "none";
};

function getPosStyle(offset: number): PosStyle {
  const T  = "cubic-bezier(0.4, 0, 0.2, 1)";  // unused here, for docs
  switch (offset) {
    case 0: return { transform: "translateX(-50%) scale(1)",                          opacity: 1,    zIndex: 30, pointerEvents: "auto" };
    case 1: return { transform: "translateX(calc(-50% + min(430px, 42vw))) scale(0.87)", opacity: 0.82, zIndex: 20, pointerEvents: "none" };
    case 2: return { transform: "translateX(calc(-50% + min(860px, 88vw))) scale(0.72)", opacity: 0,    zIndex: 10, pointerEvents: "none" };
    case 3: return { transform: "translateX(calc(-50% - min(860px, 88vw))) scale(0.72)", opacity: 0,    zIndex: 10, pointerEvents: "none" };
    case 4: return { transform: "translateX(calc(-50% - min(430px, 42vw))) scale(0.87)", opacity: 0.82, zIndex: 20, pointerEvents: "none" };
    default: return { transform: "translateX(-50%) scale(1)", opacity: 0, zIndex: 0, pointerEvents: "none" };
  }
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [centerIdx, setCenterIdx] = useState(0);

  // Auto-cycle cards
  useEffect(() => {
    const id = setInterval(() => setCenterIdx(i => (i + 1) % N), 4500);
    return () => clearInterval(id);
  }, []);

  function getOffset(cardIdx: number) {
    return ((cardIdx - centerIdx + N) % N) as 0|1|2|3|4;
  }

  return (
    <section className="overflow-x-hidden relative" style={{ background: "linear-gradient(160deg, #06111f 0%, #0a1f35 40%, #083a36 75%, #0a2438 100%)" }}>

      {/* Animated mesh blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-teal-400/8 blur-[80px] pointer-events-none" />

      {/* ── Centered copy ── */}
      <div className="relative section-px max-w-4xl mx-auto text-center pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-14">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{ background: "rgba(13,148,136,0.15)", border: "1px solid rgba(94,234,212,0.3)", color: "#5EEAD4" }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
          <span className="text-[12px] font-semibold">Powering 50+ hospitals across India</span>
        </div>

        {/* Headline — larger, bolder, teal highlight */}
        <h1 className="font-headline font-extrabold leading-[1.04] tracking-tight mb-5
                       text-[2.9rem] sm:text-[3.9rem] lg:text-[4.8rem] xl:text-[5.6rem] text-white">
          Answer every patient call.
          <br />
          <span style={{
            background: "linear-gradient(90deg, #5EEAD4 0%, #2DD4BF 40%, #0D9488 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>In any language. Instantly.</span>
        </h1>

        {/* Sub-copy */}
        <p className="leading-[1.8] mb-8 mx-auto max-w-[52ch]
                      text-[15px] sm:text-[17px] lg:text-[18px] text-slate-300">
          Xyras&apos;s multilingual AI agent handles every inbound hospital call —
          booking appointments, lab reports, billing queries — 24 × 7 in Hindi, Tamil,
          Telugu, Kannada and 9 more languages.
        </p>

        {/* CTA buttons — matching dark hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <a href="#pricing"
            id="hero-try-free"
            className="w-full sm:w-auto bg-secondary text-white font-bold text-[15px] px-8 py-4 rounded-full hover:bg-secondary/90 active:scale-[0.98] transition-all text-center
                       shadow-[0_6px_24px_rgba(13,148,136,0.5)] whitespace-nowrap"
          >
            Try it for free →
          </a>
          <a href="#how-it-works"
            className="w-full sm:w-auto font-bold text-[15px] px-8 py-4 rounded-full transition-all text-center whitespace-nowrap"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
          >
            Watch demo
          </a>
        </div>

        {/* Social proof */}
        <p className="text-slate-400 text-[12.5px] mt-4">
          Free 14-day trial · No credit card · Setup in 48 hours
        </p>
      </div>

      {/* ── Card stack — dark bg matched edge masks ── */}
      <div className="relative w-full overflow-x-hidden pb-16 sm:pb-20">
        {/* Shadow mask at edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 z-40 pointer-events-none"
          style={{ background: "linear-gradient(to right, #06111f, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 z-40 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a1f35, transparent)" }} />

        {/* Stack container */}
        <div className="relative mx-auto" style={{ height: "480px", maxWidth: "100%" }}>
          {CARDS.map((card, i) => {
            const offset   = getOffset(i);
            const posStyle = getPosStyle(offset);
            const Comp     = card.component;

            return (
              <div
                key={card.title}
                style={{
                  position:   "absolute",
                  top:        0,
                  left:       "50%",
                  width:      "min(700px, 90vw)",
                  height:     "480px",
                  ...posStyle,
                  transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="w-full h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_8px_48px_rgba(15,23,42,0.12)]">
                  {/* Browser chrome */}
                  <div className="bg-[#F8FAFC] border-b border-slate-100 px-4 py-2.5 flex items-center gap-2.5">
                    <div className="flex gap-[5px]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <div className="flex-1 flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2.5 py-1 min-w-0">
                      <span className="material-symbols-outlined text-secondary text-[11px]">lock</span>
                      <span className="text-[10.5px] text-slate-400 truncate">app.auraclinical.com</span>
                    </div>
                  </div>

                  {/* Card content */}
                  <Comp />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenterIdx(i)}
              className={`rounded-full transition-all duration-300 ${
                i === centerIdx
                  ? "w-6 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
