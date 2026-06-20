"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FormState = {
  name: string;
  industry: string;
  language: string;
  phone: string;
  voice: string;
  welcomeMessage: string;
  agentType: string;
  tone: string;
  instructions: string;
  scriptEnabled: boolean;
  script: string;
  recordings: boolean;
  collectEmail: boolean;
  webhook: string;
};

const STEPS = [
  { label: "Agent identity", shortLabel: "Identity" },
  { label: "Conversation behavior", shortLabel: "Behavior" },
  { label: "Connect & launch", shortLabel: "Launch" },
];

const INITIAL_FORM: FormState = {
  name: "Aarohi",
  industry: "Healthcare",
  language: "English + Hindi",
  phone: "",
  voice: "Meera — Warm & reassuring",
  welcomeMessage:
    "Hello, this is Aarohi from Xyras Care. How may I help you today?",
  agentType: "Patient care coordinator",
  tone: "Calm and professional",
  instructions:
    "Help patients book, reschedule, or cancel appointments. Ask concise follow-up questions, confirm all details, and escalate urgent symptoms to the hospital desk.",
  scriptEnabled: true,
  script:
    "Begin by asking how you can help. Confirm the caller's name and phone number before booking. Repeat the appointment date, time, and doctor name before ending the call.",
  recordings: true,
  collectEmail: false,
  webhook: "",
};

const inputClass =
  "mt-3 w-full rounded-2xl border border-[#0E1726]/10 bg-[#F8FAFC] px-4 py-3.5 text-[14px] font-semibold text-[#0E1726] outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10";

