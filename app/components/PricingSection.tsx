"use client";

import { useState } from "react";

const PLANS = [
    {
        id: "starter",
        badge: "STARTER",
        badgeStyle: "bg-slate-100 text-slate-500",
        name: "Clinic",
        tagline: "For small clinics & diagnostic centers",
        monthlyPrice: 4999,
        annualPrice: 3999,
        savePercent: 20,
        desc: "Get started with AI voice for your clinic in 48 hours. Zero hardware. Zero technical team.",
        everythingIn: null,
        features: [
            "Up to 500 answered calls / day",
            "6 Indian languages supported",
            "Appointment booking & rescheduling",
            "Lab report status queries",
            "SMS patient notifications",
            "Standard email support",
        ],
        addOn: "WhatsApp notifications — Add-On",
        cta: "Get Started",
        ctaVariant: "outline" as const,
        popular: false,
        dark: false,
    },
    {
        id: "hospital",
        badge: "MOST POPULAR",
        badgeStyle: "bg-secondary/10 text-secondary",
        name: "Hospital",
        tagline: "For multi-specialty hospitals",
        monthlyPrice: 9999,
        annualPrice: 7999,
        savePercent: 20,
        desc: "Manage patient interactions at scale with advanced AI, analytics, and EHR sync.",
        everythingIn: "Everything in Clinic, plus:",
        features: [
            "Up to 2,000 answered calls / day",
            "All 12 Indian languages",
            "EHR integration (Practo, Meditech, Epic)",
            "Real-time analytics dashboard",
            "WhatsApp + SMS notifications",
            "Emergency escalation protocols",
        ],
        addOn: "AI transcription & call summaries",
        cta: "Get a Demo",
        ctaVariant: "solid" as const,
        popular: true,
        dark: false,
    },
    {
        id: "enterprise",
        badge: "ENTERPRISE",
        badgeStyle: "bg-white/15 text-white/80",
        name: "Scale",
        tagline: "Get everything in one package",
        monthlyPrice: null,
        annualPrice: null,
        savePercent: 0,
        desc: "For large hospital groups with custom integration requirements and uptime SLAs.",
        everythingIn: "Full AI Voice Platform:",
        features: [
            "Unlimited calls — no throttling",
            "Custom dialect & language training",
            "Any EHR / HMS integration",
            "Dedicated account manager",
            "On-premise deployment option",
            "99.9% uptime SLA guarantee",
        ],
        addOn: "Custom model fine-tuning included",
        cta: "Contact Sales",
        ctaVariant: "white" as const,
        popular: false,
        dark: true,
    },
] as const;

function formatINR(n: number) {
    return "₹" + n.toLocaleString("en-IN");
}

