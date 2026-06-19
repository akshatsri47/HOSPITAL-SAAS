"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Plans ─────────────────────────────────────────────────────
const PLANS = [
  {
    id: "starter",
    badge: "STARTER",
    badgeBg: "bg-[#F1F5F9] text-[#475569]",
    icon: "⭐",
    iconBg: "#F59E0B",
    name: "Starter Plan",
    tagline: "Perfect for growing businesses just starting out",
    normalMonthly: 12000,
    monthlyPrice: 9000,
    annualPrice: 7500,
    discountLabel: "25% OFF",
    saveLabel: "Save ₹3,000/mo",
    concurrentCalls: 5,
    desc: "5 concurrent AI call agents handling your business calls round the clock — no missed opportunities.",
    everythingIn: null,
    features: [
      "5 concurrent call agents",
      "Inbound & outbound calls",
      "Appointment booking & rescheduling",
      "Lead qualification engine",
    ],
    addOn: "Cancel anytime · No hidden fees",
    cta: "Get Started",
    ctaVariant: "outline" as const,
    popular: false,
    dark: false,
    topTag: null,
  },
  {
    id: "growth",
    badge: "MOST POPULAR",
    badgeBg: "bg-[#DCFCE7] text-[#16A34A]",
    icon: "✨",
    iconBg: "#00C2A8",
    name: "Growth Plan",
    tagline: "For scaling businesses ready for unlimited calls",
    normalMonthly: 35000,
    monthlyPrice: 21000,
    annualPrice: 17500,
    discountLabel: "40% OFF",
    saveLabel: "Save ₹14,000/mo",
    concurrentCalls: null,
    desc: "Unlimited concurrent calls and every feature unlocked — built to keep growing with you.",
    everythingIn: "Everything in Starter, plus:",
    features: [
      "Unlimited concurrent call agents",
      "All industries & use cases",
      "12+ Indian & global languages",
      "Real-time analytics dashboard",
      "CRM & calendar integrations",
      "WhatsApp + SMS notifications",
      "Priority support & onboarding",
    ],
    addOn: "Cancel anytime · No hidden fees",
    cta: "Get a Demo",
    ctaVariant: "solid" as const,
    popular: true,
    dark: true,
    topTag: "Most popular",
  },
  {
    id: "enterprise",
    badge: "ENTERPRISE",
    badgeBg: "bg-[#F1F5F9] text-[#475569]",
    icon: "⭐",
    iconBg: "#F59E0B",
    name: "Custom Plan",
    tagline: "Enterprise-grade tailored to your requirements",
    normalMonthly: null,
    monthlyPrice: null,
    annualPrice: null,
    discountLabel: null,
    saveLabel: null,
    concurrentCalls: null,
    desc: "For large businesses needing custom AI training, dedicated infrastructure, and enterprise SLAs.",
    everythingIn: "Everything in Growth, plus:",
    features: [
      "Custom AI model training",
      "Dedicated call infrastructure",
      "Any EHR / CRM integration",
      "Dedicated account manager",
      "On-premise deployment option",
      "99.9% uptime SLA guarantee",
    ],
    addOn: "Volume discounts available",
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    popular: false,
    dark: false,
    topTag: null,
  },
] as const;

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

