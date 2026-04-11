"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  { icon: "schedule",                 title: "24 / 7 Availability",   desc: "Handles emergency routing and pre-dawn bookings without extra staff.",            accent: "border-teal-400",   iconBg: "bg-teal-50",   iconColor: "text-teal-600" },
  { icon: "cloud_done",               title: "Zero IT Overhead",       desc: "Fully cloud-hosted. No hardware, no IT team, no maintenance.",                   accent: "border-indigo-400", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { icon: "calendar_month",           title: "Smart Scheduling",       desc: "Syncs with your HMS in real time for conflict-free appointment booking.",        accent: "border-teal-400",   iconBg: "bg-teal-50",   iconColor: "text-teal-600" },
  { icon: "hub",                      title: "Intelligent Routing",    desc: "Emergency calls escalate automatically to the right on-call desk.",              accent: "border-amber-400",  iconBg: "bg-amber-50",  iconColor: "text-amber-600" },
  { icon: "analytics",                title: "Live Analytics",         desc: "Call volumes, language splits, and resolution rates on one dashboard.",          accent: "border-indigo-400", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { icon: "security",                 title: "HIPAA Compliant",        desc: "End-to-end encrypted. Patient data never leaves your jurisdiction.",             accent: "border-teal-400",   iconBg: "bg-teal-50",   iconColor: "text-teal-600" },
  { icon: "integration_instructions", title: "EHR Integrations",       desc: "Works with Epic, Meditech, Athenahealth, Practo, eVitals out of the box.",       accent: "border-amber-400",  iconBg: "bg-amber-50",  iconColor: "text-amber-600" },
  { icon: "speed",                    title: "< 800ms Response",       desc: "Patients hear a response before the first ring ends. No wait, ever.",           accent: "border-indigo-400", iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
];

function useFadeUp(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in-view"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useFadeUp(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      ref={sectionRef}
      className="section-px section-py fade-up-section"
      id="features-all"
      style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
          <div>
            <p className="text-secondary font-semibold text-[13px] uppercase tracking-[0.18em] mb-3">Capabilities</p>
            <h2 className="font-headline font-extrabold text-primary leading-tight text-[2rem] sm:text-[2.6rem] max-w-lg">
              Everything your front desk needs — built in
            </h2>
          </div>
          <a href="#pricing"
            className="self-start sm:self-auto flex-shrink-0 border border-secondary text-secondary font-semibold text-[13.5px] px-5 py-2.5 rounded-lg
                       hover:bg-secondary hover:text-white transition-all">
            View all features →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FEATURES.map(({ icon, title, desc, accent, iconBg, iconColor }, i) => (
            <div
              key={title}
              className={`group bg-white rounded-xl p-5 sm:p-6 border border-slate-100 border-l-[3px] ${accent}
                         hover:border-l-[3px] hover:shadow-[0_8px_32px_rgba(13,148,136,0.12)]
                         hover:-translate-y-1.5 transition-all duration-300 cursor-default`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`mb-4 w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center
                              group-hover:scale-110 transition-transform duration-300`}>
                <span className={`material-symbols-outlined ${iconColor} text-[20px]`} style={{ fontVariationSettings: '"FILL" 1' }}>
                  {icon}
                </span>
              </div>
              <h3 className="font-bold text-primary text-[14px] sm:text-[15px] mb-2">{title}</h3>
              <p className="text-on-surface-variant text-[12.5px] sm:text-[13px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
