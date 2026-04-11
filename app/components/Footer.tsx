const COLS = {
  Product:   ["AI Voice Agent", "Multilingual Triage", "Smart Scheduling", "Analytics Dashboard", "Integrations"],
  Solutions: ["Hospital OPD", "Diagnostic Labs", "Pharmacy Helpline", "Emergency Routing", "Telemedicine"],
  Company:   ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
  Resources: ["Documentation", "API Reference", "Help Center", "Status Page", "Security"],
};

const SOCIALS = [
  { icon: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  { icon: "twitter",  label: "Twitter",  color: "#1D9BF0" },
  { icon: "youtube",  label: "YouTube",  color: "#FF0000" },
];

export default function Footer() {
  return (
    <footer style={{ background: "linear-gradient(180deg, #0F172A 0%, #0C1A2E 100%)" }}>
      {/* Teal top divider */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #0D9488 30%, #5EEAD4 60%, transparent 100%)" }} />

      <div className="section-px max-w-7xl mx-auto pt-12 sm:pt-16 pb-8 sm:pb-10">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-[0_2px_12px_rgba(13,148,136,0.4)]">
                <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>graphic_eq</span>
              </div>
              <span className="text-[16px] font-extrabold text-white font-headline">Aura Clinical</span>
            </a>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              AI-powered multilingual voice triage for Indian hospitals. Every patient call, answered.
            </p>
            {/* Compliance badges */}
            <div className="flex gap-2 flex-wrap mt-1">
              {["HIPAA", "ISO 27001", "SOC 2"].map(b => (
                <span key={b} className="text-[10.5px] font-bold px-2.5 py-1 rounded-md bg-secondary/15 text-teal-300 border border-secondary/25">
                  {b}
                </span>
              ))}
            </div>
            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {SOCIALS.map(({ icon, label, color }) => (
                <a key={label} href="#" aria-label={label}
                  className="footer-social w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-slate-400 hover:border-white/25 transition-all duration-200"
                  style={{ "--hover-color": color } as React.CSSProperties}>
                  <span className="material-symbols-outlined text-[16px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([group, links]) => (
            <div key={group}>
              <h6 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.14em] mb-4">{group}</h6>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-slate-400 hover:text-teal-400 transition-colors duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-6 sm:mb-7" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-slate-500">© 2025 Aura Clinical AI Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[12px] text-slate-500 hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="text-[12px] text-slate-500 hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="text-[12px] text-slate-500 hover:text-teal-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
