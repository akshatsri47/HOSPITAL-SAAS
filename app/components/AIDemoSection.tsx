"use client";

import { useState, useEffect } from "react";

/* ── EQ (reused from hero) ── */
const EQ_NAMES = ["eq-a", "eq-b", "eq-c", "eq-d", "eq-e"] as const;
const EQ_DURS = ["0.82s", "0.67s", "0.95s", "0.73s", "0.88s"] as const;
const EQ_N = 24;

function EQWaveform() {
    return (
        <div className="flex items-end justify-center w-full" style={{ height: "28px", gap: "2.5px" }}>
            {Array.from({ length: EQ_N }).map((_, i) => (
                <div key={i} style={{
                    width: "2px", height: "3px", borderRadius: "1px", flexShrink: 0,
                    background: "#5EEAD4",
                    boxShadow: "0 0 4px rgba(94,234,212,0.55)",
                    animationName: EQ_NAMES[i % 5],
                    animationDuration: EQ_DURS[i % 5],
                    animationDelay: `${i * 30}ms`,
                    animationTimingFunction: "cubic-bezier(0.45,0,0.55,1)",
                    animationIterationCount: "infinite",
                    animationDirection: "alternate",
                    willChange: "height",
                }} />
            ))}
        </div>
    );
}

/* ── Rotating live call data ── */
const CALLS = [
    { lang: "Kannada", dept: "Orthopedics", patient: "Rajesh Kumar", action: "Slot booked — Dr. Rao, Thu 2 PM" },
    { lang: "Hindi", dept: "Cardiology", patient: "Priya Sharma", action: "Appointment confirmed — Dr. Mehta" },
    { lang: "Tamil", dept: "Lab Reports", patient: "Arjun Pillai", action: "Report sent via SMS" },
    { lang: "Telugu", dept: "Pediatrics", patient: "Kavitha Reddy", action: "Slot booked — Dr. Rao, Fri 10 AM" },
];

export default function AIDemoSection() {
    const [idx, setIdx] = useState(0);
    const [vis, setVis] = useState(true);

    useEffect(() => {
        const id = setInterval(() => {
            setVis(false);
            setTimeout(() => { setIdx(p => (p + 1) % CALLS.length); setVis(true); }, 350);
        }, 3800);
        return () => clearInterval(id);
    }, []);

    const c = CALLS[idx];

    return (
        <section
            className="relative overflow-hidden section-px py-20 sm:py-28"
            style={{ background: "linear-gradient(160deg, #06111f 0%, #0a2235 35%, #08403c 70%, #065544 100%)" }}
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-[600px] h-[400px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-secondary/8 blur-[100px] pointer-events-none" />

            {/* ── Centered header ── */}
            <div className="relative text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                {/* Sparkle eyebrow */}
                <div className="flex items-center justify-center gap-2 mb-5 text-teal-300 text-[14px] font-semibold tracking-wide">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                    Next-generation Voice AI
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                </div>



                {/* CTAs */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a href="#pricing"
                        className="bg-secondary text-white font-bold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-full
                       hover:bg-secondary/90 transition-all shadow-[0_4px_24px_rgba(13,148,136,0.5)]">
                        Explore Xyras AI
                    </a>
                    <a href="#how-it-works" className="flex items-center gap-1.5 text-slate-300 font-semibold text-[14px] sm:text-[15px] hover:text-white transition-colors">
                        See what&apos;s new
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </a>
                </div>
            </div>

            {/* ── Main demo stage ── */}
            <div className="relative max-w-5xl mx-auto">
                {/* Stage card */}
                <div
                    className="relative rounded-3xl overflow-hidden border border-white/8"
                    style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                        backdropFilter: "blur(10px)",
                        minHeight: "420px",
                    }}
                >
                    {/* Subtle inner gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-secondary/5 pointer-events-none" />

                    {/* ── Left floating card — patient query ── */}
                    <div className="absolute top-8 left-4 sm:left-8 w-[220px] sm:w-[260px] bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] p-4 sm:p-5 z-10">
                        {/* Card header */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                            <span className="font-bold text-[12.5px] text-slate-800">Incoming Patient Call</span>
                        </div>
                        {/* "Typing" query bubble */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-[12px] text-slate-600 leading-relaxed mb-3">
                            <span className={`transition-all duration-300 ${vis ? "opacity-100" : "opacity-0"}`}>
                                Which language was that?<br />
                                Booking for {c.patient}…
                            </span>
                        </div>
                        {/* Send button */}
                        <div className="flex justify-end">
                            <div className="w-7 h-7 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary text-[13px]">arrow_forward</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Center — EQ animation (perfectly centered) ── */}
                    <div
                        className="absolute z-0"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -60%)",
                        }}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/8 border border-white/15 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary-fixed text-[30px] sm:text-[36px]">graphic_eq</span>
                            </div>
                            <div className="w-48 sm:w-64">
                                <EQWaveform />
                            </div>
                        </div>
                    </div>

                    {/* ── Right floating card — AI actions ── */}
                    <div className="absolute top-8 right-4 sm:right-8 w-[200px] sm:w-[240px] bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] p-4 sm:p-5 z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                            <span className="font-bold text-[12.5px] text-slate-800">AI Actions</span>
                        </div>
                        <div className={`space-y-2 transition-all duration-300 ${vis ? "opacity-100" : "opacity-0"}`}>
                            {[
                                { label: `Language: ${c.lang}`, done: true },
                                { label: `Dept: ${c.dept}`, done: true },
                                { label: c.action, done: false },
                            ].map(({ label, done }, i) => (
                                <div key={i} className="flex items-start gap-1.5">
                                    <span className={`material-symbols-outlined text-[14px] flex-shrink-0 mt-0.5 ${done ? "text-secondary" : "text-slate-300"}`}>
                                        {done ? "check_circle" : "radio_button_unchecked"}
                                    </span>
                                    <span className={`text-[11px] leading-tight ${done ? "text-slate-600 font-medium" : "text-slate-400 italic"}`}>{label}</span>
                                </div>
                            ))}
                        </div>
                        {/* Progress */}
                        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-gradient-to-r from-secondary to-[#5EEAD4] transition-all duration-700 ${vis ? "w-[74%]" : "w-[40%]"}`} />
                        </div>
                    </div>

                    {/* ── Bottom gradient tagline ── */}
                    <div className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-6 sm:pb-8">
                        <p
                            className="font-headline font-extrabold text-[1.5rem] sm:text-[1.9rem] lg:text-[2.4rem] tracking-tight"
                            style={{
                                background: "linear-gradient(90deg, #5EEAD4 0%, #0D9488 35%, #818CF8 65%, #A78BFA 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Patient-first AI&nbsp;
                            <span className="material-symbols-outlined align-middle text-[1rem] sm:text-[1.3rem]" style={{ fontVariationSettings: '"FILL" 1', WebkitTextFillColor: "#5EEAD4" }}>
                                auto_awesome
                            </span>
                        </p>
                    </div>

                    {/* Pad */}
                    <div style={{ height: "420px" }} />
                </div>
            </div>
        </section>
    );
}
