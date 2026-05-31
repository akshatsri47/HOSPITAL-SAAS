"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const DINING_RESERVATIONS = [
  { id: "table4", label: "Rohan Sen (4 Guests)", table: "Table 12 (Quiet Corner)", time: "08:00 PM", notes: "No nuts allergy", status: "RESERVED // Ticket Dispatched" },
  { id: "table2", label: "Neha Roy (2 Guests)", table: "Table 04 (Window View)", time: "09:00 PM", notes: "Anniversary Special", status: "RESERVED // Hostess Notified" },
  { id: "table8", label: "Dr. Kapoor (8 Guests)", table: "VIP Lounge Zone", time: "07:30 PM", notes: "Valet requested", status: "ROUTED // Event Coordinator" },
];

export default function RestaurantsPage() {
  const [activeRes, setActiveRes] = useState(DINING_RESERVATIONS[0]);
  const [logs, setLogs] = useState<string[]>([]);
  const [pulseCore, setPulseCore] = useState(false);

  useEffect(() => {
    setLogs([
      "SYSTEM // Inbound seating request packet identified.",
      `VOICE_AGENT // Party size verified: ${activeRes.label}`,
      `VOICE_AGENT // Dietary / Special Request notes: "${activeRes.notes}"`,
      `INTEGRATION // Querying floor plan for ${activeRes.table}...`,
      `STATUS // Seat locked: ${activeRes.status} at ${activeRes.time}.`,
    ]);
  }, [activeRes]);

  const triggerResSim = (item: typeof DINING_RESERVATIONS[0]) => {
    setActiveRes(item);
    setPulseCore(true);
    setTimeout(() => setPulseCore(false), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip pt-20">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="section-px py-20 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute top-[25%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#FF9F43]/8 to-transparent blur-[80px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#00C2A8]/6 to-transparent blur-[100px] pointer-events-none z-0" />

          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <span className="font-mono text-[10px] font-bold text-[#FF9F43] bg-[#FF9F43]/10 border border-[#FF9F43]/20 px-3.5 py-1.5 rounded-md uppercase tracking-widest">
              Xyras Solutions // Restaurants
            </span>
            <h1 className="font-headline font-extrabold text-[2.8rem] sm:text-[3.8rem] lg:text-[4.2rem] leading-[1.1] text-primary tracking-tight max-w-[22ch] mx-auto">
              Take reservations <span className="text-[#FF9F43] font-headline italic font-bold">automatically.</span>
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[50ch] mx-auto">
              AI voice agents that handle guest table bookings, note critical dietary restrictions, coordinate large group events, and update reservation rosters 24×7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="mailto:demo@xyras.ai?subject=Xyras Restaurant Voice AI Demo Request"
                className="w-full sm:w-auto bg-[#FF9F43] text-white font-mono font-bold text-[12px] uppercase tracking-wider px-8 py-4 rounded-xl text-center shadow-[0_6px_24px_rgba(255,159,67,0.25)] hover:scale-[1.02] transition-all"
              >
                Book Restaurant Demo
              </Link>
              <Link 
                href="/"
                className="w-full sm:w-auto border border-[#0E1726]/15 bg-[#0E1726]/5 text-[#0E1726] font-mono font-bold text-[12px] uppercase tracking-wider px-8 py-4 rounded-xl text-center hover:bg-[#0E1726]/10 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>

        {/* INTERACTIVE WIDGET SECTION */}
        <section className="section-px py-16 bg-white border-y border-[#0E1726]/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Widget Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-widest">
                Interactive Seating Simulator
              </span>
              <h2 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Simulate a table booking request.
              </h2>
              <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed">
                Choose a simulated guest below. Watch how Xyras checks real-time seat capacities, logs dining hours, and locks seating maps in the hostess system.
              </p>
              
              {/* Res selectors */}
              <div className="flex flex-col gap-2.5 pt-2">
                {DINING_RESERVATIONS.map((item) => {
                  const isActive = activeRes.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerResSim(item)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#F8FAFC] border-[#FF9F43] text-primary shadow-[0_2px_12px_rgba(255,159,67,0.05)]"
                          : "bg-white border-[#0E1726]/8 text-[#64748B] hover:border-[#0E1726]/20"
                      }`}
                    >
                      <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                      <span className="material-symbols-outlined text-[16px]" style={{ color: "#FF9F43" }}>
                        {isActive ? "radio_button_checked" : "radio_button_unchecked"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget Right Interactive Hostess Sync Panel */}
            <div className="lg:col-span-7 flex justify-center">
              <div 
                className="w-full max-w-[460px] bg-white border border-[#0E1726]/5 p-6 rounded-[32px] shadow-card flex flex-col justify-between relative overflow-hidden"
                style={{ minHeight: "380px" }}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#FF9F43]/2 via-transparent to-secondary/2" />
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-3 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${pulseCore ? "bg-rose-500 animate-ping" : "bg-[#FF9F43]"}`} />
                    <span className="font-mono text-[9.5px] font-bold text-[#64748B] uppercase tracking-wider">
                      Seating Map Sync // Active
                    </span>
                  </div>
                  <span className="font-mono text-[8px] font-bold bg-[#ea580c]/10 text-[#c2410c] border border-[#ea580c]/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    DINING_ROSTER_OK
                  </span>
                </div>

                {/* Simulated Dining Status Screen */}
                <div className="flex-1 space-y-4 relative z-10 text-left">
                  
                  {/* Status Indicator */}
                  <div className="bg-[#F8FAFC] border border-[#0E1726]/5 rounded-2xl p-4.5 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#0E1726]/5 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80" 
                        alt="Restaurant Hostess"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[8.5px] font-bold text-slate-400 uppercase mb-0.5">
                        Hostess Seating Allocation
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-[13.5px] font-bold text-[#0E1726] truncate">{activeRes.table}</h4>
                        <span className="font-mono text-[10px] text-[#c2410c] bg-orange-50 px-2 py-0.5 rounded-md font-bold uppercase">
                          {activeRes.time}
                        </span>
                      </div>
                      <div className="h-px bg-[#0E1726]/5 my-2" />
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-[#64748B]">Request:</span>
                        <span className="font-mono font-bold text-slate-500 truncate">{activeRes.notes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Console */}
                  <div className="bg-[#0E1726] text-white p-4 rounded-2xl font-mono text-[9.5px] space-y-1 opacity-90 select-none overflow-hidden h-[115px]">
                    <AnimatePresence mode="popLayout">
                      {logs.map((log, idx) => (
                        <motion.p
                          key={log + idx}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, delay: idx * 0.05 }}
                          className={idx === 4 ? "text-[#FF9F43] font-bold" : "text-slate-300"}
                        >
                          {log}
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Panel Footer */}
                <div className="border-t border-[#0E1726]/5 pt-3.5 mt-6 flex items-center justify-between relative z-10 text-[9.5px] font-mono text-[#64748B] uppercase">
                  <span>Latency // 0.7s</span>
                  <span>TABLE LOCK ON</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HOSTESS SEATING OPTIMIZER SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Area */}
            <div className="relative rounded-3xl overflow-hidden shadow-card h-[340px] sm:h-[400px] bg-[#0E1726]">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                alt="Premium Dining Room interior"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 via-[#0E1726]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-2">
                <span className="font-mono text-[9px] font-bold text-[#FF9F43] uppercase tracking-widest bg-[#FF9F43]/20 px-2.5 py-1 rounded">
                  Dining Optimization
                </span>
                <h4 className="font-headline font-bold text-[18px]">Maximize Table Turns Automatically</h4>
                <p className="text-slate-300 text-[12px] leading-relaxed max-w-[45ch]">
                  Xyras notes party sizes, locks the correct floor layout zones, and tags notes like valet parking or champagne directly to hostess panels.
                </p>
              </div>
            </div>

            {/* Copy Area */}
            <div className="space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-[#FF9F43] bg-[#FF9F43]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                Roster Allocation
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Empower your front of house staff.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Dinner rushes are chaotic. Xyras acts as an empathetic, lightning-fast hostess in the cloud, taking 100% of simultaneous guest booking calls, validating allergies, noting anniversaries, and confirming VIP setups.
              </p>
              
              {/* Feature Points */}
              <div className="space-y-3 pt-2">
                {[
                  "Intelligent table mapping and quiet-corner preference filters",
                  "Note-taking parameters for severe allergies or VIP requests",
                  "Sends instant reservation ticket confirmations via WhatsApp SMS",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-[#FF9F43] mt-0.5">verified</span>
                    <span className="text-[13.5px] font-semibold text-[#334155]">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW AND BENEFITS */}
        <section className="section-px py-20 bg-[#F8FAFC] border-t border-[#0E1726]/5">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] leading-tight tracking-tight">
                Restaurant call workflows.
              </h2>
              <p className="text-[#64748B] text-[14.5px] mt-3">
                See how Xyras resolves dinner bookings and alerts hostess desks natively.
              </p>
            </div>

            {/* Schematic Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Inbound Seating Call", desc: "A guest calls to book a table. Xyras notes party size, requested reservation timing, and dietary specifications." },
                { step: "02", title: "Capacity Allocator", desc: "Cross-references active seating maps, locks table zones, and flags anniversary or allergy instructions." },
                { step: "03", title: "Roster Sync & SMS", desc: "Instantly updates hostess calendars, registers rosters, and dispatches a secure digital seating ticket SMS." },
              ].map((item) => (
                <div key={item.step} className="bg-white border border-[#0E1726]/5 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
                  <div className="font-mono text-[12px] font-bold text-[#FF9F43] mb-4">// Step {item.step}</div>
                  <h4 className="font-headline font-bold text-[#0E1726] text-[16.5px] mb-2">{item.title}</h4>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FLOORPLAN & POS INTEGRATION SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white border-t border-[#0E1726]/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy Left */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-[#FF9F43] bg-[#FF9F43]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                POS Gateways
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Integrates directly with SevenRooms & OpenTable.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Say goodbye to missed calls during peak service hours. Xyras syncs with your reservation management systems to lock table inventories and synchronize diner profiles instantly, keeping your floor running efficiently.
              </p>
              
              <div className="grid grid-cols-2 gap-4.5 pt-2">
                {[
                  { title: "Peak Triage Mode", desc: "Answers 100% of concurrent inbound reservation calls during high rushes." },
                  { title: "Profile Matching", desc: "Recognizes returning VIP guests and appends historical notes." },
                ].map((item) => (
                  <div key={item.title} className="bg-[#F8FAFC] border border-[#0E1726]/5 rounded-2xl p-4">
                    <h5 className="text-[12.5px] font-bold text-[#0E1726] mb-1">{item.title}</h5>
                    <p className="text-[#64748B] text-[11px] leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-card h-[340px] sm:h-[400px] bg-[#0E1726]">
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" 
                alt="Table setup with premium wine pouring"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
