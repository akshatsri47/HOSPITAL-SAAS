"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const TRIAGE_SYMPTOMS = [
  { id: "pain", label: "Acute Abdominal Pain", priority: "CRITICAL // ER Transfer", doc: "Dr. Sandeep Rao", time: "11:00 AM", status: "ROUTED ON-CALL" },
  { id: "ortho", label: "Routine Joint Consultation", priority: "ROUTINE // OPD", doc: "Dr. Ravi Rao", time: "02:30 PM", status: "SCHEDULED" },
  { id: "fever", label: "High Fever & Chills", priority: "MEDIUM // Triage Nurse", doc: "Triage Desk 4", time: "11:45 AM", status: "ROUTED NURSE" },
];

export default function HealthcarePage() {
  const [activeSymptom, setActiveSymptom] = useState(TRIAGE_SYMPTOMS[0]);
  const [logs, setLogs] = useState<string[]>([]);
  const [pulseCore, setPulseCore] = useState(false);

  useEffect(() => {
    // Generate initial simulated telemetry logs
    setLogs([
      "SYSTEM // Inbound call packet detected.",
      `VOICE_AGENT // Symptom identified: "${activeSymptom.label}"`,
      `TRIAGE_RULE // Priority category: ${activeSymptom.priority}`,
      `INTEGRATION // Querying database for ${activeSymptom.doc}...`,
      `STATUS // Database action: ${activeSymptom.status} at ${activeSymptom.time}.`,
    ]);
  }, [activeSymptom]);

  const triggerTriageSim = (item: typeof TRIAGE_SYMPTOMS[0]) => {
    setActiveSymptom(item);
    setPulseCore(true);
    setTimeout(() => setPulseCore(false), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip pt-20">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="section-px py-20 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute top-[25%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#00C2A8]/8 to-transparent blur-[80px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#5B8DEF]/8 to-transparent blur-[100px] pointer-events-none z-0" />

          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <span className="font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/10 border border-[#00C2A8]/20 px-3.5 py-1.5 rounded-md uppercase tracking-widest">
              Xyras Solutions // Healthcare
            </span>
            <h1 className="font-headline font-extrabold text-[2.8rem] sm:text-[3.8rem] lg:text-[4.2rem] leading-[1.1] text-primary tracking-tight max-w-[22ch] mx-auto">
              Never miss a <span className="text-secondary font-headline italic font-bold">patient call.</span>
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[50ch] mx-auto">
              EMR-integrated AI voice agents that automate patient triage, schedule consultations, and dispatch pathology lab status 24×7 natively in multiple languages.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="mailto:demo@xyras.ai?subject=Xyras Healthcare Voice AI Demo Request"
                className="w-full sm:w-auto bg-secondary text-primary font-mono font-bold text-[12px] uppercase tracking-wider px-8 py-4 rounded-xl text-center shadow-[0_6px_24px_rgba(0,194,168,0.25)] hover:scale-[1.02] transition-all"
              >
                Book Healthcare Demo
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
                Interactive Telemetry Simulator
              </span>
              <h2 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Simulate a patient triage request.
              </h2>
              <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed">
                Click any of the patient symptom buttons to watch Xyras analyze clinical severity, query doctors' calendars, and route priority in real-time.
              </p>
              
              {/* Symptom Selectors */}
              <div className="flex flex-col gap-2.5 pt-2">
                {TRIAGE_SYMPTOMS.map((item) => {
                  const isActive = activeSymptom.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerTriageSim(item)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#F8FAFC] border-secondary text-primary shadow-[0_2px_12px_rgba(0,194,168,0.05)]"
                          : "bg-white border-[#0E1726]/8 text-[#64748B] hover:border-[#0E1726]/20"
                      }`}
                    >
                      <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        {isActive ? "radio_button_checked" : "radio_button_unchecked"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget Right Interactive Dashboard Panel */}
            <div className="lg:col-span-7 flex justify-center">
              <div 
                className="w-full max-w-[460px] bg-white border border-[#0E1726]/5 p-6 rounded-[32px] shadow-card flex flex-col justify-between relative overflow-hidden"
                style={{ minHeight: "380px" }}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-secondary/2 via-transparent to-[#5B8DEF]/2" />
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-3 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${pulseCore ? "bg-rose-500 animate-ping" : "bg-secondary"}`} />
                    <span className="font-mono text-[9.5px] font-bold text-[#64748B] uppercase tracking-wider">
                      EMR Gate Sync // Active
                    </span>
                  </div>
                  <span className="font-mono text-[8px] font-bold bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    EHR_SECURE
                  </span>
                </div>

                {/* Simulated EMR Status Screen */}
                <div className="flex-1 space-y-4 relative z-10 text-left">
                  
                  {/* Status Indicator */}
                  <div className="bg-[#F8FAFC] border border-[#0E1726]/5 rounded-2xl p-4.5 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#0E1726]/5 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80" 
                        alt={activeSymptom.doc}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[8.5px] font-bold text-slate-400 uppercase mb-0.5">
                        Identified Booking Target
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-[13.5px] font-bold text-[#0E1726] truncate">{activeSymptom.doc}</h4>
                        <span className="font-mono text-[10px] text-secondary bg-[#F0FDFA] px-2 py-0.5 rounded-md font-bold uppercase">
                          {activeSymptom.time}
                        </span>
                      </div>
                      <div className="h-px bg-[#0E1726]/5 my-2" />
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-[#64748B]">Triage:</span>
                        <span className="font-mono font-bold text-slate-500 truncate">{activeSymptom.priority}</span>
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
                          className={idx === 4 ? "text-secondary font-bold" : "text-slate-300"}
                        >
                          {log}
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Panel Footer */}
                <div className="border-t border-[#0E1726]/5 pt-3.5 mt-6 flex items-center justify-between relative z-10 text-[9.5px] font-mono text-[#64748B] uppercase">
                  <span>Latency // 0.8s</span>
                  <span>HIPAA COMPLIANT</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECURE COMPLIANCE & CLINICAL TRUST SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Area */}
            <div className="relative rounded-3xl overflow-hidden shadow-card h-[340px] sm:h-[400px] bg-[#0E1726]">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" 
                alt="Secure Medical Data"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 via-[#0E1726]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-2">
                <span className="font-mono text-[9px] font-bold text-secondary uppercase tracking-widest bg-[#00C2A8]/20 px-2.5 py-1 rounded">
                  Clinical Trust Gates
                </span>
                <h4 className="font-headline font-bold text-[18px]">100% HIPAA & SOC2 Compliant</h4>
                <p className="text-slate-300 text-[12px] leading-relaxed max-w-[45ch]">
                  Patient interactions are protected under enterprise-grade secure SSL socket lines, featuring point-to-point database encryption.
                </p>
              </div>
            </div>

            {/* Copy Area */}
            <div className="space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                Compliance Security
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Designed for complex clinical parameters.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Hospital operators have standard rules when sifting inbound queries. Xyras implements clinical logic to ensure zero false positives, instantly routing emergencies to designated ER desks while handling routine registrations automatically.
              </p>
              
              {/* Trust Checkmarks */}
              <div className="space-y-3 pt-2">
                {[
                  "Bi-directional EHR syncing with Epic, Cerner, and Meditech",
                  "Encrypted voice recordings with strict data privacy mandates",
                  "Intelligent mid-conversation English / Indian regional language switches",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5">verified</span>
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
                Healthcare integration schematic.
              </h2>
              <p className="text-[#64748B] text-[14.5px] mt-3">
                Xyras sits seamlessly between patient inbound voice streams and on-premise healthcare software.
              </p>
            </div>

            {/* Schematic Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Inbound Voice Triage", desc: "A patient calls. Xyras identifies language, analyzes clinical symptoms, and categorizes severity instantly." },
                { step: "02", title: "EMR Synchronisation", desc: "Checks doctor availability grids via Epic/Meditech, locks the matching slot, and queries records." },
                { step: "03", title: "Action & Confirmation", desc: "Confirms appointment, records transcribes, updates EHR files, and dispatches a secure check-in WhatsApp SMS." },
              ].map((item) => (
                <div key={item.step} className="bg-white border border-[#0E1726]/5 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
                  <div className="font-mono text-[12px] font-bold text-secondary mb-4">// Step {item.step}</div>
                  <h4 className="font-headline font-bold text-[#0E1726] text-[16.5px] mb-2">{item.title}</h4>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATION SYSTEMS SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white border-t border-[#0E1726]/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy Left */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-secondary bg-[#00C2A8]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                EHR Ecosystem
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Integrate with your active medical ecosystem.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Whether your team utilizes legacy hospital on-premise infrastructure or modern cloud systems, Xyras voice engines sync appointment rosters and patient files instantly. No code overhaul, no manual export pipelines needed.
              </p>
              
              <div className="grid grid-cols-2 gap-4.5 pt-2">
                {[
                  { title: "Active Roster Sync", desc: "Monitors active physician calendars to block real-time slots." },
                  { title: "Pathology Triage", desc: "Extracts lab report status files to read back securely." },
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
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80" 
                alt="Medical Specialist Team"
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
