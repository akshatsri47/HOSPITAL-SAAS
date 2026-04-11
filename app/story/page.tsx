"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────── */
function useInView(threshold = 0.25) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

function useCounter(target: number, duration: number, start: boolean) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!start) return;
        let raf: number;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * ease));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration]);
    return val;
}

function formatINR(n: number) {
    if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + "L";
    return "₹" + n.toLocaleString("en-IN");
}

/* ──────────────────────────────────────────────────────────
   SECTION 1: HERO
────────────────────────────────────────────────────────── */
function HeroSection() {
    return (
        <section
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #06111f 0%, #0a2235 40%, #083a36 75%, #065544 100%)" }}
        >
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

            {/* Glow blobs */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-secondary/15 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-[80px] pointer-events-none" />

            <div className="relative max-w-4xl">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-teal-300 text-[12px] font-semibold mb-8">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                    The AI that works like 20 employees
                </div>

                <h1 className="font-headline font-extrabold text-white leading-[1.05] tracking-tight mb-6
                       text-[2.8rem] sm:text-[4rem] lg:text-[5rem]">
                    Stop paying{" "}
                    <span style={{
                        background: "linear-gradient(90deg, #5EEAD4, #0D9488, #2DD4BF)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                        ₹3,00,000/month
                    </span>
                    <br />for a job that AI can do.
                </h1>

                <p className="text-slate-400 leading-[1.8] mb-10 mx-auto max-w-[52ch]
                      text-[15px] sm:text-[17px] lg:text-[18px]">
                    Most hospitals employ 15–25 front desk staff just to answer patient calls.
                    Scroll down to see exactly what that&apos;s costing you — and what one AI agent can do instead.
                </p>

                {/* Scroll cue */}
                <div className="flex flex-col items-center gap-2 text-slate-500">
                    <span className="text-[12px] font-medium uppercase tracking-widest">Scroll to see the math</span>
                    <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex items-start justify-center pt-1.5">
                        <div className="w-1 h-2 bg-teal-400 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   SECTION 2: THE 20 EMPLOYEES
────────────────────────────────────────────────────────── */
const NAMES = [
    "Priya", "Arjun", "Kavitha", "Ramesh", "Sunita", "Deepak", "Meera", "Rajesh",
    "Anita", "Suresh", "Lakshmi", "Vijay", "Pooja", "Manoj", "Geetha", "Rahul",
    "Seetha", "Anil", "Divya", "Kumar",
];

function EmployeeSection({ onVisible }: { onVisible: () => void }) {
    const { ref, visible } = useInView(0.1);
    const totalCost = useCounter(300000, 2200, visible);

    useEffect(() => { if (visible) onVisible(); }, [visible, onVisible]);

    return (
        <section ref={ref} className="py-20 sm:py-28 px-6 bg-white">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="inline-block text-[11.5px] font-bold text-rose-500 uppercase tracking-[0.2em] bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full mb-4">
                        The Current Reality
                    </span>
                    <h2 className="font-headline font-extrabold text-primary text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-tight mb-3">
                        Your 20 front desk staff
                    </h2>
                    <p className="text-slate-500 text-[15px] sm:text-[16px] max-w-md mx-auto">
                        Each paid ₹15,000/month to answer patient calls, book appointments, and route queries.
                    </p>
                </div>

                {/* Employee grid — 4×5 */}
                <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-3 mb-12">
                    {NAMES.map((name, i) => (
                        <div
                            key={name}
                            className="flex flex-col items-center gap-1.5"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
                                transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.05 * i}s`,
                            }}
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 border-2 border-white shadow-md flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400 text-[20px] sm:text-[22px]">person</span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate w-full text-center">{name}</span>
                            <span className="text-[8.5px] sm:text-[9.5px] text-rose-500 font-bold">₹15,000</span>
                        </div>
                    ))}
                </div>

                {/* Big counter */}
                <div className={`text-center transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="inline-block bg-rose-50 border border-rose-100 rounded-3xl px-10 sm:px-16 py-8 sm:py-10">
                        <p className="text-[12px] font-bold text-rose-400 uppercase tracking-widest mb-2">Your monthly bill</p>
                        <div className="font-headline font-extrabold text-rose-600 text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-none">
                            {formatINR(totalCost)}
                        </div>
                        <p className="text-[14px] sm:text-[16px] text-rose-400 font-semibold mt-2">per month · every month · forever</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   SECTION 3: THE LIMITATIONS
────────────────────────────────────────────────────────── */
const LIMITS = [
    { icon: "schedule", title: "Only 8 hours a day", desc: "No calls answered from 6 PM to 9 AM. Emergencies go unanswered overnight.", pct: 33 },
    { icon: "translate", title: "Only 2–3 languages", desc: "Most staff speak Hindi and one regional language. Tamil, Telugu, Kannada — missed.", pct: 25 },
    { icon: "phone_missed", title: "Calls drop during peak hours", desc: "Morning rush, lunch, evening surge — queues build. Patients give up and leave.", pct: 60 },
    { icon: "sick", title: "Sick leaves & attrition", desc: "20% annual attrition. Recruit, train, repeat — every quarter.", pct: 20 },
];

function LimitsSection() {
    const { ref, visible } = useInView();
    return (
        <section ref={ref} className="py-20 sm:py-28 px-6"
            style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}
        >
            <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="inline-block text-[11.5px] font-bold text-amber-600 uppercase tracking-[0.2em] bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full mb-4">
                        The Hidden Problems
                    </span>
                    <h2 className="font-headline font-extrabold text-primary text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-tight">
                        But humans have limits
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {LIMITS.map(({ icon, title, desc, pct }, i) => (
                        <div
                            key={title}
                            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(24px)",
                                transition: `all 0.6s ease-out ${0.12 * i}s`,
                            }}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-rose-500 text-[20px]">{icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary text-[15px] sm:text-[16px]">{title}</h3>
                                    <p className="text-slate-500 text-[13px] leading-relaxed mt-0.5">{desc}</p>
                                </div>
                            </div>
                            {/* Capacity bar */}
                            <div>
                                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                                    <span>Effective coverage</span>
                                    <span className="text-rose-500">{pct}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-1000"
                                        style={{ width: visible ? `${pct}%` : "0%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   SECTION 4: THE SWITCH — dramatic transition
────────────────────────────────────────────────────────── */
function SwitchSection({ triggered }: { triggered: boolean }) {
    const { ref, visible } = useInView(0.3);
    const [switched, setSwitched] = useState(false);

    return (
        <section
            ref={ref}
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #06111f, #083a36 50%, #0a4840 100%)" }}
        >
            {/* Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-teal-400/8 blur-[100px] pointer-events-none" />

            <div className="relative max-w-4xl mx-auto">

                {/* Question */}
                <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h2 className="font-headline font-extrabold text-white leading-tight mb-5
                         text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem]">
                        What if <span style={{
                            background: "linear-gradient(90deg,#5EEAD4,#0D9488)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>one AI agent</span>
                        <br />could replace all 20?
                    </h2>
                    <p className="text-slate-400 text-[15px] sm:text-[17px] max-w-lg mx-auto">
                        For less than the monthly salary of a single employee.
                    </p>
                </div>

                {/* The visual switch */}
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

                    {/* 20 employees side */}
                    <div className={`text-center transition-all duration-700 ${switched ? "opacity-30 scale-75" : "opacity-100 scale-100"}`}>
                        {/* 4×5 mini grid */}
                        <div className="grid grid-cols-5 gap-1.5 mb-3">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i}
                                    className="w-8 h-8 rounded-full bg-slate-600/50 border border-slate-500/30 flex items-center justify-center"
                                    style={{ transition: `all 0.4s ease ${i * 0.03}s` }}
                                >
                                    <span className="material-symbols-outlined text-slate-300 text-[14px]">person</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[12px] text-slate-400 font-semibold">20 employees</p>
                        <p className="font-headline font-extrabold text-rose-400 text-[1.5rem]">₹3,00,000<span className="text-[12px] font-normal">/mo</span></p>
                    </div>

                    {/* Arrow / toggle */}
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={() => setSwitched(v => !v)}
                            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 font-bold text-[14px]
                ${switched ? "bg-secondary border-secondary text-white scale-110 shadow-[0_0_32px_rgba(13,148,136,0.5)]" : "border-slate-500 text-slate-400 hover:border-secondary hover:text-secondary"}`}
                        >
                            {switched ? "AI" : "→"}
                        </button>
                        <p className="text-[11px] text-slate-500">{switched ? "Switched!" : "Tap to switch"}</p>
                    </div>

                    {/* AI side */}
                    <div className={`text-center transition-all duration-700 ${switched ? "opacity-100 scale-110" : "opacity-40 scale-90"}`}>
                        {/* Glowing orb */}
                        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-3">
                            {switched && (
                                <>
                                    <div className="absolute inset-0 rounded-full bg-secondary/20 animate-ping" style={{ animationDuration: "2s" }} />
                                    <div className="absolute -inset-2 rounded-full bg-secondary/10 blur-lg" />
                                </>
                            )}
                            <div className={`w-full h-full rounded-full border-4 flex items-center justify-center transition-all duration-700
                ${switched ? "border-secondary bg-secondary/20 shadow-[0_0_48px_rgba(13,148,136,0.6)]" : "border-slate-600 bg-slate-800"}`}
                            >
                                <span className={`material-symbols-outlined text-[36px] sm:text-[42px] transition-colors duration-700 ${switched ? "text-secondary-fixed" : "text-slate-500"}`}>
                                    graphic_eq
                                </span>
                            </div>
                        </div>
                        <p className="text-[12px] text-slate-400 font-semibold">1 Aura AI Agent</p>
                        <p className="font-headline font-extrabold text-secondary text-[1.5rem]">₹9,999<span className="text-[12px] font-normal">/mo</span></p>
                    </div>
                </div>

                {/* Savings badge */}
                {switched && (
                    <div className="animate-fade-slide">
                        <div className="inline-block bg-secondary/15 border border-secondary/30 rounded-2xl px-8 py-5">
                            <p className="text-[12px] font-bold text-teal-300 uppercase tracking-widest mb-1">Monthly Savings</p>
                            <p className="font-headline font-extrabold text-white text-[3rem] sm:text-[4rem]">
                                ₹2,90,001
                            </p>
                            <p className="text-[13px] text-teal-300 mt-1">That&apos;s ₹34.8 lakh saved every year</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   SECTION 5: AI CAPABILITIES GRID
────────────────────────────────────────────────────────── */
const CAPABILITIES = [
    { icon: "schedule", label: "Hours/day", employee: "8h", ai: "24h", better: true },
    { icon: "calendar_month", label: "Days/year", employee: "250", ai: "365", better: true },
    { icon: "translate", label: "Languages", employee: "2–3", ai: "12+", better: true },
    { icon: "call", label: "Concurrent", employee: "1", ai: "Unlimited", better: true },
    { icon: "sick", label: "Sick leaves", employee: "12/yr", "ai": "0", better: true },
    { icon: "trending_up", label: "Accuracy", employee: "~80%", ai: "97%", better: true },
];

function CapabilitiesSection() {
    const { ref, visible } = useInView();
    return (
        <section ref={ref} className="py-20 sm:py-28 px-6 bg-surface-container-low">
            <div className="max-w-4xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h2 className="font-headline font-extrabold text-primary text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-tight mb-3">
                        The numbers side-by-side
                    </h2>
                    <p className="text-slate-500 text-[15px]">20 human employees vs. 1 Aura AI</p>
                </div>

                {/* Comparison header */}
                <div className="grid grid-cols-3 gap-3 mb-3 px-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Metric</div>
                    <div className="text-center text-[11px] font-bold text-rose-400 uppercase tracking-wide">20 Staff</div>
                    <div className="text-center text-[11px] font-bold text-secondary uppercase tracking-wide">Aura AI</div>
                </div>

                <div className="flex flex-col gap-2">
                    {CAPABILITIES.map(({ icon, label, employee, ai }, i) => (
                        <div
                            key={label}
                            className="grid grid-cols-3 gap-3 items-center bg-white rounded-xl px-4 py-4 border border-slate-100 shadow-sm"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateX(0)" : "translateX(-24px)",
                                transition: `all 0.5s ease-out ${0.1 * i}s`,
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">{icon}</span>
                                <span className="text-[13px] sm:text-[14px] font-semibold text-slate-700">{label}</span>
                            </div>
                            <div className="text-center">
                                <span className="text-[14px] sm:text-[15px] font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-lg">{employee}</span>
                            </div>
                            <div className="text-center flex items-center justify-center gap-1.5">
                                <span className="text-[14px] sm:text-[15px] font-bold text-secondary bg-secondary/8 px-3 py-1 rounded-lg">{ai}</span>
                                <span className="material-symbols-outlined text-secondary text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   SECTION 6: INTERACTIVE SAVINGS CALCULATOR
────────────────────────────────────────────────────────── */
function CalculatorSection() {
    const { ref, visible } = useInView();
    const [staff, setStaff] = useState(20);
    const [salary, setSalary] = useState(15000);

    const currentCost = staff * salary;
    const auraCost = 9999;
    const monthlySaving = Math.max(0, currentCost - auraCost);
    const annualSaving = monthlySaving * 12;
    const roi = currentCost > 0 ? Math.round((monthlySaving / currentCost) * 100) : 0;

    return (
        <section ref={ref} className="py-20 sm:py-28 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className={`text-center mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="inline-block text-[11.5px] font-bold text-secondary uppercase tracking-[0.2em] bg-secondary/8 border border-secondary/15 px-3 py-1.5 rounded-full mb-4">
                        ROI Calculator
                    </span>
                    <h2 className="font-headline font-extrabold text-primary text-[2rem] sm:text-[2.8rem] lg:text-[3rem] leading-tight">
                        Calculate your savings
                    </h2>
                </div>

                <div className={`bg-surface-container-low rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

                    {/* Sliders */}
                    <div className="flex flex-col gap-8 mb-8">
                        {/* Staff count */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="font-semibold text-primary text-[14px] sm:text-[15px]">
                                    Front desk staff members
                                </label>
                                <span className="font-headline font-extrabold text-secondary text-[24px]">{staff}</span>
                            </div>
                            <input type="range" min={1} max={50} value={staff} onChange={e => setStaff(+e.target.value)}
                                className="w-full accent-teal-600 h-2 cursor-pointer" />
                            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                                <span>1 person</span><span>50 people</span>
                            </div>
                        </div>

                        {/* Salary */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="font-semibold text-primary text-[14px] sm:text-[15px]">
                                    Average monthly salary
                                </label>
                                <span className="font-headline font-extrabold text-secondary text-[24px]">
                                    ₹{salary.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <input type="range" min={8000} max={35000} step={500} value={salary} onChange={e => setSalary(+e.target.value)}
                                className="w-full accent-teal-600 h-2 cursor-pointer" />
                            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                                <span>₹8,000</span><span>₹35,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Results grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="text-center bg-rose-50 border border-rose-100 rounded-2xl p-5">
                            <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wide mb-1">Your current cost</p>
                            <p className="font-headline font-extrabold text-rose-600 text-[1.5rem] sm:text-[1.8rem] leading-tight">
                                {formatINR(currentCost)}
                            </p>
                            <p className="text-[10px] text-rose-400 mt-0.5">per month</p>
                        </div>

                        <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl p-5">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Aura AI cost</p>
                            <p className="font-headline font-extrabold text-slate-700 text-[1.5rem] sm:text-[1.8rem] leading-tight">₹9,999</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">per month</p>
                        </div>

                        <div className="text-center bg-secondary/8 border border-secondary/20 rounded-2xl p-5">
                            <p className="text-[11px] font-bold text-secondary uppercase tracking-wide mb-1">Monthly savings</p>
                            <p className="font-headline font-extrabold text-secondary text-[1.5rem] sm:text-[1.8rem] leading-tight">
                                {formatINR(monthlySaving)}
                            </p>
                            <p className="text-[10px] text-secondary/70 mt-0.5">saved every month</p>
                        </div>
                    </div>

                    {/* Annual highlight */}
                    <div className="bg-primary rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Annual savings with Aura</p>
                            <p className="font-headline font-extrabold text-white text-[2rem] sm:text-[2.4rem] leading-tight">
                                {formatINR(annualSaving)}
                            </p>
                        </div>
                        <div className="text-center bg-white/8 rounded-xl px-6 py-3 border border-white/10">
                            <p className="text-[11px] text-slate-400 mb-0.5">Cost reduction</p>
                            <p className="font-headline font-extrabold text-secondary text-[2.5rem] leading-none">{roi}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   SECTION 7: FINAL CTA
────────────────────────────────────────────────────────── */
function FinalCTA() {
    const { ref, visible } = useInView();
    return (
        <section ref={ref}
            className="py-24 sm:py-32 px-6 text-center"
            style={{ background: "linear-gradient(160deg, #06111f 0%, #0a2235 40%, #065544 100%)" }}
        >
            <div className={`max-w-2xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="text-teal-300 font-semibold text-[13px] uppercase tracking-widest mb-5">Ready to make the switch?</p>
                <h2 className="font-headline font-extrabold text-white text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-tight mb-6">
                    Let Aura handle your calls.<br />
                    Your staff can do the rest.
                </h2>
                <p className="text-slate-400 text-[15px] sm:text-[17px] leading-relaxed mb-10 max-w-lg mx-auto">
                    Setup in 48 hours. No hardware. No engineers. Cancel anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/#pricing"
                        className="bg-secondary text-white font-bold text-[15px] px-9 py-4 rounded-full hover:bg-secondary/90 transition-all shadow-[0_4px_24px_rgba(13,148,136,0.5)]">
                        View Pricing Plans
                    </Link>
                    <Link href="/"
                        className="bg-white/10 border border-white/20 text-white font-semibold text-[15px] px-9 py-4 rounded-full hover:bg-white/18 transition-all">
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ──────────────────────────────────────────────────────────
   PAGE ROOT
────────────────────────────────────────────────────────── */
export default function StoryPage() {
    const [employeeVisible, setEmployeeVisible] = useState(false);
    const handleEmployeeVisible = useCallback(() => setEmployeeVisible(true), []);

    return (
        <div className="overflow-x-hidden bg-white">
            {/* Minimal sticky nav */}
            <header className="fixed inset-x-0 top-0 z-50 bg-[#06111f]/90 backdrop-blur-sm border-b border-white/8">
                <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[15px]">graphic_eq</span>
                        </div>
                        <span className="text-[14px] font-extrabold text-white font-headline">Aura Clinical</span>
                    </Link>
                    <Link href="/#pricing"
                        className="bg-secondary text-white font-bold text-[12.5px] px-5 py-2 rounded-full hover:bg-secondary/90 transition-all">
                        View Pricing
                    </Link>
                </div>
            </header>

            <main className="pt-14">
                <HeroSection />
                <EmployeeSection onVisible={handleEmployeeVisible} />
                <LimitsSection />
                <SwitchSection triggered={employeeVisible} />
                <CapabilitiesSection />
                <CalculatorSection />
                <FinalCTA />
            </main>
        </div>
    );
}
