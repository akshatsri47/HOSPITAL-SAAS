const FEATURES = [
  { icon: "schedule",                 title: "24 / 7 Availability",     desc: "Handles emergency routing and pre-dawn bookings without extra staff." },
  { icon: "cloud_done",               title: "Zero IT Overhead",         desc: "Fully cloud-hosted. No hardware, no IT team, no maintenance." },
  { icon: "calendar_month",           title: "Smart Scheduling",         desc: "Syncs with your HMS in real time for conflict-free appointment booking." },
  { icon: "hub",                      title: "Intelligent Routing",      desc: "Emergency calls escalate automatically to the right on-call desk." },
  { icon: "analytics",                title: "Live Analytics",           desc: "Call volumes, language splits, and resolution rates on one dashboard." },
  { icon: "security",                 title: "HIPAA Compliant",          desc: "End-to-end encrypted. Patient data never leaves your jurisdiction." },
  { icon: "integration_instructions", title: "EHR Integrations",         desc: "Works with Epic, Meditech, Athenahealth, Practo, eVitals out of the box." },
  { icon: "speed",                    title: "< 800ms Response",         desc: "Patients hear a response before the first ring ends. No wait, ever." },
];

export default function FeaturesSection() {
  return (
    <section className="section-px section-py bg-surface-container-low" id="features-all">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
          <div>
            <p className="text-secondary font-semibold text-[13px] uppercase tracking-[0.18em] mb-3">Capabilities</p>
            <h2 className="font-headline font-extrabold text-primary leading-tight
                           text-[2rem] sm:text-[2.6rem] max-w-lg">
              Everything your front desk needs — built in
            </h2>
          </div>
          <a href="#pricing"
            className="self-start sm:self-auto flex-shrink-0 border border-secondary text-secondary font-semibold text-[13.5px] px-5 py-2.5 rounded-lg
                       hover:bg-secondary hover:text-white transition-all">
            View all features →
          </a>
        </div>

        {/* Grid: 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title}
              className="group bg-white rounded-xl p-5 sm:p-6 border border-slate-100
                         hover:border-secondary/30 hover:shadow-[0_8px_32px_rgba(13,148,136,0.1)]
                         hover:-translate-y-0.5 transition-all duration-300 cursor-default">
              <div className="mb-4 w-10 h-10 rounded-xl bg-secondary/8 flex items-center justify-center
                              group-hover:bg-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-secondary group-hover:text-white text-[20px] transition-colors duration-300">
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
