"use client";

import { useState, useEffect } from "react";

const CALLS = [
    { lang: "Hindi", city: "New Delhi", dept: "Cardiology", icon: "call" },
    { lang: "Tamil", city: "Chennai", dept: "Orthopedics", icon: "mic" },
    { lang: "Telugu", city: "Hyderabad", dept: "Neurology", icon: "record_voice_over" },
    { lang: "Kannada", city: "Bangalore", dept: "Pediatrics", icon: "call" },
    { lang: "Bengali", city: "Kolkata", dept: "Radiology", icon: "mic" },
    { lang: "Marathi", city: "Pune", dept: "Oncology", icon: "record_voice_over" },
    { lang: "Gujarati", city: "Ahmedabad", dept: "Dermatology", icon: "call" },
    { lang: "Punjabi", city: "Amritsar", dept: "General OPD", icon: "mic" },
];

export default function LiveCallTicker() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setOffset(p => (p + 1) % CALLS.length), 2800);
        return () => clearInterval(id);
    }, []);

    // Show different counts per breakpoint via CSS hide/show
    const doubled = [...CALLS, ...CALLS];
    const visible = doubled.slice(offset, offset + 8);

    return (
        <div className="w-full bg-surface-container-low border-b border-outline-variant/20">
            <div className="section-px max-w-7xl mx-auto py-2 flex items-center gap-3">

                {/* Label */}
                <div className="flex-shrink-0 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-secondary" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-secondary whitespace-nowrap">
                        Live Calls
                    </span>
                </div>

                <div className="h-3 w-px bg-outline-variant/40 flex-shrink-0" />

                {/* Pills — show 2 on mobile, 3 on tablet, 5 on desktop */}
                <div className="flex gap-2 overflow-hidden flex-1 min-w-0">
                    {visible.map((c, i) => (
                        <div
                            key={i}
                            className={`flex-shrink-0 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 bg-surface-container-lowest rounded-full border border-outline-variant/20 text-[10px] sm:text-[11px] font-medium text-on-surface-variant whitespace-nowrap ${
                                /* Hide extra items on mobile / tablet */
                                i >= 2 ? "hidden sm:flex" : "flex"
                                } ${i >= 3 ? "sm:hidden lg:flex" : ""} ${i >= 5 ? "hidden lg:flex" : ""}`}
                        >
                            <span className="material-symbols-outlined text-secondary text-[12px]">{c.icon}</span>
                            <span className="font-semibold text-primary">{c.city}</span>
                            <span className="hidden sm:inline text-outline-variant">·</span>
                            <span className="hidden sm:inline">{c.lang} · {c.dept}</span>
                        </div>
                    ))}
                </div>

                {/* Count — hidden on mobile */}
                <div className="flex-shrink-0 hidden md:flex items-center gap-1 text-[11px] font-semibold text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[13px]">query_stats</span>
                    1,247 today
                </div>
            </div>
        </div>
    );
}
