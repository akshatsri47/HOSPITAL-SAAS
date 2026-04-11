/* Testimonials + stats — Zendesk-style */
const STATS = [
  { n: "60%",  desc: "Fewer missed calls"       },
  { n: "95%",  desc: "Patient satisfaction"     },
  { n: "30%",  desc: "Less front-desk workload" },
  { n: "12+",  desc: "Languages"                },
];

const TESTIMONIALS = [
  {
    quote: "Aura has completely changed how we handle morning rush. We used to miss 30-40% of calls before 9AM. Now every call is answered immediately in the patient's own language.",
    name:  "Dr. Ananya Sharma",
    role:  "Medical Director",
    org:   "Metro Multispeciality, Bangalore",
    avatar:"https://lh3.googleusercontent.com/aida-public/AB6AXuDWubhyLX20I3Pgo6jz8skpxa0WWjO0mK5x5Gjs5PgVWj9WKvEsQNMaJpRycyyNpLHySBK3NWck5bO7ylDZrE2WzLUVyeYgrw59uVomtWgen50AyMj6rPLORdMjuCb-xlbdmQagiH7LPrHQFnDNR8gW4lqpLicVBurFfsFE_CQyHP4i2LsOXIGqfNW8w3LwFCBVyiiWNNn86ggqY37xCf1yQ9gFsIEMYesIulve4PdPSnbrA8GGFvvVypwjHTAyyBGZobXumhDgVZtH",
  },
  {
    quote: "Our Hindi and Kannada-speaking patients were struggling to communicate. Aura made them feel respected from the first call. Our NPS jumped 22 points in two months.",
    name:  "Priya Menon",
    role:  "Head of Operations",
    org:   "Sunrise Hospitals, Chennai",
    avatar:"https://lh3.googleusercontent.com/aida-public/AB6AXuDWubhyLX20I3Pgo6jz8skpxa0WWjO0mK5x5Gjs5PgVWj9WKvEsQNMaJpRycyyNpLHySBK3NWck5bO7ylDZrE2WzLUVyeYgrw59uVomtWgen50AyMj6rPLORdMjuCb-xlbdmQagiH7LPrHQFnDNR8gW4lqpLicVBurFfsFE_CQyHP4i2LsOXIGqfNW8w3LwFCBVyiiWNNn86ggqY37xCf1yQ9gFsIEMYesIulve4PdPSnbrA8GGFvvVypwjHTAyyBGZobXumhDgVZtH",
  },
  {
    quote: "The ROI was clear in the first week. Fewer staff hours on phone queues, zero missed emergency contacts, and patients booking their own appointments in Telugu. Incredible.",
    name:  "Rajan Pillai",
    role:  "CEO",
    org:   "Lifeline Health Group, Hyderabad",
    avatar:"https://lh3.googleusercontent.com/aida-public/AB6AXuDWubhyLX20I3Pgo6jz8skpxa0WWjO0mK5x5Gjs5PgVWj9WKvEsQNMaJpRycyyNpLHySBK3NWck5bO7ylDZrE2WzLUVyeYgrw59uVomtWgen50AyMj6rPLORdMjuCb-xlbdmQagiH7LPrHQFnDNR8gW4lqpLicVBurFfsFE_CQyHP4i2LsOXIGqfNW8w3LwFCBVyiiWNNn86ggqY37xCf1yQ9gFsIEMYesIulve4PdPSnbrA8GGFvvVypwjHTAyyBGZobXumhDgVZtH",
  },
];

export default function ImpactSection() {
  return (
    <section className="section-px section-py bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-secondary font-semibold text-[13px] uppercase tracking-[0.18em] mb-3">Results</p>
          <h2 className="font-headline font-extrabold text-primary leading-tight
                         text-[2rem] sm:text-[2.6rem] lg:text-[3rem]">
            Hospitals that chose Aura don&apos;t look back
          </h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {STATS.map(({ n, desc }) => (
            <div key={desc}
              className="text-center py-6 sm:py-8 px-4 bg-secondary/5 rounded-2xl border border-secondary/10">
              <div className="font-headline font-extrabold text-secondary text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem] leading-none mb-2">
                {n}
              </div>
              <p className="text-[12px] sm:text-[13px] font-semibold text-on-surface-variant uppercase tracking-wide">{desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonials: 1-col mobile, 3-col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map(({ quote, name, role, org, avatar }) => (
            <div key={name}
              className="flex flex-col gap-5 p-6 sm:p-7 bg-surface-container-low rounded-2xl border border-outline-variant
                         hover:shadow-card hover:-translate-y-0.5 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({length:5}).map((_,i) => (
                  <span key={i} className="material-symbols-outlined text-amber-400 text-[18px]" style={{fontVariationSettings:'"FILL" 1'}}>star</span>
                ))}
              </div>
              <p className="text-[14px] sm:text-[15px] text-on-surface-variant leading-[1.75] flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-outline-variant">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatar} alt={name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary/20" />
                <div>
                  <p className="text-[13px] font-bold text-primary">{name}</p>
                  <p className="text-[11.5px] text-on-surface-variant">{role} · {org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