type Ripple = { id: number; x: number; y: number };
function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const counter = useRef(0);
  const createRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const id = counter.current++;
    setRipples(p => [...p, { id, x, y }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 700);
  }, []);
  return { ripples, createRipple };
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const { ripples, createRipple } = useRipple();

  return (
    <section className="section-px bg-[#F8FAFC]" id="pricing">
      <div className="max-w-6xl mx-auto py-20 sm:py-24 lg:py-28">

        {/* Header */}
        <div className="mb-12 sm:mb-14 text-center">
          <span className="inline-block text-[10.5px] font-bold tracking-[0.2em] uppercase text-secondary bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full mb-5">
            Plans &amp; Pricing
          </span>
          <h2 className="font-headline font-extrabold text-primary text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#64748B] text-[16px] sm:text-[17px] max-w-[42ch] mx-auto leading-relaxed">
            Start small or go unlimited — every plan includes 24/7 AI coverage and multilingual support.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-12 flex-wrap">
          <div
            className="flex rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm p-1"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 text-[13px] font-bold rounded-xl transition-all duration-200 ${!annual ? "bg-[#0E1726] text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 text-[13px] font-bold rounded-xl transition-all duration-200 ${annual ? "bg-[#0E1726] text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
            >
              Annually
            </button>
          </div>
          <AnimatePresence>
            {annual && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-[11.5px] font-bold text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full"
              >
                🎉 Save up to 17% annually
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((plan, cardIdx) => {
            const price = annual
              ? (plan.annualPrice ?? null)
              : (plan.monthlyPrice ?? null);
            const normalPrice = annual
              ? (plan.normalMonthly ? Math.round(plan.normalMonthly * 0.85) : null)
              : plan.normalMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: cardIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col"
              >
                {/* "Most popular" floating banner above center card */}
                {plan.topTag && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
                    <div
                      className="px-6 py-2 rounded-t-2xl font-bold text-[13px] text-white"
                      style={{ background: "linear-gradient(135deg, #00C2A8, #5B8DEF)" }}
                    >
                      {plan.topTag}
                    </div>
                  </div>
                )}

                <motion.div
                  whileHover={plan.dark ? {} : { y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col flex-1 rounded-3xl overflow-hidden ${plan.topTag ? "rounded-tl-none rounded-tr-none" : ""}`}
                  style={plan.dark ? {
                    background: "linear-gradient(160deg, #0E1726 0%, #1A2640 100%)",
                    boxShadow: "0 0 0 2px rgba(0,194,168,0.35), 0 24px 60px rgba(14,23,38,0.22)",
                  } : {
                    background: "#FFFFFF",
                    border: "1px solid rgba(14,23,38,0.08)",
                    boxShadow: "0 4px 24px rgba(14,23,38,0.05)",
                  }}
                >
                  {/* Card body */}
                  <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">

                    {/* Top row: badge + icon */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[9.5px] font-extrabold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${plan.badgeBg}`}>
                        {plan.badge}
                      </span>
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-[17px] shadow-sm"
                        style={{ background: `${plan.iconBg}20`, border: `1px solid ${plan.iconBg}30` }}
                      >
                        {plan.icon}
                      </div>
                    </div>

                    {/* Name + tagline */}
                    <div>
                      <h3 className={`font-headline font-extrabold text-[1.65rem] leading-tight ${plan.dark ? "text-white" : "text-[#0E1726]"}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-[12.5px] mt-1 ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price block */}
                    {price !== null ? (
                      <div>
                        {/* Normal/crossed price + discount badge */}
                        {normalPrice && (
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[13px] line-through ${plan.dark ? "text-slate-500" : "text-slate-400"}`}>
                              Normal: {formatINR(normalPrice)}/month
                            </span>
                            {plan.discountLabel && (
                              <span
                                className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white"
                                style={{ background: "linear-gradient(135deg, #7C3AED, #9333EA)" }}
                              >
                                - {plan.discountLabel}
                              </span>
                            )}
                          </div>
                        )}
                        {/* Main price */}
                        <div className={`flex items-baseline gap-1.5 ${plan.dark ? "text-white" : "text-[#0E1726]"}`}>
                          <span className="text-[1.3rem] font-bold">₹</span>
                          <motion.span
                            key={`${plan.id}-${annual}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="font-headline font-extrabold text-[3.2rem] leading-none tabular-nums"
                          >
                            {price.toLocaleString("en-IN")}
                          </motion.span>
                          <span className={`text-[13px] font-medium ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>/mo</span>
                        </div>
                        {/* Cancel anytime pill */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span
                            className="text-[10.5px] font-bold px-3 py-1 rounded-full"
                            style={plan.dark
                              ? { background: "rgba(0,194,168,0.15)", color: "#00C2A8", border: "1px solid rgba(0,194,168,0.25)" }
                              : { background: "rgba(14,23,38,0.06)", color: "#475569", border: "1px solid rgba(14,23,38,0.1)" }
                            }
                          >
                            CANCEL ANYTIME
                          </span>
                          {plan.saveLabel && (
                            <span
                              className="text-[10.5px] font-bold px-3 py-1 rounded-full"
                              style={{ background: "#FFF7ED", color: "#C2410C", border: "1px solid #FED7AA" }}
                            >
                              {plan.saveLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={`font-headline font-extrabold text-[2.8rem] leading-none ${plan.dark ? "text-white" : "text-[#0E1726]"}`}>
                          Custom
                        </div>
                        <p className={`text-[12.5px] mt-1 ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>
                          Based on your requirements
                        </p>
                        <span
                          className="inline-block mt-2.5 text-[10.5px] font-bold px-3 py-1 rounded-full"
                          style={{ background: "rgba(14,23,38,0.06)", color: "#475569", border: "1px solid rgba(14,23,38,0.1)" }}
                        >
                          ENTERPRISE AGREEMENTS
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className={`text-[13px] leading-relaxed ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>
                      {plan.desc}
                    </p>

                    {/* Divider */}
                    <div className={`h-px ${plan.dark ? "bg-white/8" : "bg-slate-100"}`} />

                    {/* Features */}
                    <div className="flex flex-col gap-2.5">
                      {plan.everythingIn && (
                        <p className={`text-[10.5px] font-extrabold uppercase tracking-widest mb-1 ${plan.dark ? "text-secondary" : "text-secondary"}`}>
                          {plan.everythingIn}
                        </p>
                      )}
                      {plan.features.map((f, fi) => (
                        <motion.div
                          key={f}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: cardIdx * 0.05 + fi * 0.04 }}
                          className="flex items-start gap-2.5"
                        >
                          <span
                            className="material-symbols-outlined text-[16px] flex-shrink-0 mt-0.5"
                            style={{
                              color: "#00C2A8",
                              fontVariationSettings: '"FILL" 1',
                            }}
                          >
                            check_circle
                          </span>
                          <span className={`text-[13px] leading-snug ${plan.dark ? "text-slate-300" : "text-slate-600"}`}>
                            {f}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Add-on note */}
                    <div className={`flex items-center gap-2 pt-3 border-t ${plan.dark ? "border-white/8" : "border-slate-100"} mt-auto`}>
                      <span className="material-symbols-outlined text-[14px] flex-shrink-0 text-slate-400">info</span>
                      <span className={`text-[12px] ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{plan.addOn}</span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className={`px-6 sm:px-7 pb-6 sm:pb-7 pt-0`}>
                    <button
                      data-cursor="cta"
                      onClick={createRipple}
                      className={`relative overflow-hidden w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-[14px] transition-all group hover:-translate-y-0.5 active:scale-[0.98] ${
                        plan.dark
                          ? "bg-secondary text-primary shadow-[0_4px_24px_rgba(0,194,168,0.35)]"
                          : plan.id === "enterprise"
                          ? "bg-[#0E1726] text-white hover:bg-[#1A2640] shadow-md"
                          : "bg-[#0E1726] text-white hover:bg-[#1A2640] shadow-md"
                      }`}
                    >
                      {ripples.map(r => (
                        <span
                          key={r.id}
                          className="ripple-effect pointer-events-none"
                          style={{ left: r.x, top: r.y, background: "rgba(255,255,255,0.2)" }}
                        />
                      ))}
                      <span className="relative z-10">{plan.cta}</span>
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform duration-200 relative z-10">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[12.5px] text-slate-400 mt-10">
          All prices in Indian Rupees (INR) · GST extra · 24/7 AI support included · No setup fees
        </p>
      </div>
    </section>
  );
}
