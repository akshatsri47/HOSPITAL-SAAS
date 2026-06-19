"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const PLANS = [
  {
    id: "starter",
    badge: "CANCEL ANYTIME",
    name: "Starter",
    tagline: "For small teams starting with AI voice automation",
    priceText: "₹9,000",
    priceSub: "/mo",
    oldPrice: "₹12,000/mo",
    discount: "25% OFF",
    savings: "Save ₹3,000/mo",
    desc: "A focused starting point for teams ready to automate everyday customer calls without adding operational complexity.",
    everythingIn: "Starter includes:",
    features: [
      "AI call answering",
      "Basic appointment booking",
      "Lead capture",
      "Standard voice agent setup",
      "Basic analytics",
      "Email support",
    ],
    addOn: "Simple monthly plan with no long-term lock-in",
    cta: "Get Started",
    popular: false,
    dark: false,
  },
  {
    id: "growth",
    badge: "MOST POPULAR",
    name: "Growth",
    tagline: "For growing businesses that need more call volume and automation",
    priceText: "₹21,000",
    priceSub: "/mo",
    oldPrice: "₹35,000/mo",
    discount: "40% OFF",
    savings: "Save ₹14,000/mo",
    desc: "Built for scaling customer operations with higher capacity, richer automations, and connected business workflows.",
    everythingIn: "Everything in Starter, plus:",
    features: [
      "Higher call volume",
      "Multi-language support",
      "Advanced appointment booking",
      "CRM and webhook integrations",
      "WhatsApp and SMS follow-up ready",
      "Priority support",
      "Advanced analytics",
    ],
    addOn: "Priority onboarding and workflow optimization included",
    cta: "Start Growth Plan",
    popular: true,
    dark: true,
  },
  {
    id: "custom",
    badge: "ENTERPRISE AGREEMENTS",
    name: "Custom",
    tagline: "For high-volume teams with advanced workflow and integration needs",
    priceText: "Custom",
    priceSub: "Tailored commercial terms",
    oldPrice: null,
    discount: null,
    savings: null,
    desc: "A tailored voice-AI deployment designed around your call volume, infrastructure, security, and support requirements.",
    everythingIn: "Enterprise setup includes:",
    features: [
      "Custom call volume",
      "Custom AI voice workflow",
      "Dedicated onboarding",
      "CRM and calendar integration",
      "Custom language and accent requirements",
      "SLA and priority support",
      "Enterprise deployment options",
    ],
    addOn: "Custom agreements and deployment architecture",
    cta: "Talk to Us",
    popular: false,
    dark: false,
  },
] as const;

