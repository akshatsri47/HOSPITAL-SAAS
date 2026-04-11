const COLS = {
  Product:      ["AI Voice Agent", "Multilingual Triage", "Smart Scheduling", "Analytics Dashboard", "Integrations"],
  Solutions:    ["Hospital OPD", "Diagnostic Labs", "Pharmacy Helpline", "Emergency Routing", "Telemedicine"],
  Company:      ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
  Resources:    ["Documentation", "API Reference", "Help Center", "Status Page", "Security"],
};

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="section-px max-w-7xl mx-auto pt-12 sm:pt-16 pb-8 sm:pb-10">

        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">

          {/* Brand — full-width on mobile */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[17px]">graphic_eq</span>
              </div>
              <span className="text-[15px] font-extrabold text-primary font-headline">Aura Clinical</span>
            </a>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">
              AI-powered multilingual voice triage for Indian hospitals. Every patient call, answered.
            </p>
            {/* Compliance badges */}
            <div className="flex gap-2 flex-wrap mt-1">
              {["HIPAA", "ISO 27001", "SOC 2"].map(b => (
                <span key={b} className="text-[10.5px] font-bold px-2.5 py-1 rounded-md bg-secondary/8 text-secondary border border-secondary/15">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(COLS).map(([group, links]) => (
            <div key={group}>
              <h6 className="text-[11px] font-bold text-primary uppercase tracking-[0.14em] mb-4">{group}</h6>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-on-surface-variant hover:text-secondary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-outline-variant mb-6 sm:mb-7" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-on-surface-variant">© 2025 Aura Clinical AI Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[12px] text-on-surface-variant hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="text-[12px] text-on-surface-variant hover:text-secondary transition-colors">Terms</a>
            <a href="#" className="text-[12px] text-on-surface-variant hover:text-secondary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
