"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

type Mode = "inbound" | "outbound";

type UseCase = {
  title: string;
  description: string;
  agent: string;
  role: string;
  accent: string;
  icon: string;
  language: string;
  action: string;
};

const USE_CASES: Record<Mode, UseCase[]> = {
  inbound: [
    {
      title: "General Inquiry & FAQ",
      description:
        "Answers routine questions, shares business information, and guides callers to the right next step.",
      agent: "Meera",
      role: "Customer Support",
      accent: "#5EEAD4",
      icon: "forum",
      language: "English · IN",
      action: "FAQ Answered",
    },
    {
      title: "Appointment Booking",
      description:
        "Checks availability, schedules appointments, and handles rescheduling without keeping callers waiting.",
      agent: "Priya",
      role: "Booking Assistant",
      accent: "#8EAFFF",
      icon: "calendar_month",
      language: "Hindi · IN",
      action: "Appointment Booked",
    },
    {
      title: "Order Status & Support",
      description:
        "Retrieves order details, explains delivery updates, and resolves common service questions.",
      agent: "Rohan",
      role: "Support Agent",
      accent: "#B8A5FF",
      icon: "package_2",
      language: "English · IN",
      action: "Support Resolved",
    },
  ],
  outbound: [
    {
      title: "Lead Qualification",
      description:
        "Calls new leads, asks qualifying questions, and routes interested prospects directly to your team.",
      agent: "Kavya",
      role: "Sales Assistant",
      accent: "#5EEAD4",
      icon: "trending_up",
      language: "English · IN",
      action: "Lead Qualified",
    },
    {
      title: "Payment Reminder",
      description:
        "Sends polite reminder calls, confirms payment intent, and updates the follow-up status automatically.",
      agent: "Meera",
      role: "Reminder Agent",
      accent: "#8EAFFF",
      icon: "notifications_active",
      language: "Hindi · IN",
      action: "Reminder Sent",
    },
    {
      title: "Appointment Reminder",
      description:
        "Reminds customers before scheduled appointments and confirms attendance without manual follow-up.",
      agent: "Priya",
      role: "Scheduling Agent",
      accent: "#B8A5FF",
      icon: "event_available",
      language: "English · IN",
      action: "Visit Confirmed",
    },
  ],
};

const WAVE_BARS = [22, 38, 58, 76, 48, 68, 88, 56, 72, 42, 62, 30];