const FAQS = [
  {
    q: "How fast is the setup process?",
    a: "Under 48 hours. Since Xyras is fully cloud-native, you do not need physical telephone boxes, technical staff, or server infrastructure. We map your virtual lines instantly."
  },
  {
    q: "Does it support regional Indian languages?",
    a: "Yes! Xyras is globally multilingual, speaking Hindi, Tamil, Telugu, Kannada, Spanish, German, and 12+ other languages natively. It can even detect accents and language shifts mid-conversation."
  },
  {
    q: "Is our call and business data secure?",
    a: "Absolutely. Xyras is built to meet strict enterprise security frameworks, ensuring full SOC2 compliance. All database traffic operates over secure SSL socket lines."
  },
  {
    q: "Are there any long-term contract lock-ins?",
    a: "No. You can choose monthly or annual cycles, and cancel or adjust your subscription levels anytime directly from your dashboard."
  }
];

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState<typeof PLANS[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedPlan: activePlan?.name || "General Query",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to submit lead request.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to sales servers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0E1726] overflow-x-clip pt-20">
      <Navbar />

      <main className="flex-1">
        {/* HEADER SECTION */}
        <section className="section-px py-20 bg-gradient-to-b from-white to-[#F8FAFC] text-center relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#00C2A8]/5 to-transparent blur-[90px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#5B8DEF]/5 to-transparent blur-[100px] pointer-events-none z-0" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <span className="font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/10 border border-[#00C2A8]/20 px-3.5 py-1.5 rounded-md uppercase tracking-widest">
              Pricing Plans
            </span>
            <h1 className="font-headline font-extrabold text-[2.8rem] sm:text-[3.8rem] lg:text-[4.2rem] leading-[1.1] text-primary tracking-tight max-w-[20ch] mx-auto">
              SaaS pricing built for <span className="text-secondary font-headline italic font-bold">your scale.</span>
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[48ch] mx-auto">
              Empower your operations with 24/7 automated call coverage. Pick a plan or speak with our sales architects for custom integrations.
            </p>
          </div>
        </section>

        {/* PRICING CARDS SECTION */}
        <section className="section-px py-16 sm:py-20 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
              {PLANS.map((plan) => {
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-[28px] transition-all duration-500 hover:-translate-y-1 ${
                      plan.dark
                        ? "bg-[linear-gradient(155deg,#0B1424_0%,#10243A_58%,#073B3A_100%)] text-white border border-[#00C2A8]/70 shadow-[0_24px_70px_rgba(0,194,168,0.22)] md:-translate-y-3 md:hover:-translate-y-4"
                        : plan.id === "custom"
                        ? "bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FA_100%)] border border-[#0E1726]/10 shadow-[0_18px_45px_rgba(14,23,38,0.08)]"
                        : "bg-white border border-[#0E1726]/10 shadow-[0_16px_40px_rgba(14,23,38,0.07)]"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap rounded-full bg-gradient-to-r from-[#00C2A8] to-[#5B8DEF] px-5 py-2 text-[10px] font-extrabold tracking-[0.18em] text-white uppercase shadow-[0_8px_24px_rgba(0,194,168,0.35)]">
                        Most Popular
                      </div>
                    )}
                    {/* Card body */}
                    <div className="p-6 sm:p-7 lg:p-8 flex flex-col gap-5 flex-1 text-left overflow-hidden rounded-t-[28px]">
                      <span className={`self-start text-[9px] font-extrabold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full ${
                        plan.dark
                          ? "bg-white/10 text-teal-200 border border-white/10"
                          : plan.id === "custom"
                          ? "bg-[#0E1726] text-white"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}>
                        {plan.badge}
                      </span>

                      {/* Title & Tagline */}
                      <div>
                        <h3 className={`font-headline font-extrabold text-[2rem] sm:text-[2.25rem] leading-none ${plan.dark ? "text-white" : "text-[#0E1726]"}`}>
                          {plan.name}
                        </h3>
                        <p className={`text-[13px] mt-2 leading-relaxed ${plan.dark ? "text-slate-300" : "text-slate-500"}`}>
                          {plan.tagline}
                        </p>
                      </div>

                      {/* Price and discount badges */}
                      <div>
                        {plan.oldPrice && (
                          <p className={`text-[12px] line-through mb-1.5 ${plan.dark ? "text-slate-500" : "text-slate-400"}`}>
                            {plan.oldPrice}
                          </p>
                        )}
                        <div className={`flex items-end gap-1.5 ${plan.dark ? "text-white" : "text-[#0E1726]"}`}>
                          <span className={`font-headline font-extrabold leading-none ${
                            plan.priceText === "Custom" ? "text-[2.8rem]" : "text-[3rem] sm:text-[3.35rem]"
                          }`}>
                            {plan.priceText}
                          </span>
                          <span className={`text-[13px] font-semibold pb-1 ${plan.dark ? "text-slate-300" : "text-slate-500"}`}>
                            {plan.priceSub}
                          </span>
                        </div>
                        {(plan.discount || plan.savings) && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {plan.discount && (
                              <span className="rounded-full bg-gradient-to-r from-violet-600 to-purple-500 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-white shadow-sm">
                                {plan.discount}
                              </span>
                            )}
                            {plan.savings && (
                              <span className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-orange-700">
                                {plan.savings}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <p className={`text-[13px] leading-relaxed ${plan.dark ? "text-slate-300" : "text-slate-500"}`}>
                        {plan.desc}
                      </p>

                      {/* Divider */}
                      <div className={`h-px ${plan.dark ? "bg-white/10" : "bg-[#0E1726]/7"} my-1`} />

                      {/* Feature Checklist */}
                      <div className="flex flex-col gap-3">
                        <p className={`text-[10px] font-extrabold uppercase tracking-[0.16em] mb-1 ${plan.dark ? "text-teal-300" : "text-secondary"}`}>
                          {plan.everythingIn}
                        </p>
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2.5">
                            <span 
                              className="material-symbols-outlined text-[17px] flex-shrink-0 mt-0.5 text-secondary"
                              style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              check_circle
                            </span>
                            <span className={`text-[13px] leading-snug ${plan.dark ? "text-slate-200" : "text-slate-600"}`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic Addon Strip */}
                      <div className={`flex items-center gap-2 pt-4 border-t mt-auto ${plan.dark ? "border-white/10" : "border-[#0E1726]/7"}`}>
                        <span className={`material-symbols-outlined text-[15px] ${plan.dark ? "text-teal-300" : "text-slate-400"}`}>verified_user</span>
                        <span className={`text-[11.5px] ${plan.dark ? "text-slate-300" : "text-slate-500"}`}>
                          {plan.addOn}
                        </span>
                      </div>
                    </div>

                    {/* Booking CTA Button */}
                    <div className="px-6 sm:px-7 lg:px-8 pb-6 sm:pb-7 lg:pb-8 pt-2">
                      <button
                        onClick={() => {
                          setActivePlan(plan);
                          setSuccess(false);
                          setErrorMsg("");
                        }}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-[13px] uppercase tracking-wider transition-all group cursor-pointer shadow-sm ${
                          plan.dark
                            ? "bg-secondary text-[#07131F] hover:bg-teal-300 hover:scale-[1.01] shadow-[0_8px_28px_rgba(0,194,168,0.25)]"
                            : plan.id === "custom"
                            ? "bg-white border border-[#0E1726]/15 text-[#0E1726] hover:border-secondary hover:text-secondary"
                            : "bg-[#0E1726] text-white hover:bg-[#17243A]"
                        }`}
                      >
                        <span>{plan.cta}</span>
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-[12.5px] text-slate-400 mt-10">
              All tiers operate securely over HIPAA & SOC2 protocols. Cancel or scale plans dynamically.
            </p>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="section-px py-20 bg-white border-t border-[#0E1726]/5">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <span className="font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/10 border border-[#00C2A8]/20 px-3.5 py-1.5 rounded-md uppercase tracking-widest">
                Support Desk
              </span>
              <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] leading-tight tracking-tight mt-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-[#0E1726]/5 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-[14.5px] sm:text-[15.5px] text-[#0E1726] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className={`material-symbols-outlined text-[18px] text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        expand_more
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 text-[13.5px] leading-relaxed text-[#64748B] border-t border-[#0E1726]/3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* LEAD CAPTURE POPUP MODAL */}
      <AnimatePresence>
        {activePlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePlan(null)}
              className="absolute inset-0 bg-[#0E1726]/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#0E1726]/5 rounded-3xl p-6 sm:p-8 w-full max-w-[480px] shadow-2xl relative z-10 text-left overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#00C2A8]/2 via-transparent to-[#5B8DEF]/2" />

              <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-4.5 mb-6 relative z-10">
                <div>
                  <span className="font-mono text-[9px] font-bold text-secondary bg-[#00C2A8]/10 px-2.5 py-1 rounded uppercase tracking-wider">
                    {activePlan.badge}
                  </span>
                  <h4 className="font-headline font-bold text-[18px] text-[#0E1726] mt-2">
                    Activate {activePlan.name}
                  </h4>
                </div>
                <button
                  onClick={() => setActivePlan(null)}
                  className="w-8 h-8 rounded-full bg-[#0E1726]/5 hover:bg-[#0E1726]/10 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {!success ? (
                <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#F8FAFC] border border-[#0E1726]/8 rounded-xl px-4 py-3 text-[13.5px] text-primary focus:border-secondary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Business Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-[#F8FAFC] border border-[#0E1726]/8 rounded-xl px-4 py-3 text-[13.5px] text-primary focus:border-secondary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Contact Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#F8FAFC] border border-[#0E1726]/8 rounded-xl px-4 py-3 text-[13.5px] text-primary focus:border-secondary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Operational Requirements / Concurrencies</label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly describe your average daily call volumes & goals..."
                      className="w-full bg-[#F8FAFC] border border-[#0E1726]/8 rounded-xl px-4 py-3 text-[13.5px] text-primary focus:border-secondary focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[12px] font-bold text-rose-500">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary text-primary font-mono font-bold text-[12px] uppercase tracking-wider py-4 rounded-xl shadow-[0_6px_24px_rgba(0,194,168,0.2)] hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-6"
                  >
                    {loading ? (
                      <span className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <span className="material-symbols-outlined text-[15px]">bolt</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-4 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F0FDFA] border border-secondary flex items-center justify-center mx-auto shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[32px] animate-pulse">verified</span>
                  </div>
                  <h5 className="font-headline font-bold text-[18px] text-[#0E1726]">Setup Request Received</h5>
                  <p className="text-[#64748B] text-[13px] leading-relaxed max-w-[34ch] mx-auto">
                    We&apos;ve sent an acknowledgment email to <span className="font-semibold text-primary">{formData.email || "your inbox"}</span>. Our voice architects will connect with you within <strong>24 hours</strong>!
                  </p>
                  <button
                    onClick={() => setActivePlan(null)}
                    className="font-mono text-[11px] font-bold text-primary bg-[#0E1726]/5 hover:bg-[#0E1726]/10 px-5 py-2.5 rounded-full transition-all cursor-pointer mt-4"
                  >
                    Close Setup Window
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
