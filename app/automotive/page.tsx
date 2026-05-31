"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_QUERIES = [
  { id: "sedan", label: "Rahul Verma (Honda Sedan)", car: "Honda Civic Sedan", time: "11:00 AM", issue: "Periodic Service", status: "SCHEDULED // Bay 3 Locked" },
  { id: "suv", label: "Meera Sen (SUV Check)", car: "Jeep Compass SUV", time: "03:30 PM", issue: "Brake Noise Check", status: "SCHEDULED // Tech Assigned" },
  { id: "ev", label: "Anil Roy (EV Check)", car: "Nexon EV SUV", time: "01:00 PM", issue: "Battery Telemetry FAQ", status: "ROUTED // Specialist" },
];

export default function AutomotivePage() {
  const [activeQuery, setActiveQuery] = useState(SERVICE_QUERIES[0]);
  const [logs, setLogs] = useState<string[]>([]);
  const [pulseCore, setPulseCore] = useState(false);

  useEffect(() => {
    setLogs([
      "SYSTEM // Inbound vehicle check-in call registered.",
      `VOICE_AGENT // Model verified: ${activeQuery.car}`,
      `VOICE_AGENT // Issue diagnostic logged: "${activeQuery.issue}"`,
      `INTEGRATION // Querying technician calendar availability...`,
      `STATUS // Service bay locked: ${activeQuery.status} at ${activeQuery.time}.`,
    ]);
  }, [activeQuery]);

  const triggerQuerySim = (item: typeof SERVICE_QUERIES[0]) => {
    setActiveQuery(item);
    setPulseCore(true);
    setTimeout(() => setPulseCore(false), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip pt-20">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="section-px py-20 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute top-[25%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#A55EEA]/8 to-transparent blur-[80px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#00C2A8]/6 to-transparent blur-[100px] pointer-events-none z-0" />

          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <span className="font-mono text-[10px] font-bold text-[#A55EEA] bg-[#A55EEA]/10 border border-[#A55EEA]/20 px-3.5 py-1.5 rounded-md uppercase tracking-widest">
              Xyras Solutions // Automotive
            </span>
            <h1 className="font-headline font-extrabold text-[2.8rem] sm:text-[3.8rem] lg:text-[4.2rem] leading-[1.1] text-primary tracking-tight max-w-[22ch] mx-auto">
              Book service appointments <span className="text-[#A55EEA] font-headline italic font-bold">24×7.</span>
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[50ch] mx-auto">
              AI voice agents that automate periodic vehicle maintenance bookings, coordinate dealer test-drive hours, and address complex warranty or service policy FAQs instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="mailto:demo@xyras.ai?subject=Xyras Automotive Voice AI Demo Request"
                className="w-full sm:w-auto bg-[#A55EEA] text-white font-mono font-bold text-[12px] uppercase tracking-wider px-8 py-4 rounded-xl text-center shadow-[0_6px_24px_rgba(165,94,234,0.25)] hover:scale-[1.02] transition-all"
              >
                Book Automotive Demo
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
                Interactive Scheduler Simulator
              </span>
              <h2 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Simulate a vehicle service booking.
              </h2>
              <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed">
                Choose a customer request below. Watch how Xyras checks available garage service bays, assigns specialist technicians, and prints out a diagnostic receipt ticket.
              </p>
              
              {/* Query selectors */}
              <div className="flex flex-col gap-2.5 pt-2">
                {SERVICE_QUERIES.map((item) => {
                  const isActive = activeQuery.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerQuerySim(item)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#F8FAFC] border-[#A55EEA] text-primary shadow-[0_2px_12px_rgba(165,94,234,0.05)]"
                          : "bg-white border-[#0E1726]/8 text-[#64748B] hover:border-[#0E1726]/20"
                      }`}
                    >
                      <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                      <span className="material-symbols-outlined text-[16px]" style={{ color: "#A55EEA" }}>
                        {isActive ? "radio_button_checked" : "radio_button_unchecked"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget Right Interactive Service Sync Panel */}
            <div className="lg:col-span-7 flex justify-center">
              <div 
                className="w-full max-w-[460px] bg-white border border-[#0E1726]/5 p-6 rounded-[32px] shadow-card flex flex-col justify-between relative overflow-hidden"
                style={{ minHeight: "380px" }}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#A55EEA]/2 via-transparent to-secondary/2" />
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-3 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${pulseCore ? "bg-rose-500 animate-ping" : "bg-[#A55EEA]"}`} />
                    <span className="font-mono text-[9.5px] font-bold text-[#64748B] uppercase tracking-wider">
                      Service Bay Sync // Active
                    </span>
                  </div>
                  <span className="font-mono text-[8px] font-bold bg-[#a855f7]/10 text-[#7e22ce] border border-[#a855f7]/15 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    CALENDAR_LOCKED
                  </span>
                </div>

                {/* Simulated Service Status Screen */}
                <div className="flex-1 space-y-4 relative z-10 text-left">
                  
                  {/* Status Indicator */}
                  <div className="bg-[#F8FAFC] border border-[#0E1726]/5 rounded-2xl p-4.5 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#0E1726]/5 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=150&q=80" 
                        alt="Service Advisor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[8.5px] font-bold text-slate-400 uppercase mb-0.5">
                        Dealership Roster Check-In
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-[13.5px] font-bold text-[#0E1726] truncate">{activeQuery.car}</h4>
                        <span className="font-mono text-[10px] text-[#7e22ce] bg-purple-50 px-2 py-0.5 rounded-md font-bold uppercase">
                          {activeQuery.time}
                        </span>
                      </div>
                      <div className="h-px bg-[#0E1726]/5 my-2" />
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-[#64748B]">Issue:</span>
                        <span className="font-mono font-bold text-slate-500 truncate">{activeQuery.issue}</span>
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
                          className={idx === 4 ? "text-[#A55EEA] font-bold" : "text-slate-300"}
                        >
                          {log}
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Panel Footer */}
                <div className="border-t border-[#0E1726]/5 pt-3.5 mt-6 flex items-center justify-between relative z-10 text-[9.5px] font-mono text-[#64748B] uppercase">
                  <span>Latency // 0.6s</span>
                  <span>BAY ALLOCATED</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* GARAGE BAY & SERVICE OPTIMIZER SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Area */}
            <div className="relative rounded-3xl overflow-hidden shadow-card h-[340px] sm:h-[400px] bg-[#0E1726]">
              <img 
                src="https://images.unsplash.com/photo-1617886322168-72b886573c3c?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Auto Dealership Showroom"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 via-[#0E1726]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-2">
                <span className="font-mono text-[9px] font-bold text-[#A55EEA] uppercase tracking-widest bg-[#A55EEA]/20 px-2.5 py-1 rounded">
                  Dealership Roster
                </span>
                <h4 className="font-headline font-bold text-[18px]">Lock Available Service Bays</h4>
                <p className="text-slate-300 text-[12px] leading-relaxed max-w-[45ch]">
                  Xyras notes the specific car model, maps the maintenance history, locks mechanical bay slots, and routes the ticket to technicians.
                </p>
              </div>
            </div>

            {/* Copy Area */}
            <div className="space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-[#A55EEA] bg-[#A55EEA]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                Bay Allocations
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Address complex warranty and service policy FAQs.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Address car service queues efficiently. Xyras acts as an intelligent service advisor in the cloud, booking periodic engine check-ups, reserving dealer test-drive hours, and verifying active warranty coverage status in seconds.
              </p>
              
              {/* Feature Points */}
              <div className="space-y-3 pt-2">
                {[
                  "Bi-directional diagnostic slot allocations across garage bays",
                  "Automates periodic vehicle check-ups and test drive bookings",
                  "Appends details of severe engine/car issues to service desks",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-[#A55EEA] mt-0.5">verified</span>
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
                Dealership call schematic.
              </h2>
              <p className="text-[#64748B] text-[14.5px] mt-3">
                Xyras coordinates service bay schedules and dealer operations seamlessly.
              </p>
            </div>

            {/* Schematic Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Inbound Service Query", desc: "A client calls to book their car service. Xyras notes car brand model and primary diagnostic issues." },
                { step: "02", title: "Bay Allocation", desc: "Cross-references dealer workshop bay slots, assigns a certified master technician, and blocks hours." },
                { step: "03", title: "Dealer Roster Sync", desc: "Instantly updates technician ledgers, schedules slots in dealership systems, and dispatches a check-in ticket." },
              ].map((item) => (
                <div key={item.step} className="bg-white border border-[#0E1726]/5 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
                  <div className="font-mono text-[12px] font-bold text-[#A55EEA] mb-4">// Step {item.step}</div>
                  <h4 className="font-headline font-bold text-[#0E1726] text-[16.5px] mb-2">{item.title}</h4>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DMS INTEGRATION SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white border-t border-[#0E1726]/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy Left */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-[#A55EEA] bg-[#A55EEA]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                DMS Ecosystem
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Synchronized with your Dealership Software.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Whether your team utilizes legacy dealership management software (DMS) or modern cloud rosters, Xyras updates technician schedules and updates advisor logs instantly, keeping your service department running smoothly.
              </p>
              
              <div className="grid grid-cols-2 gap-4.5 pt-2">
                {[
                  { title: "Service Bay Locks", desc: "Coordinates dynamic garage bay roster schedules automatically." },
                  { title: "Warranty Validation", desc: "Cross-references car status metrics to address service FAQs." },
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
                src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80" 
                alt="Automotive Master Technician Diagnostic panel"
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