function FieldLabel({
  title,
  hint,
  required = false,
}: {
  title: string;
  hint: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[13px] font-bold text-[#0E1726]">
        {title}
        {required && <span className="ml-0.5 text-secondary">*</span>}
      </label>
      <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{hint}</p>
    </div>
  );
}

function SelectField({
  title,
  hint,
  value,
  options,
  onChange,
}: {
  title: string;
  hint: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel title={title} hint={hint} required />
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} appearance-none pr-11`}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-[18px] text-slate-500">
          expand_more
        </span>
      </div>
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onChange}
      className={`relative h-8 w-[58px] shrink-0 rounded-full p-1 transition-colors ${
        enabled ? "bg-secondary" : "bg-slate-200"
      }`}
    >
      <motion.span
        className="block h-6 w-6 rounded-full bg-white shadow-sm"
        animate={{ x: enabled ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
      />
    </button>
  );
}

export default function AgentBuilderSection() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [launched, setLaunched] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  const completion = useMemo(() => {
    const fields = [
      form.name,
      form.industry,
      form.language,
      form.voice,
      form.welcomeMessage,
      form.agentType,
      form.tone,
      form.instructions,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  const nextStep = () => {
    if (step === 0 && (!form.name.trim() || !form.welcomeMessage.trim())) {
      setError("Add an agent name and welcome message to continue.");
      return;
    }
    if (step === 1 && !form.instructions.trim()) {
      setError("Give your agent a few operating instructions to continue.");
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, 2));
  };

  const previewVoice = () => {
    setVoicePlaying(true);
    window.setTimeout(() => setVoicePlaying(false), 1800);
  };

  return (
    <section
      id="build-agent"
      className="section-px section-py relative overflow-hidden bg-[#0E1726]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-secondary/10 blur-[110px]" />
        <div className="absolute -right-32 bottom-10 h-[30rem] w-[30rem] rounded-full bg-[#5B8DEF]/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-secondary">
                05 · Agent studio
              </span>
              <span className="h-px w-14 bg-secondary/40" />
            </div>
            <h2 className="max-w-[12ch] font-headline text-[2.5rem] font-bold leading-[0.98] tracking-tight text-white sm:text-[3.6rem]">
              Shape your voice agent.
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-[58ch] text-[15px] leading-7 text-slate-300 sm:text-[17px]">
              Configure a production-ready Xyras agent in three focused steps.
              Choose its identity, teach it how to respond, then connect it to
              your workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["No code", "Multilingual", "Live in 48 hours"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#F8FAFC] shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:rounded-[38px]">
          <div className="border-b border-[#0E1726]/8 bg-white px-4 py-4 sm:px-7">
            <div className="grid grid-cols-3 gap-2">
              {STEPS.map((item, index) => {
                const active = step === index;
                const done = step > index;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => index <= step && setStep(index)}
                    className={`flex min-h-16 items-center justify-center gap-2 rounded-2xl px-2 transition sm:justify-start sm:px-5 ${
                      active
                        ? "bg-[#F0FDFA] text-[#0F766E]"
                        : done
                          ? "text-[#0E1726]"
                          : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-[12px] font-bold ${
                        active
                          ? "border-secondary bg-secondary text-[#0E1726]"
                          : done
                            ? "border-[#0E1726] bg-[#0E1726] text-white"
                            : "border-slate-300"
                      }`}
                    >
                      {done ? (
                        <span className="material-symbols-outlined text-[15px]">
                          check
                        </span>
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="hidden text-left sm:block">
                      <span className="block font-mono text-[8px] font-bold uppercase tracking-widest opacity-60">
                        Step 0{index + 1}
                      </span>
                      <span className="block text-[12px] font-bold lg:text-[13px]">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-[10px] font-bold sm:hidden">
                      {item.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid min-h-[660px] lg:grid-cols-[1fr_300px]">
            <div className="px-5 py-8 sm:px-9 sm:py-10 lg:px-12">
              <div className="mb-9 flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-secondary">
                    New {form.industry.toLowerCase()} agent
                  </p>
                  <h3 className="mt-2 font-headline text-[1.8rem] font-bold leading-tight text-[#0E1726] sm:text-[2.25rem]">
                    {step === 0 && "Give your agent an identity."}
                    {step === 1 && "Define how it should think."}
                    {step === 2 && "Connect it to your operation."}
                  </h3>
                </div>
                <span className="hidden rounded-full bg-[#0E1726] px-3 py-1.5 font-mono text-[9px] font-bold text-white sm:block">
                  {completion}% READY
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 0 && (
                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <FieldLabel
                          title="Agent name"
                          hint="The name callers will hear"
                          required
                        />
                        <input
                          value={form.name}
                          onChange={(event) => update("name", event.target.value)}
                          className={inputClass}
                          placeholder="e.g. Aarohi"
                        />
                      </div>
                      <SelectField
                        title="Industry"
                        hint="Tailors the default workflow"
                        value={form.industry}
                        onChange={(value) => update("industry", value)}
                        options={[
                          "Healthcare",
                          "Real Estate",
                          "Restaurants",
                          "Automotive",
                          "Other",
                        ]}
                      />
                      <SelectField
                        title="Language"
                        hint="The agent can switch mid-call"
                        value={form.language}
                        onChange={(value) => update("language", value)}
                        options={[
                          "English + Hindi",
                          "English",
                          "Hindi",
                          "Tamil",
                          "Telugu",
                          "Kannada",
                        ]}
                      />
                      <div>
                        <FieldLabel
                          title="Phone number"
                          hint="Optional number to attach later"
                        />
                        <input
                          value={form.phone}
                          onChange={(event) => update("phone", event.target.value)}
                          className={inputClass}
                          placeholder="+91 98765 43210"
                          inputMode="tel"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <FieldLabel
                          title="Voice"
                          hint="Select a voice profile and preview its character"
                          required
                        />
                        <div className="mt-3 flex gap-3">
                          <button
                            type="button"
                            onClick={previewVoice}
                            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-secondary text-[#0E1726] shadow-[0_8px_22px_rgba(0,194,168,0.22)]"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {voicePlaying ? "graphic_eq" : "play_arrow"}
                            </span>
                          </button>
                          <div className="relative flex-1">
                            <select
                              value={form.voice}
                              onChange={(event) =>
                                update("voice", event.target.value)
                              }
                              className={`${inputClass} mt-0 appearance-none pr-11`}
                            >
                              <option>Meera — Warm & reassuring</option>
                              <option>Priya — Clear & professional</option>
                              <option>Rohan — Friendly & expressive</option>
                              <option>Kavya — Calm & confident</option>
                            </select>
                            <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-slate-500">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <FieldLabel
                          title="Welcome message"
                          hint="The first sentence callers hear"
                          required
                        />
                        <textarea
                          value={form.welcomeMessage}
                          onChange={(event) =>
                            update("welcomeMessage", event.target.value)
                          }
                          className={`${inputClass} min-h-28 resize-y`}
                        />
                      </div>
                      <div className="sm:col-span-2 flex items-center justify-between rounded-2xl bg-white p-4 shadow-[inset_0_0_0_1px_rgba(14,23,38,0.07)]">
                        <div className="pr-4">
                          <p className="text-[13px] font-bold text-[#0E1726]">
                            Call recordings
                          </p>
                          <p className="mt-1 text-[11.5px] text-slate-500">
                            Keep recordings for review and quality assurance.
                          </p>
                        </div>
                        <Toggle
                          enabled={form.recordings}
                          onChange={() =>
                            update("recordings", !form.recordings)
                          }
                          label="Call recordings"
                        />
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-7 sm:grid-cols-2">
                      <SelectField
                        title="Agent role"
                        hint="What this agent owns"
                        value={form.agentType}
                        onChange={(value) => update("agentType", value)}
                        options={[
                          "Patient care coordinator",
                          "Appointment scheduler",
                          "Lead qualification specialist",
                          "Customer support representative",
                          "Front desk receptionist",
                        ]}
                      />
                      <SelectField
                        title="Tone"
                        hint="How the agent should sound"
                        value={form.tone}
                        onChange={(value) => update("tone", value)}
                        options={[
                          "Calm and professional",
                          "Warm and empathetic",
                          "Friendly and conversational",
                          "Concise and direct",
                        ]}
                      />
                      <div className="sm:col-span-2">
                        <FieldLabel
                          title="Operating instructions"
                          hint="Set boundaries, goals, and escalation rules"
                          required
                        />
                        <textarea
                          value={form.instructions}
                          onChange={(event) =>
                            update("instructions", event.target.value)
                          }
                          className={`${inputClass} min-h-40 resize-y`}
                        />
                      </div>
                      <div className="sm:col-span-2 rounded-3xl bg-white p-5 shadow-[inset_0_0_0_1px_rgba(14,23,38,0.07)]">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[13px] font-bold text-[#0E1726]">
                              Guided conversation script
                            </p>
                            <p className="mt-1 text-[11.5px] text-slate-500">
                              Give the agent a preferred call structure.
                            </p>
                          </div>
                          <Toggle
                            enabled={form.scriptEnabled}
                            onChange={() =>
                              update("scriptEnabled", !form.scriptEnabled)
                            }
                            label="Guided conversation script"
                          />
                        </div>
                        <AnimatePresence>
                          {form.scriptEnabled && (
                            <motion.textarea
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 132 }}
                              exit={{ opacity: 0, height: 0 }}
                              value={form.script}
                              onChange={(event) =>
                                update("script", event.target.value)
                              }
                              className={`${inputClass} resize-none overflow-hidden`}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="rounded-3xl bg-white p-5 shadow-[inset_0_0_0_1px_rgba(14,23,38,0.07)] sm:p-6">
                        <div className="flex items-center justify-between gap-5">
                          <div>
                            <p className="text-[13px] font-bold text-[#0E1726]">
                              Collect caller email
                            </p>
                            <p className="mt-1 text-[11.5px] text-slate-500">
                              Ask for email only when the workflow needs it.
                            </p>
                          </div>
                          <Toggle
                            enabled={form.collectEmail}
                            onChange={() =>
                              update("collectEmail", !form.collectEmail)
                            }
                            label="Collect caller email"
                          />
                        </div>
                      </div>

                      <div>
                        <FieldLabel
                          title="Webhook endpoint"
                          hint="Optional — send structured call data to your CRM or hospital system"
                        />
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-[18px] text-slate-400">
                            link
                          </span>
                          <input
                            value={form.webhook}
                            onChange={(event) =>
                              update("webhook", event.target.value)
                            }
                            className={`${inputClass} pl-11`}
                            placeholder="https://your-system.com/api/xyras"
                            inputMode="url"
                          />
                        </div>
                      </div>

                      <div className="rounded-3xl bg-[#0E1726] p-6 text-white">
                        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                          <div>
                            <div className="mb-4 flex items-center gap-2">
                              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">
                                Deployment preview
                              </span>
                            </div>
                            <h4 className="font-headline text-[1.55rem] font-bold">
                              {form.name} is ready for rehearsal.
                            </h4>
                            <p className="mt-2 max-w-[46ch] text-[12px] leading-6 text-slate-300">
                              Your {form.tone.toLowerCase()}{" "}
                              {form.agentType.toLowerCase()} will answer in{" "}
                              {form.language}, with recordings{" "}
                              {form.recordings ? "enabled" : "disabled"}.
                            </p>
                          </div>
                          <div className="grid shrink-0 grid-cols-2 gap-2">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                              <p className="font-mono text-[8px] uppercase tracking-wider text-slate-400">
                                Latency
                              </p>
                              <p className="mt-1 text-[13px] font-bold text-secondary">
                                &lt; 800ms
                              </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                              <p className="font-mono text-[8px] uppercase tracking-wider text-slate-400">
                                Coverage
                              </p>
                              <p className="mt-1 text-[13px] font-bold text-secondary">
                                24 × 7
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {launched && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-start gap-3 rounded-2xl border border-secondary/20 bg-[#F0FDFA] p-4"
                          >
                            <span className="material-symbols-outlined text-[20px] text-[#0F766E]">
                              check_circle
                            </span>
                            <div>
                              <p className="text-[12px] font-bold text-[#0F766E]">
                                Configuration captured
                              </p>
                              <p className="mt-1 text-[11px] leading-5 text-slate-600">
                                The next production step is connecting a phone
                                number and your preferred system integration.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {error && (
                <p className="mt-5 flex items-center gap-2 text-[11.5px] font-semibold text-red-600">
                  <span className="material-symbols-outlined text-[17px]">
                    error
                  </span>
                  {error}
                </p>
              )}

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#0E1726]/8 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep((current) => Math.max(current - 1, 0));
                  }}
                  disabled={step === 0}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-[11px] font-bold text-slate-500 transition hover:text-[#0E1726] disabled:pointer-events-none disabled:opacity-0"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    arrow_back
                  </span>
                  Back
                </button>
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group flex items-center gap-3 rounded-2xl bg-[#0E1726] px-5 py-3.5 text-[11px] font-bold text-white shadow-[0_10px_28px_rgba(14,23,38,0.18)] transition hover:-translate-y-0.5 hover:bg-[#162238] sm:px-7"
                  >
                    Save & continue
                    <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLaunched(true)}
                    className="group flex items-center gap-3 rounded-2xl bg-secondary px-5 py-3.5 text-[11px] font-bold text-[#0E1726] shadow-[0_10px_28px_rgba(0,194,168,0.24)] transition hover:-translate-y-0.5 hover:bg-[#16d3b9] sm:px-7"
                  >
                    Create agent brief
                    <span className="material-symbols-outlined text-[17px] transition-transform group-hover:translate-x-1">
                      rocket_launch
                    </span>
                  </button>
                )}
              </div>
            </div>

            <aside className="hidden border-l border-[#0E1726]/8 bg-white px-7 py-10 lg:block">
              <div className="sticky top-28">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Live agent card
                </p>
                <div className="mt-6 overflow-hidden rounded-[26px] border border-[#0E1726]/8 bg-[#F8FAFC] p-5 shadow-[0_18px_50px_rgba(14,23,38,0.08)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-[#5B8DEF] font-headline text-xl font-bold text-white">
                      {form.name.trim().charAt(0).toUpperCase() || "A"}
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-[#F0FDFA] px-2.5 py-1 font-mono text-[8px] font-bold uppercase text-[#0F766E]">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
                      Configuring
                    </span>
                  </div>
                  <h4 className="mt-6 font-headline text-[1.65rem] font-bold text-[#0E1726]">
                    {form.name || "Your agent"}
                  </h4>
                  <p className="mt-1 text-[11.5px] text-slate-500">
                    {form.agentType}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-[#0E1726]/8 pt-5">
                    {[
                      ["domain", form.industry],
                      ["translate", form.language],
                      ["record_voice_over", form.voice.split(" — ")[0]],
                    ].map(([icon, value]) => (
                      <div key={icon} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[17px] text-secondary">
                          {icon}
                        </span>
                        <span className="truncate text-[11px] font-semibold text-slate-600">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#0E1726] p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Readiness
                      </span>
                      <span className="font-mono text-[9px] font-bold text-secondary">
                        {completion}%
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-secondary"
                        animate={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 rounded-2xl border border-[#0E1726]/8 p-4">
                  <span className="material-symbols-outlined text-[19px] text-secondary">
                    verified_user
                  </span>
                  <p className="text-[10.5px] leading-5 text-slate-500">
                    Your configuration remains a private preview until a Xyras
                    deployment specialist connects it.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