export default function PricingSection() {
    const [annual, setAnnual] = useState(true);

    return (
        <section className="section-px bg-surface-container-low" id="pricing">
            <div className="max-w-7xl mx-auto py-16 sm:py-20 lg:py-24">

                {/* ── Header — left-aligned like Nextiva ── */}
                <div className="mb-10 sm:mb-12">
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full mb-5">
                        Plans &amp; Pricing
                    </span>
                    <h2 className="font-headline font-extrabold text-primary text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] leading-tight mb-3">
                        Choose Your Plan
                    </h2>
                    <p className="text-on-surface-variant text-[15px] sm:text-[16px] max-w-md leading-relaxed">
                        Every plan includes 24 × 7 AI coverage and multilingual support.
                        Pick the one that fits your hospital&apos;s scale.
                    </p>
                </div>

                {/* ── Billing toggle ── */}
                <div className="flex items-center gap-2 mb-10 sm:mb-12 flex-wrap">
                    <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                        <button
                            onClick={() => setAnnual(false)}
                            className={`px-5 py-2.5 text-[13.5px] font-semibold transition-all ${!annual ? "bg-primary text-white" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={`px-5 py-2.5 text-[13.5px] font-semibold transition-all ${annual ? "bg-primary text-white" : "text-slate-500 hover:text-slate-800"}`}
                        >
                            Annually
                        </button>
                    </div>
                    {annual && (
                        <span className="text-[12px] font-bold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full">
                            Save up to 20%
                        </span>
                    )}
                </div>

                {/* ── Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
                    {PLANS.map((plan) => {
                        const price = annual ? plan.annualPrice : plan.monthlyPrice;

                        return (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col rounded-2xl overflow-hidden
                  ${plan.dark
                                        ? "bg-[#0F172A] text-white"
                                        : plan.popular
                                            ? "bg-white shadow-[0_0_0_2px_#0D9488,0_16px_48px_rgba(13,148,136,0.12)]"
                                            : "bg-white border border-slate-200 shadow-sm"
                                    }`}
                            >
                                {/* Card body */}
                                <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">

                                    {/* Badge */}
                                    <span className={`self-start text-[10px] font-extrabold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full ${plan.badgeStyle}`}>
                                        {plan.badge}
                                    </span>

                                    {/* Name + tagline */}
                                    <div>
                                        <h3 className={`font-headline font-extrabold text-[2rem] sm:text-[2.2rem] leading-tight ${plan.dark ? "text-white" : "text-primary"}`}>
                                            {plan.name}
                                        </h3>
                                        <p className={`text-[12.5px] mt-0.5 ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{plan.tagline}</p>
                                    </div>

                                    {/* Price */}
                                    {price !== null ? (
                                        <div>
                                            <div className={`flex items-baseline gap-1 ${plan.dark ? "text-white" : "text-primary"}`}>
                                                <span className="text-[1.5rem] font-bold">₹</span>
                                                <span className="font-headline font-extrabold text-[3rem] sm:text-[3.5rem] leading-none">
                                                    {price.toLocaleString("en-IN")}
                                                </span>
                                                <span className={`text-[13px] font-medium ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>/mo</span>
                                            </div>
                                            {annual && plan.monthlyPrice && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[12px] line-through ${plan.dark ? "text-slate-500" : "text-slate-400"}`}>{formatINR(plan.monthlyPrice)}</span>
                                                    <span className="text-[11px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">Save {plan.savePercent}%</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="font-headline font-extrabold text-[2.2rem] text-white leading-none">Custom</div>
                                            <p className="text-[12.5px] text-slate-400 mt-1">Tailored to your hospital group</p>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className={`text-[13px] leading-relaxed ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{plan.desc}</p>

                                    {/* Feature list */}
                                    <div className="flex flex-col gap-2.5">
                                        {plan.everythingIn && (
                                            <p className="text-[11.5px] font-bold text-secondary uppercase tracking-wide mb-0.5">{plan.everythingIn}</p>
                                        )}
                                        {plan.features.map((f) => (
                                            <div key={f} className="flex items-start gap-2.5">
                                                <span className={`material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5 ${plan.dark ? "text-secondary-fixed" : "text-secondary"}`}
                                                    style={{ fontVariationSettings: '"FILL" 1' }}>
                                                    check_circle
                                                </span>
                                                <span className={`text-[13px] ${plan.dark ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add-On row */}
                                    <div className={`flex items-start gap-2 pt-2 border-t ${plan.dark ? "border-white/8" : "border-slate-100"}`}>
                                        <span className="material-symbols-outlined text-[15px] flex-shrink-0 mt-0.5 text-slate-400">smart_toy</span>
                                        <span className={`text-[12px] ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{plan.addOn}</span>
                                    </div>
                                </div>

                                {/* CTA button */}
                                <div className={`px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t ${plan.dark ? "border-white/8" : "border-slate-100"}`}>
                                    <button
                                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-[14px] transition-all group
                      ${plan.ctaVariant === "solid"
                                                ? "bg-primary text-white hover:bg-primary/90"
                                                : plan.ctaVariant === "white"
                                                    ? "bg-white text-primary hover:bg-slate-50"
                                                    : "bg-primary text-white hover:bg-primary/90"
                                            }`}
                                    >
                                        <span>{plan.cta}</span>
                                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom trust strip */}
                <p className="text-center text-[12.5px] text-slate-400 mt-8 sm:mt-10">
                    All plans include 24/7 AI support · No credit card required for demo · Cancel anytime
                </p>
            </div>
        </section>
    );
}
