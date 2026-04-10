export default function Home() {
  return (
    <>
      {/* ── Top Navigation ── */}
      <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-primary font-headline">
            Aura Clinical
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-on-surface-variant font-medium hover:text-primary transition-all"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="text-on-surface-variant font-medium hover:text-primary transition-all"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="text-on-surface-variant font-medium hover:text-primary transition-all"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button
              id="nav-book-demo"
              className="bg-primary-container text-on-primary px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-[0.99] transition-all"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden min-h-[921px] flex items-center px-8">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div className="z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-medium text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                Voice AI Live in 12+ Indian Languages
              </div>

              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight text-primary leading-[1.1]">
                Never Miss a Patient Call — in{" "}
                <span className="text-secondary italic">any language</span>
              </h1>

              <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
                The AI-powered multilingual triage system designed specifically
                for Indian hospitals. Respond instantly in{" "}
                <span className="font-semibold text-primary">
                  Hindi, Tamil, Telugu, and more.
                </span>
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  id="hero-book-demo"
                  className="bg-primary-container text-on-primary px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-95 shadow-lg active:scale-[0.98] transition-all"
                >
                  Book a Demo
                </button>
                <button
                  id="hero-how-it-works"
                  className="bg-surface-container-highest text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-surface-variant transition-all"
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/5 rounded-[2rem] blur-3xl"></div>
              <div className="relative bg-surface-container-lowest p-4 rounded-[2rem] shadow-2xl overflow-hidden border border-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeyYg0ZEXVdTFxqyCQiWxkGIa9kSScMf8QicxBkoYwjXz2IBb-tzNmvXbE-Dk3rnNAqJ2i--hn1hSUEEdBeEGgncZ_ZqTtvHtZ2QjM8nmLbzK-Yx-CCLanZAY0KOV8FEDroyD086-tdBtO8KNVjx52aFAH2u-pERONIWtBeyyB4yz5uLxmYtBLQH8YRUSauPsm5b5_mG9N-UF-SOfxpxzZWne38x4nLH2jC5zG1QWQiv2JA7Tv_8iMSz75rI3uo-vt03qf1brWbW5t"
                  alt="Modern minimalist hospital reception desk with soft natural light and clean white architectural lines"
                  className="rounded-[1.5rem] w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-xl space-y-3 max-w-xs self-end mb-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">
                        record_voice_over
                      </span>
                      <p className="text-sm font-bold text-primary">
                        Incoming Call...
                      </p>
                    </div>
                    <p className="text-xs text-on-surface-variant italic">
                      &ldquo;नमस्ते, मुझे कार्डियोलॉजी में अपॉइंटमेंट
                      चाहिए...&rdquo;
                    </p>
                    <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-3/4"></div>
                    </div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-secondary">
                      AI Triage Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem Section: Bento Grid ── */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">
                The Challenge
              </h2>
              <h3 className="text-4xl font-headline font-bold text-primary">
                Stop Losing Patients to the Dial Tone
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 – wide */}
              <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-4xl text-error mb-6 block">
                    call_missed
                  </span>
                  <h4 className="text-2xl font-bold text-primary mb-4">
                    Missed Calls = Lost Revenue
                  </h4>
                  <p className="text-on-surface-variant text-lg leading-relaxed">
                    During peak hours, 40% of patient calls go unanswered,
                    leading to appointment leakage and poor hospital perception.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <div className="px-4 py-2 bg-error/10 text-error rounded-lg text-sm font-bold">
                    40% Leakage
                  </div>
                  <div className="px-4 py-2 bg-error/10 text-error rounded-lg text-sm font-bold">
                    High Drop-off
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-primary-container text-on-primary p-10 rounded-[2rem]">
                <span className="material-symbols-outlined text-4xl text-secondary-fixed mb-6 block">
                  translate
                </span>
                <h4 className="text-2xl font-bold mb-4">Language Barrier</h4>
                <p className="text-on-primary-container text-lg leading-relaxed">
                  India has 22 official languages. Standard systems only support
                  English, alienating 80% of your potential patients.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-10 rounded-[2rem]">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 block">
                  group_remove
                </span>
                <h4 className="text-2xl font-bold text-primary mb-4">
                  Overloaded Staff
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Front-desk staff are overwhelmed by repetitive queries about
                  lab timings and billing, reducing clinical efficiency.
                </p>
              </div>

              {/* Card 4 – wide */}
              <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] flex items-center gap-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKw3EToMB4Uk3_rDJ0s-JukE4bh9RO9qSvm0VUEzWLXbhboqC7Y2m4BB7nXbU_opYH8rzEeZrCfNl1SgtAQfcVtWJf4N3YYPtMYcOXZjECaUGZyKznEJrlWLLPWt_tEsV-O_e_c3skxhFr28FXp2LDrAvAqTqHm3GFgJZHAndFvVzgb2ZQpF31gNHMIoQ4KB0c6An-4IkkYNHcHcOWQ6n3DuljFBQh5EOG9IVJ-73SrrTvOkS63KwsdA_S6-4B24KlIk29aP7opRUj"
                  alt="Doctor looking at a digital tablet with medical charts in a bright modern hospital room"
                  className="hidden lg:block w-48 h-48 rounded-2xl object-cover flex-shrink-0"
                />
                <div>
                  <h4 className="text-2xl font-bold text-primary mb-4">
                    Booking Inefficiencies
                  </h4>
                  <p className="text-on-surface-variant text-lg">
                    Manual booking leads to double-scheduling and missing
                    crucial patient data during the initial intake phase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Solution Section ── */}
        <section className="py-24 px-8 overflow-hidden" id="solutions">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            {/* Left copy */}
            <div className="lg:w-1/2">
              <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">
                The Solution
              </h2>
              <h3 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-8 leading-tight">
                Intelligent Triage that Speaks the Patient&apos;s Heart
              </h3>
              <ul className="space-y-8">
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-2">
                      Instant Response
                    </h5>
                    <p className="text-on-surface-variant">
                      Zero wait time. Every call is answered on the first ring,
                      24 hours a day, 7 days a week.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-2">
                      Intent Recognition
                    </h5>
                    <p className="text-on-surface-variant">
                      Advanced NLP identifies if the patient needs an
                      appointment, wants to check a lab report, or has a billing
                      query.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">route</span>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-2">
                      Seamless Routing
                    </h5>
                    <p className="text-on-surface-variant">
                      Calls are intelligently routed to the right OPD or
                      diagnostic wing after gathering preliminary patient data.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: live triage mockup */}
            <div className="lg:w-1/2 relative">
              <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100">
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">
                          Patient: Mr. Ramesh
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Calling from: Bangalore
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-secondary-container/50 text-secondary text-[10px] font-bold rounded">
                      LIVE TRIAGE
                    </span>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-xl">
                    <p className="text-xs font-semibold text-secondary uppercase mb-2">
                      AI Response (Kannada)
                    </p>
                    <p className="text-sm italic text-primary">
                      &ldquo;ನಮಸ್ಕಾರ, ಔರಾ ಕ್ಲಿನಿಕಲ್‌ಗೆ ಸ್ವಾಗತ. ಇಂದು ನಾನು
                      ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        check_circle
                      </span>
                      <p className="text-xs font-medium text-on-surface-variant">
                        Language Identified: Kannada
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        check_circle
                      </span>
                      <p className="text-xs font-medium text-on-surface-variant">
                        Intent: Appointment (Orthopedics)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">
                        check_circle
                      </span>
                      <p className="text-xs font-medium text-on-surface-variant">
                        Action: Transferred to Dr. Rao&apos;s Desk
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-24 px-8 bg-primary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-3xl lg:text-4xl font-headline font-bold text-white mb-4">
                A Seamless 4-Step Journey
              </h3>
              <p className="text-primary-fixed-dim max-w-2xl mx-auto">
                From dial to delight — how Aura transforms patient
                communication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

              {[
                {
                  icon: "call",
                  step: "1. Patient Calls",
                  desc: "The patient dials your main hospital number or a dedicated helpline.",
                },
                {
                  icon: "forum",
                  step: "2. AI Responds",
                  desc: "AI greets them in the language they speak, naturally and empathetically.",
                },
                {
                  icon: "adjust",
                  step: "3. Identifies Intent",
                  desc: "It analyzes the need—booking, query, or report status—accurately.",
                },
                {
                  icon: "verified_user",
                  step: "4. Resolves or Routes",
                  desc: "The call is either resolved by the AI or routed to the correct department.",
                },
              ].map(({ icon, step, desc }) => (
                <div key={step} className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center text-secondary-fixed text-4xl mb-8 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-4xl">
                      {icon}
                    </span>
                  </div>
                  <h5 className="text-xl font-bold text-white mb-3">{step}</h5>
                  <p className="text-primary-fixed-dim text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="py-24 px-8" id="features">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">
                  Capabilities
                </h2>
                <h3 className="text-4xl font-headline font-bold text-primary max-w-lg">
                  Advanced Voice Technology Built for Healthcare
                </h3>
              </div>
              <button
                id="explore-features"
                className="bg-secondary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                Explore All Features
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "schedule",
                  title: "24/7 Availability",
                  desc: "After-hours support for emergency routing and morning appointment bookings.",
                },
                {
                  icon: "cloud_done",
                  title: "Zero IT Overhead",
                  desc: "Cloud-based deployment. No expensive servers or technical staff required onsite.",
                },
                {
                  icon: "calendar_month",
                  title: "Smart Scheduling",
                  desc: "Directly syncs with your Hospital Management System (HMS) for real-time booking.",
                },
                {
                  icon: "hub",
                  title: "Intelligent Routing",
                  desc: "Routes high-priority calls to specific extensions based on the patient's concern.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-8 bg-surface-container-low rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
                >
                  <span className="material-symbols-outlined text-4xl text-secondary mb-6 block">
                    {icon}
                  </span>
                  <h5 className="text-xl font-bold text-primary mb-4">
                    {title}
                  </h5>
                  <p className="text-on-surface-variant text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Results / Impact ── */}
        <section className="py-24 px-8 bg-secondary-container/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { stat: "60%", label: "Reduction in Missed Calls" },
                { stat: "95%", label: "Patient Satisfaction" },
                { stat: "30%", label: "Staff Workload Decrease" },
                { stat: "12+", label: "Languages Supported" },
              ].map(({ stat, label }) => (
                <div key={label} className="bg-white p-8 rounded-3xl shadow-sm">
                  <div className="text-4xl font-headline font-extrabold text-secondary mb-2">
                    {stat}
                  </div>
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div>
              <h3 className="text-4xl font-headline font-bold text-primary mb-6">
                Proven Clinical Impact
              </h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Aura Clinical isn&apos;t just about efficiency; it&apos;s about
                accessibility. By removing language barriers and ensuring every
                call is answered, we help hospitals provide better care and grow
                their patient base.
              </p>

              <div className="p-6 bg-white rounded-2xl border-l-4 border-secondary flex gap-4 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWubhyLX20I3Pgo6jz8skpxa0WWjO0mK5x5Gjs5PgVWj9WKvEsQNMaJpRycyyNpLHySBK3NWck5bO7ylDZrE2WzLUVyeYgrw59uVomtWgen50AyMj6rPLORdMjuCb-xlbdmQagiH7LPrHQFnDNR8gW4lqpLicVBurFfsFE_CQyHP4i2LsOXIGqfNW8w3LwFCBVyiiWNNn86ggqY37xCf1yQ9gFsIEMYesIulve4PdPSnbrA8GGFvvVypwjHTAyyBGZobXumhDgVZtH"
                  alt="Dr. Ananya Sharma – Metro Multispeciality"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="italic text-primary mb-2">
                    &ldquo;Aura has transformed our reception. We no longer
                    worry about language barriers during morning peak
                    hours.&rdquo;
                  </p>
                  <p className="text-sm font-bold text-secondary">
                    — Dr. Ananya Sharma, Metro Multispeciality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 px-8">
          <div className="max-w-5xl mx-auto hero-gradient rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
              <span className="material-symbols-outlined text-[10rem]">
                waves
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl lg:text-5xl font-headline font-extrabold mb-6">
                Upgrade Your Hospital Front Desk with AI
              </h3>
              <p className="text-xl text-primary-fixed mb-10 max-w-2xl mx-auto">
                Join the 50+ hospitals already providing a seamless,
                multilingual calling experience to their patients.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  id="cta-book-demo"
                  className="bg-white text-primary px-10 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-all shadow-xl"
                >
                  Book a Demo Now
                </button>
                <button
                  id="cta-contact-sales"
                  className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-100 w-full py-12 px-8">
        <div className="bg-slate-200 h-px w-full mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="text-lg font-bold text-primary font-headline">
              Aura Clinical
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 Aura Clinical AI. Precision Triage Systems.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-primary font-bold text-sm mb-2">Company</h6>
            {["About Us", "Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-primary hover:underline decoration-secondary underline-offset-4 text-sm transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-primary font-bold text-sm mb-2">Solutions</h6>
            {["Hospital OPD", "Lab Reports", "Diagnostics"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-primary hover:underline decoration-secondary underline-offset-4 text-sm transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h6 className="text-primary font-bold text-sm mb-2">Support</h6>
            {["Documentation", "Contact Support"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-primary hover:underline decoration-secondary underline-offset-4 text-sm transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                aria-label="Website"
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  public
                </span>
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-slate-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  alternate_email
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
