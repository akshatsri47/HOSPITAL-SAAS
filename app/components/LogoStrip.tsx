export default function LogoStrip() {
  return (
    <div className="border-y border-outline-variant bg-surface-container-low py-10 sm:py-12">
      <div className="section-px max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-10">

        {/* Left — label */}
        <p className="text-[12px] sm:text-[13px] font-semibold text-on-surface-variant uppercase tracking-[0.18em] text-center sm:text-left whitespace-nowrap">
          Powering the next generation of Indian hospitals
        </p>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-outline-variant/60 flex-shrink-0" />

        {/* Right — placeholder slots */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
          {["Your Hospital", "Your Clinic", "Your Health Group"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-secondary/40 bg-secondary/5"
            >
              <span className="material-symbols-outlined text-secondary/60 text-[15px]">add_circle</span>
              <span className="text-[12.5px] sm:text-[13px] font-semibold text-secondary/70 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA chip */}
        <a
          href="#pricing"
          className="flex-shrink-0 flex items-center gap-1.5 bg-secondary text-white font-bold text-[12px] sm:text-[13px] px-5 py-2.5 rounded-full
                     hover:bg-secondary/90 transition-all shadow-[0_4px_16px_rgba(13,148,136,0.35)] whitespace-nowrap"
        >
          Join first
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </a>

      </div>
    </div>
  );
}

