"use client";

import { useEffect, useRef, useState } from "react";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="section-px section-py fade-up-section" id="pricing"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-dark-cta rounded-2xl sm:rounded-3xl overflow-hidden relative px-8 sm:px-16 lg:px-24 py-14 sm:py-20 text-center">

          {/* Decorative glows */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-secondary/20 blur-[80px] pointer-events-none animate-pulse-slow" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-teal-300/10 blur-[60px] pointer-events-none" />

          {/* Icon accents */}
          <div className="absolute top-6 left-6 opacity-[0.06] pointer-events-none select-none">
            <span className="material-symbols-outlined text-white" style={{ fontSize: "72px", fontVariationSettings: '"FILL" 1' }}>mic</span>
          </div>
          <div className="absolute bottom-6 right-6 opacity-[0.06] pointer-events-none select-none">
            <span className="material-symbols-outlined text-white" style={{ fontSize: "64px", fontVariationSettings: '"FILL" 1' }}>graphic_eq</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-7 sm:mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-secondary-fixed" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary-fixed" />
            </span>
            <span className="text-[11px] sm:text-[12px] font-semibold text-white">50+ hospitals onboarded</span>
          </div>

          {/* Headline */}
          <h2 className="font-headline font-extrabold text-white leading-tight mb-5
                         text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem]">
            Start answering every patient call today
          </h2>
          <p className="text-slate-400 leading-[1.8] mb-9 sm:mb-10 mx-auto
                        text-[15px] sm:text-[16px] lg:text-[17px] max-w-[40ch]">
            Setup takes 48 hours. No hardware. No engineers. Cancel any time.
          </p>

          {/* CTAs / Email Form */}
          {success ? (
            <div className="bg-secondary/10 border border-secondary/30 rounded-2xl py-6 px-6 max-w-md mx-auto animate-fade-in">
              <div className="text-secondary mb-3 flex justify-center">
                <span className="material-symbols-outlined text-[40px]">check_circle</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Request Received!</h3>
              <p className="text-slate-300 text-[15px] leading-relaxed">
                We'll reach out to <strong className="text-white">{email}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full sm:w-64 bg-white/10 border border-white/20 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all text-[15px] placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 active:scale-[0.98] transition-all shadow-[0_8px_28px_rgba(13,148,136,0.5)] text-[15px] px-9 py-4 disabled:opacity-75 disabled:active:scale-100 flex items-center justify-center min-w-[160px]"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Request Demo"
                  )}
                </button>
              </form>
              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            </div>
          )}

          <p className="text-slate-500 text-[12px] mt-6 font-medium">
            No credit card required · HIPAA compliant · 99.9% uptime SLA
          </p>
        </div>
      </div>
    </section>
  );
}