function VoiceVisual({
  item,
  playing,
  onPlay,
}: {
  item: UseCase;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <div className="relative mt-6 h-[218px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-[radial-gradient(circle_at_50%_44%,#17304B_0%,#091423_70%)]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${item.accent}25 0%, transparent 52%)`,
        }}
      />

      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          animate={
            playing
              ? { scale: [0.9, 1.08, 0.9], opacity: [0.13, 0.34, 0.13] }
              : { scale: 1, opacity: 0.14 }
          }
          transition={{
            duration: 2.2,
            repeat: playing ? Infinity : 0,
            delay: ring * 0.2,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-[46%] rounded-[48%] border"
          style={{
            width: 176 + ring * 30,
            height: 96 + ring * 24,
            borderColor: item.accent,
            marginLeft: -(176 + ring * 30) / 2,
            marginTop: -(96 + ring * 24) / 2,
            rotate: ring % 2 ? "-10deg" : "10deg",
            boxShadow: `0 0 26px ${item.accent}20`,
          }}
        />
      ))}

      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#07101F]/65 px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          {playing && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ backgroundColor: item.accent }}
            />
          )}
          <span
            className="relative h-2 w-2 rounded-full"
            style={{ backgroundColor: item.accent }}
          />
        </span>
        <span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.16em]"
          style={{ color: item.accent }}
        >
          {playing ? "Live demo" : "Ready"}
        </span>
      </div>

      <div
        className="absolute left-1/2 top-[45%] z-10 h-[138px] w-[138px] -translate-x-1/2 -translate-y-1/2"
        role="img"
        aria-label={`${item.title} AI voice visualization`}
      >
        <motion.div
          animate={{ rotate: playing ? 360 : 12 }}
          transition={{
            duration: 8,
            repeat: playing ? Infinity : 0,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-dashed opacity-55"
          style={{ borderColor: item.accent }}
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="absolute h-2 w-2 rounded-full"
              style={{
                backgroundColor: item.accent,
                boxShadow: `0 0 14px ${item.accent}`,
                left: dot === 0 ? "8%" : dot === 1 ? "79%" : "45%",
                top: dot === 0 ? "24%" : dot === 1 ? "18%" : "93%",
              }}
            />
          ))}
        </motion.div>

        <motion.div
          animate={
            playing
              ? {
                  rotate: -360,
                  scale: [0.96, 1.04, 0.96],
                }
              : { rotate: -8, scale: 1 }
          }
          transition={{
            rotate: { duration: 6, repeat: playing ? Infinity : 0, ease: "linear" },
            scale: { duration: 1.8, repeat: playing ? Infinity : 0, ease: "easeInOut" },
          }}
          className="absolute inset-[15px] rounded-full border"
          style={{
            borderColor: `${item.accent}80`,
            boxShadow: `inset 0 0 24px ${item.accent}18, 0 0 30px ${item.accent}18`,
          }}
        />

        <motion.div
          animate={
            playing
              ? {
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    `0 0 25px ${item.accent}35`,
                    `0 0 55px ${item.accent}70`,
                    `0 0 25px ${item.accent}35`,
                  ],
                }
              : { scale: 1, boxShadow: `0 0 35px ${item.accent}35` }
          }
          transition={{ duration: 1.4, repeat: playing ? Infinity : 0 }}
          className="absolute inset-[30px] flex items-center justify-center rounded-full border border-white/20 backdrop-blur-md"
          style={{
            background: `radial-gradient(circle at 35% 28%, white 0%, ${item.accent} 16%, ${item.accent}88 48%, #081727 100%)`,
          }}
        >
          <span className="material-symbols-outlined text-[34px] text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
            {item.icon}
          </span>
        </motion.div>

        <motion.span
          animate={playing ? { opacity: [0.2, 0.8, 0.2], scale: [0.75, 1.25, 0.75] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[15%] top-[76%] h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: item.accent, boxShadow: `0 0 10px ${item.accent}` }}
        />
      </div>

      <motion.button
        type="button"
        onClick={onPlay}
        aria-label={playing ? `Pause ${item.title} demo` : `Play ${item.title} demo`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="absolute left-[calc(50%+54px)] top-[calc(45%+45px)] z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_14px_34px_rgba(0,0,0,0.34)]"
      >
        {playing && (
          <span className="absolute inset-[-6px] animate-ping rounded-[20px] border border-[#00C2A8]/25" />
        )}
        <span className="material-symbols-outlined relative text-[21px]">
          {playing ? "pause" : "play_arrow"}
        </span>
      </motion.button>

      <div className="absolute inset-x-8 bottom-4 flex h-6 items-end justify-center gap-[4px] opacity-65">
        {WAVE_BARS.map((height, index) => (
          <motion.span
            key={index}
            animate={
              playing
                ? {
                    height: [
                      `${Math.max(14, height * 0.35)}%`,
                      `${height}%`,
                      `${Math.max(20, height * 0.5)}%`,
                    ],
                  }
                : { height: `${Math.max(12, height * 0.22)}%` }
            }
            transition={{
              duration: 0.65 + (index % 4) * 0.12,
              repeat: playing ? Infinity : 0,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.035,
            }}
            className="w-[3px] rounded-full"
            style={{
              backgroundColor: item.accent,
              boxShadow: playing ? `0 0 9px ${item.accent}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function UseCaseCard({
  item,
  index,
  visible,
  playing,
  onPlay,
}: {
  item: UseCase;
  index: number;
  visible: boolean;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.62,
        delay: 0.12 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -7 }}
      className={`group relative flex min-h-[535px] flex-col overflow-hidden rounded-[30px] border bg-[linear-gradient(155deg,#172740_0%,#101C30_100%)] p-6 transition-all duration-500 sm:p-7 ${
        playing
          ? "border-[#00C2A8]/45 shadow-[0_24px_70px_rgba(0,194,168,0.17)]"
          : "border-[#203552] shadow-[0_18px_48px_rgba(14,23,38,0.11)] hover:border-[#00C2A8]/30 hover:shadow-[0_26px_65px_rgba(14,23,38,0.16)]"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: item.accent }}
      />

      <div className="relative flex items-center justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
        >
          <span className="material-symbols-outlined text-[21px]">
            {item.icon}
          </span>
        </div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/32">
          Use case 0{index + 1}
        </span>
      </div>

      <h3 className="relative mt-6 font-body text-[1.55rem] font-bold leading-tight tracking-[-0.04em] text-white sm:text-[1.68rem]">
        {item.title}
      </h3>
      <p className="relative mt-3 min-h-[66px] text-[13.5px] leading-6 text-white/56">
        {item.description}
      </p>

      <VoiceVisual item={item} playing={playing} onPlay={onPlay} />

      <div className="mt-auto pt-5">
        <div className="mb-4 flex flex-wrap gap-2 border-b border-white/[0.07] pb-4">
          <span className="rounded-full bg-white/[0.06] px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-white/50">
            {item.language}
          </span>
          <span
            className="rounded-full px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.12em]"
            style={{
              color: item.accent,
              backgroundColor: `${item.accent}12`,
            }}
          >
            {item.action}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] font-bold text-[#07131F]"
            style={{ backgroundColor: item.accent }}
          >
            {item.agent.slice(0, 1)}
          </div>
          <div>
            <p className="text-[13px] font-bold text-white">{item.agent}</p>
            <p className="mt-0.5 text-[11px] text-white/42">{item.role}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/25">
              Online
            </span>
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: item.accent,
                boxShadow: `0 0 13px ${item.accent}`,
              }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function WorkflowShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.12 });
  const [mode, setMode] = useState<Mode>("inbound");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    setPlayingIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      className="section-px relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_48%,#F1F7F7_100%)] py-24 sm:py-32"
      id="workflows"
    >
      <div className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-[#00C2A8]/[0.07] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-[5%] h-80 w-80 rounded-full bg-[#5B8DEF]/[0.07] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[5%] top-[5%] h-24 w-24 rounded-full border border-[#00C2A8]/10"
        />

        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
            AI call demos · Inbound & outbound
          </p>
          <h2 className="mt-5 font-body text-[2.35rem] font-bold leading-[1.04] tracking-[-0.055em] text-primary sm:text-[3.5rem] lg:text-[4.2rem]">
            Listen to AI agents in action
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-7 text-[#64748B] sm:text-[17px]">
            Explore real call scenarios for appointments, support, lead
            qualification, reminders, and more—across inbound and outbound
            workflows.
          </p>

          <div className="relative mx-auto mt-9 flex w-fit rounded-[18px] border border-[#0E1726]/[0.07] bg-white p-1 shadow-[0_10px_30px_rgba(14,23,38,0.07)]">
            {(["inbound", "outbound"] as Mode[]).map((option) => {
              const active = mode === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => changeMode(option)}
                  className={`relative z-10 min-w-[112px] rounded-[14px] px-5 py-3 text-[13px] font-bold capitalize transition-colors sm:min-w-[132px] sm:text-[14px] ${
                    active ? "text-white" : "text-[#526078]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="workflow-mode"
                      className="absolute inset-0 -z-10 rounded-[14px] bg-[#0E1726] shadow-sm"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  {option}
                </button>
              );
            })}
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
          >
            {USE_CASES[mode].map((item, index) => (
              <UseCaseCard
                key={`${mode}-${item.title}`}
                item={item}
                index={index}
                visible={visible}
                playing={playingIndex === index}
                onPlay={() =>
                  setPlayingIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
