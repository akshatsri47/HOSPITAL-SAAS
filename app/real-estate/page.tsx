"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const REAL_ESTATE_LEADS = [
  { id: "buyer2bhk", label: "Aniket Sen (2 BHK)", budget: "$1.2 Million", config: "2 BHK Flat", timeline: "Immediate", status: "QUALIFIED // Agent Assigned" },
  { id: "rent1bhk", label: "Pooja Roy (1 BHK)", budget: "$3,500/mo", config: "1 BHK Rent", timeline: "1 Month", status: "QUALIFIED // Tenant Approved" },
  { id: "commercial", label: "Karan Shah (Office Space)", budget: "$4.5 Million", config: "Commercial Space", timeline: "3 Months", status: "ROUTED // Premium Team" },
];

export default function RealEstatePage() {
  const [activeLead, setActiveLead] = useState(REAL_ESTATE_LEADS[0]);
  const [logs, setLogs] = useState<string[]>([]);
  const [pulseCore, setPulseCore] = useState(false);

  useEffect(() => {
    setLogs([
      "SYSTEM // Listing query inbound detected.",
      `VOICE_AGENT // Budget verified: ${activeLead.budget}`,
      `VOICE_AGENT // Target configuration: ${activeLead.config}`,
      `CRM_GATEWAY // Lead scored: High Intent (Timeline: ${activeLead.timeline})`,
      `INTEGRATION // Status: ${activeLead.status} synced to HubSpot CRM.`,
    ]);
  }, [activeLead]);

  const triggerLeadSim = (item: typeof REAL_ESTATE_LEADS[0]) => {
    setActiveLead(item);
    setPulseCore(true);
    setTimeout(() => setPulseCore(false), 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip pt-20">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="section-px py-20 bg-[#F8FAFC] relative overflow-hidden">
          <div className="absolute top-[25%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#5B8DEF]/8 to-transparent blur-[80px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#00C2A8]/8 to-transparent blur-[100px] pointer-events-none z-0" />

          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <span className="font-mono text-[10px] font-bold text-[#5B8DEF] bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 px-3.5 py-1.5 rounded-md uppercase tracking-widest">
              Xyras Solutions // Real Estate
            </span>
            <h1 className="font-headline font-extrabold text-[2.8rem] sm:text-[3.8rem] lg:text-[4.2rem] leading-[1.1] text-primary tracking-tight max-w-[22ch] mx-auto">
              Qualify property <span className="text-[#5B8DEF] font-headline italic font-bold">leads instantly.</span>
            </h1>
            <p className="text-[#64748B] text-[16px] sm:text-[18px] leading-relaxed max-w-[50ch] mx-auto">
              AI voice agents that follow up on inbound listings, qualify prospective buyers, note target budgets, and schedule physical walkthrough show timings 24×7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="mailto:demo@xyras.ai?subject=Xyras Real Estate Voice AI Demo Request"
                className="w-full sm:w-auto bg-[#5B8DEF] text-white font-mono font-bold text-[12px] uppercase tracking-wider px-8 py-4 rounded-xl text-center shadow-[0_6px_24px_rgba(91,141,239,0.25)] hover:scale-[1.02] transition-all"
              >
                Book Real Estate Demo
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
                Simulate a buyer lead qualification.
              </h2>
              <p className="text-[#64748B] text-[14px] sm:text-[15px] leading-relaxed">
                Select a simulated caller below. Watch how Xyras maps their target budget, bedroom configuration, and flags the corresponding pipeline status directly to CRM gates.
              </p>
              
              {/* Lead selectors */}
              <div className="flex flex-col gap-2.5 pt-2">
                {REAL_ESTATE_LEADS.map((item) => {
                  const isActive = activeLead.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerLeadSim(item)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#F8FAFC] border-[#5B8DEF] text-primary shadow-[0_2px_12px_rgba(91,141,239,0.05)]"
                          : "bg-white border-[#0E1726]/8 text-[#64748B] hover:border-[#0E1726]/20"
                      }`}
                    >
                      <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
                      <span className="material-symbols-outlined text-[16px]" style={{ color: "#5B8DEF" }}>
                        {isActive ? "radio_button_checked" : "radio_button_unchecked"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget Right Interactive CRM Sync Panel */}
            <div className="lg:col-span-7 flex justify-center">
              <div 
                className="w-full max-w-[460px] bg-white border border-[#0E1726]/5 p-6 rounded-[32px] shadow-card flex flex-col justify-between relative overflow-hidden"
                style={{ minHeight: "380px" }}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#5B8DEF]/2 via-transparent to-secondary/2" />
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-[#0E1726]/5 pb-3 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${pulseCore ? "bg-rose-500 animate-ping" : "bg-[#5B8DEF]"}`} />
                    <span className="font-mono text-[9.5px] font-bold text-[#64748B] uppercase tracking-wider">
                      HubSpot CRM Sync // Active
                    </span>
                  </div>
                  <span className="font-mono text-[8px] font-bold bg-[#3b82f6]/10 text-[#2563eb] border border-[#3b82f6]/15 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    CRM_GATE_OK
                  </span>
                </div>

                {/* Simulated CRM Status Screen */}
                <div className="flex-1 space-y-4 relative z-10 text-left">
                  
                  {/* Status Indicator */}
                  <div className="bg-[#F8FAFC] border border-[#0E1726]/5 rounded-2xl p-4.5 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#0E1726]/5 shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=150&q=80" 
                        alt="Real Estate Consultant"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[8.5px] font-bold text-slate-400 uppercase mb-0.5">
                        Lead Pipeline Capture
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-[13.5px] font-bold text-[#0E1726] truncate">{activeLead.config}</h4>
                        <span className="font-mono text-[10px] text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-md font-bold uppercase">
                          {activeLead.budget}
                        </span>
                      </div>
                      <div className="h-px bg-[#0E1726]/5 my-2" />
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-[#64748B]">Pipeline Code:</span>
                        <span className="font-mono font-bold text-slate-500 truncate">{activeLead.status}</span>
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
                          className={idx === 4 ? "text-[#5B8DEF] font-bold" : "text-slate-300"}
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
                  <span>SSL SECURED</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* HIGH-INTENT PROPERTY QUALIFICATION SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Area */}
            <div className="relative rounded-3xl overflow-hidden shadow-card h-[340px] sm:h-[400px] bg-[#0E1726]">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Modern Premium Property"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726]/80 via-[#0E1726]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-2">
                <span className="font-mono text-[9px] font-bold text-[#5B8DEF] uppercase tracking-widest bg-[#5B8DEF]/20 px-2.5 py-1 rounded">
                  Lead Sifting Gate
                </span>
                <h4 className="font-headline font-bold text-[18px]">Filter Serious Buyers Only</h4>
                <p className="text-slate-300 text-[12px] leading-relaxed max-w-[45ch]">
                  Verify finance readiness, loan pre-approvals, and precise target regions in a 2-minute conversation before assigning premium broker hours.
                </p>
              </div>
            </div>

            {/* Copy Area */}
            <div className="space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-[#5B8DEF] bg-[#5B8DEF]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                Listing Pipelines
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Instantly process inbound listing queries.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                When prospects inquire about hot properties, Xyras answers immediately, notes active configurations (number of bedrooms, budget caps, preferred view zones), and cross-references available physical slot calendars to lock viewings.
              </p>
              
              {/* Feature Bulletpoints */}
              <div className="space-y-3 pt-2">
                {[
                  "Qualify buyer configurations, timelines, and budgets",
                  "Auto-coordinate tour timetables directly with active agents",
                  "Push detailed caller history directly to HubSpot, Salesforce, or Zoho",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[18px] text-[#5B8DEF] mt-0.5">verified</span>
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
                Real Estate lead flow.
              </h2>
              <p className="text-[#64748B] text-[14.5px] mt-3">
                Watch how Xyras qualifies leads and coordinates agent pipelines instantly.
              </p>
            </div>

            {/* Schematic Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Inbound Listing Follow-up", desc: "A prospective tenant or buyer calls about an active listing. Xyras registers interest and answers FAQs." },
                { step: "02", title: "Parameter Qualification", desc: "Interactively qualifies target budgets, configuration details (1BHK/2BHK), and urgency timelines." },
                { step: "03", title: "Show Booking", desc: "Coordinates with agency calendars, books walkthrough times, and pushes qualified profiles into HubSpot." },
              ].map((item) => (
                <div key={item.step} className="bg-white border border-[#0E1726]/5 rounded-3xl p-6 shadow-sm text-left relative overflow-hidden">
                  <div className="font-mono text-[12px] font-bold text-[#5B8DEF] mb-4">// Step {item.step}</div>
                  <h4 className="font-headline font-bold text-[#0E1726] text-[16.5px] mb-2">{item.title}</h4>
                  <p className="text-[#64748B] text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CRM INTEGRATIONS SECTION (New Image & Content) */}
        <section className="section-px py-20 bg-white border-t border-[#0E1726]/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy Left */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="font-mono text-[10px] font-bold text-[#5B8DEF] bg-[#5B8DEF]/15 px-3 py-1 rounded-md uppercase tracking-wider">
                Enterprise Sync
              </span>
              <h3 className="font-headline font-extrabold text-[#0E1726] text-[2rem] sm:text-[2.6rem] leading-tight tracking-tight">
                Your entire broker team, synchronized.
              </h3>
              <p className="text-[#64748B] text-[14.5px] leading-relaxed">
                Stop letting hot listing leads cool down due to manual follow-up queues. Xyras registers inbound calls, categorizes guest preferences, assigns designated local brokers based on property parameters, and sends instant calendar invitations.
              </p>
              
              <div className="grid grid-cols-2 gap-4.5 pt-2">
                {[
                  { title: "Hot Lead Alerts", desc: "Instantly notifies local brokers when high-budget buyers call." },
                  { title: "Walkthrough Booking", desc: "Locks physical visit hours to guarantee zero double-bookings." },
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80" 
                alt="Agent Consulting with Property Client"
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
