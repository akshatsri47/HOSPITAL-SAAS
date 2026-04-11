const STEPS = [
  { n: "01", icon: "call",              title: "Patient dials in",        desc: "Any time, day or night. No IVR menus, no hold music." },
  { n: "02", icon: "record_voice_over", title: "AI greets in their language", desc: "Language detected, patient welcomed within 800ms." },
  { n: "03", icon: "psychology",        title: "Intent understood",       desc: "Appointment, lab report, billing — 97% accuracy."    },
  { n: "04", icon: "verified_user",     title: "Resolved or routed",      desc: "Answered by AI or transferred to the right desk."    },
];

export default function HowItWorksSection() {
  return (
    <section className="section-px section-py bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-secondary font-semibold text-[13px] uppercase tracking-[0.18em] mb-3">How It Works</p>
          <h2 className="font-headline font-extrabold text-primary leading-tight
                         text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">
            Set up in 48 hours. Works forever.
          </h2>
        </div>

        {/* Steps: 2×2 mobile, 4-col desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative">

          {/* Arrow connectors desktop */}
          {[1,2,3].map(i => (
            <div key={i} className={`hidden lg:block absolute top-[2.75rem] h-px w-[calc(25%-3rem)] bg-gradient-to-r from-secondary/30 to-secondary/30`}
              style={{ left: `calc(${i * 25}% + 1.5rem)` }}
            />
          ))}

          {STEPS.map(({ n, icon, title, desc }) => (
            <div key={n} className="flex flex-col gap-4 sm:gap-5 group">
              {/* Number + icon box */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary/8 border border-secondary/15
                              flex items-center justify-center
                              group-hover:bg-secondary group-hover:border-secondary group-hover:shadow-lg
                              transition-all duration-300">
                <span className="material-symbols-outlined text-secondary text-[24px] sm:text-[26px]
                                 group-hover:text-white transition-colors duration-300">
                  {icon}
                </span>
                {/* Step label */}
                <span className="absolute -top-2.5 -right-2.5 bg-primary text-white text-[9.5px] font-extrabold
                                 w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {n}
                </span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-primary mb-1.5 text-[15px] sm:text-[16px] lg:text-[17px]">{title}</h3>
                <p className="text-on-surface-variant text-[13px] sm:text-[14px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <a href="#pricing"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-[14px] sm:text-[15px] px-8 py-4 rounded-xl
                       hover:bg-primary/90 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(15,23,42,0.2)]">
            Get started in 48 hours
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
