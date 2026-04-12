/* Value props — 3-col "Why Xyras" section, like Freshworks homepage */
const VALUES = [
  {
    icon: "call_missed",
    color: "text-rose-500",
    bg:    "bg-rose-50",
    title: "40% of calls go unanswered",
    desc:  "During peak hours, missed calls mean missed appointments and lost patient trust. Xyras answers every single one.",
  },
  {
    icon: "translate",
    color: "text-secondary",
    bg:    "bg-secondary/8",
    title: "Language is a barrier, not a limit",
    desc:  "Most hospital phone systems only support English. Xyras speaks to patients in their mother tongue — instantly.",
  },
  {
    icon: "group_remove",
    color: "text-amber-500",
    bg:    "bg-amber-50",
    title: "Staff burnt out on repeat queries",
    desc:  "Appointment timings, lab reports, billing — Xyras handles all of it so your front desk can focus on patients.",
  },
];

export default function ProblemSection() {
  return (
    <section className="section-px section-py bg-white" id="solutions">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-secondary font-semibold text-[13px] uppercase tracking-[0.18em] mb-3">Why Xyras</p>
          <h2 className="font-headline font-extrabold text-primary leading-tight
                         text-[2rem] sm:text-[2.6rem] lg:text-[3rem] mb-4">
            The problems every hospital faces
          </h2>
          <p className="text-on-surface-variant text-[15px] sm:text-[17px] leading-relaxed">
            Patient experience starts before they arrive. Xyras ensures that first call is perfect.
          </p>
        </div>

        {/* 3-col grid: 1 col mobile, 3 col tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map(({ icon, color, bg, title, desc }) => (
            <div key={title} className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl border border-outline-variant bg-surface-container-low
                                        hover:shadow-[0_4px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-[24px] ${color}`}>{icon}</span>
              </div>
              <h3 className="font-headline font-bold text-primary text-[18px] sm:text-[20px] leading-snug">{title}</h3>
              <p className="text-on-surface-variant text-[14px] sm:text-[15px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
