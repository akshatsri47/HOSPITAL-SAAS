/* Logo strip — auto-scrolling marquee, like Zendesk / Freshworks */
const HOSPITALS = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Narayana Health",
  "Medanta",
  "Aster DM Healthcare",
  "HCG Oncology",
  "KIMS Hospitals",
  "Manipal Hospitals",
  "Columbia Asia",
  "Yashoda Hospitals",
  "Rainbow Hospitals",
];

/* Duplicate for seamless loop */
const TRACK = [...HOSPITALS, ...HOSPITALS];

export default function LogoStrip() {
  return (
    <div className="border-y border-outline-variant bg-surface-container-low py-8 sm:py-10">
      <div className="section-px max-w-7xl mx-auto mb-6 sm:mb-7 text-center">
        <p className="text-[12px] sm:text-[13px] font-semibold text-on-surface-variant uppercase tracking-[0.18em]">
          Trusted by leading hospitals across India
        </p>
      </div>

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track animate-marquee">
          {TRACK.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-5 sm:mx-7 flex items-center gap-2 px-5 py-2.5
                         bg-white rounded-xl border border-outline-variant/60
                         shadow-[0_1px_4px_rgba(15,23,42,0.06)]"
            >
              <span className="material-symbols-outlined text-secondary text-[15px]">local_hospital</span>
              <span className="text-[13px] sm:text-[14px] font-semibold text-on-surface-variant whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
