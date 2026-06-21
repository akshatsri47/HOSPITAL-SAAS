"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Mode = "inbound" | "outbound";

type UseCase = {
  title: string;
  description: string;
  agent: string;
  role: string;
  accent: string;
  accentDeep: string;
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
      accentDeep: "#087F80",
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
      accentDeep: "#395CB8",
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
      accent: "#77C7FF",
      accentDeep: "#2677AE",
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
      accentDeep: "#087F80",
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
      accentDeep: "#395CB8",
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
      accent: "#77C7FF",
      accentDeep: "#2677AE",
      icon: "event_available",
      language: "English · IN",
      action: "Visit Confirmed",
    },
  ],
};

function EnergyOrb({
  item,
  active,
  onToggle,
}: {
  item: UseCase;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <motion.div
        animate={{
          scale: active ? [0.96, 1.04, 0.96] : 1,
          opacity: active ? [0.28, 0.48, 0.28] : 0.28,
        }}
        transition={{ duration: 3.4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className="absolute inset-[14%] rounded-full blur-[44px]"
        style={{ backgroundColor: item.accent }}
      />

      {[0, 1, 2, 3, 4].map((ring) => {
        const horizontal = ring < 3;
        const width = horizontal ? 88 - ring * 5 : 47 + (ring - 3) * 14;
        const height = horizontal ? 44 + ring * 9 : 89;
        const start = horizontal ? -15 + ring * 28 : 48 + (ring - 3) * 63;

        return (
          <motion.div
            key={ring}
            animate={{
              rotate: active
                ? ring % 2
                  ? [start, start - 360]
                  : [start, start + 360]
                : start,
              opacity: active ? [0.48, 0.72, 0.48] : 0.52,
            }}
            transition={{
              rotate: {
                duration: 13 + ring * 2,
                repeat: active ? Infinity : 0,
                ease: "linear",
              },
              opacity: { duration: 3.2, repeat: active ? Infinity : 0 },
            }}
            className="absolute left-1/2 top-1/2 rounded-[50%] border"
            style={{
              width: `${width}%`,
              height: `${height}%`,
              x: "-50%",
              y: "-50%",
              borderColor: `${item.accent}${ring === 0 ? "F0" : "8A"}`,
              boxShadow: `0 0 ${12 + ring * 5}px ${item.accent}70, inset 0 0 14px ${item.accent}22`,
              filter: `blur(${ring === 4 ? 0.4 : 0}px)`,
            }}
          />
        );
      })}

      {[0, 1, 2, 3].map((dot) => (
        <motion.span
          key={dot}
          animate={{
            rotate: active ? 360 : dot * 90,
          }}
          transition={{
            duration: 10 + dot * 1.5,
            repeat: active ? Infinity : 0,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        >
          <span
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: dot === 3 ? "#FF6D6D" : item.accent,
              boxShadow: `0 0 18px ${dot === 3 ? "#FF6D6D" : item.accent}`,
            }}
          />
        </motion.span>
      ))}

      <motion.div
        animate={
          active
            ? {
                scale: [1, 1.035, 1],
                boxShadow: [
                  `0 0 30px ${item.accent}80, inset 0 0 22px rgba(255,255,255,.24)`,
                  `0 0 58px ${item.accent}D0, inset 0 0 30px rgba(255,255,255,.36)`,
                  `0 0 30px ${item.accent}80, inset 0 0 22px rgba(255,255,255,.24)`,
                ],
              }
            : {
                scale: 1,
                boxShadow: `0 0 45px ${item.accent}90, inset 0 0 26px rgba(255,255,255,.3)`,
              }
        }
        transition={{ duration: 3, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 z-10 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/55"
        style={{
          background: `radial-gradient(circle at 32% 25%, #FFFFFF 0%, ${item.accent} 19%, ${item.accentDeep} 64%, #07131F 100%)`,
        }}
      >
        <span className="material-symbols-outlined text-[44px] text-white drop-shadow-[0_4px_8px_rgba(4,20,32,.42)] sm:text-[58px]">
          {item.icon}
        </span>
      </motion.div>

      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="absolute bottom-[12%] right-[10%] z-20 flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/70 bg-white/90 text-[#0E1726] shadow-[0_16px_38px_rgba(5,25,40,.3)] backdrop-blur-xl"
        aria-label={active ? `Pause ${item.title}` : `Play ${item.title}`}
      >
        {active && (
          <motion.span
            animate={{ scale: [1, 1.42], opacity: [0.55, 0] }}
            transition={{ duration: 1.25, repeat: Infinity }}
            className="absolute inset-0 rounded-[20px] border"
            style={{ borderColor: item.accent }}
          />
        )}
        <span className="material-symbols-outlined text-[25px]">
          {active ? "pause" : "play_arrow"}
        </span>
      </motion.button>
    </div>
  );
}

function AgentCard({
  item,
  index,
  active,
  onToggle,
}: {
  item: UseCase;
  index: number;
  active: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), {
    stiffness: 100,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 100,
    damping: 28,
  });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const agentImage = `/images/${item.agent.toLowerCase()}-animated.png`;

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      initial={{ opacity: 0, scale: 0.92, y: 26 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -18 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-[30px] p-[5px] will-change-transform"
      data-cursor="card"
    >
      <div
        className="absolute inset-0 rounded-[30px]"
        style={{
          background: "#0E1726",
          boxShadow: `0 24px 70px rgba(5,22,36,.22), 0 0 0 1px ${item.accent}42, inset 0 0 18px ${item.accent}20`,
        }}
      />

      <div className="relative min-h-[580px] overflow-hidden rounded-[26px] border border-white/55 bg-[#DCE7E9] shadow-[inset_0_2px_1px_rgba(255,255,255,.8),inset_0_-40px_80px_rgba(9,42,54,.1)]">
        <div className="relative flex min-h-[580px] flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/55 bg-white/28 shadow-sm backdrop-blur-lg"
                style={{ color: "#0E1726" }}
              >
                <span className="material-symbols-outlined text-[20px]">
                  orbit
                </span>
              </span>
              <span className="font-headline text-[1.25rem] font-bold tracking-tight text-[#0E1726]">
                xyras<span style={{ color: item.accentDeep }}>.</span>
              </span>
            </div>
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-[#0E1726]/40">
              0{index + 1} · Voice
            </span>
          </div>

          <div className="relative mt-7 min-h-[265px]">
            <div className="relative z-10 w-[58%] pt-2">
              <p
                className="mb-3 font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
                style={{ color: item.accentDeep }}
              >
                Autonomous workflow
              </p>
              <h3 className="font-body text-[1.75rem] font-semibold leading-[1.04] tracking-[-0.052em] text-[#0E1726] xl:text-[1.95rem]">
                {item.title}
              </h3>
              <p className="mt-4 text-[12.5px] leading-[1.7] text-[#263A45]/75">
                {item.description}
              </p>
            </div>

            <div className="absolute -right-[15%] -top-[8%] w-[72%]">
              <EnergyOrb item={item} active={active} onToggle={onToggle} />
            </div>
          </div>

          <div className="relative mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/70 bg-white/78 px-3 py-1.5 font-mono text-[7px] font-bold uppercase tracking-[0.13em] text-[#0E1726] shadow-sm">
              Ready
            </span>
            <span className="rounded-full border border-white/50 bg-white/30 px-3 py-1.5 font-mono text-[7px] font-bold uppercase tracking-[0.13em] text-[#29424E]/80 backdrop-blur-md">
              {item.language}
            </span>
            <span
              className="rounded-full border px-3 py-1.5 font-mono text-[7px] font-bold uppercase tracking-[0.13em] text-[#0E3543]"
              style={{
                borderColor: `${item.accent}A6`,
                backgroundColor: `${item.accent}52`,
              }}
            >
              {item.action}
            </span>
          </div>

          <div className="relative mt-auto grid gap-3 border-t border-[#0E1726]/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex min-w-0 items-center gap-3 rounded-[20px] border border-white/45 bg-[#173746]/45 p-2 pr-3 shadow-[inset_0_1px_1px_rgba(255,255,255,.18),0_10px_28px_rgba(4,31,43,.12)] backdrop-blur-xl">
              <div
                className="h-12 w-12 shrink-0 rounded-full border-2 bg-cover bg-center shadow-[0_0_0_3px_rgba(255,255,255,.16)]"
                style={{
                  backgroundImage: `url('${agentImage}')`,
                  borderColor: item.accent,
                }}
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-white">
                  {item.agent}
                </p>
                <p className="mt-0.5 truncate text-[9px] text-white/62">
                  {item.role}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: item.accent,
                    boxShadow: `0 0 14px ${item.accent}`,
                  }}
                />
                <span className="font-mono text-[6px] font-bold uppercase tracking-[0.12em] text-white/72">
                  Online
                </span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={onToggle}
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ y: 2, scale: 0.98 }}
              className="min-h-[54px] rounded-[17px] border border-white/75 bg-white/90 px-4 font-mono text-[8px] font-bold uppercase tracking-[0.09em] text-[#0E3543] shadow-[0_7px_0_rgba(16,59,70,.17),0_15px_28px_rgba(5,36,47,.16)] backdrop-blur-xl transition hover:bg-white"
            >
              {active ? "Pause" : "Try demo"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function WorkflowShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, { once: true, amount: 0.1 });
  const [mode, setMode] = useState<Mode>("inbound");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const items = USE_CASES[mode];

  const changeMode = (nextMode: Mode) => {
    setMode(nextMode);
    setPlayingIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      className="section-px relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_48%,#F0F5F7_100%)] py-24 sm:py-32"
      id="workflows"
    >
      <div className="pointer-events-none absolute left-[6%] top-28 h-80 w-80 rounded-full bg-[#00C2A8]/[0.06] blur-[110px]" />
      <div className="pointer-events-none absolute bottom-12 right-[5%] h-[28rem] w-[28rem] rounded-full bg-[#5B8DEF]/[0.07] blur-[130px]" />

      <div className="relative mx-auto max-w-[1180px]">
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
            Explore live call systems designed for appointments, support, lead
            qualification, reminders, and more.
          </p>

          <div className="relative mx-auto mt-9 flex w-fit rounded-[18px] border border-[#0E1726]/[0.07] bg-white p-1 shadow-[0_10px_30px_rgba(14,23,38,0.07)]">
            {(["inbound", "outbound"] as Mode[]).map((option) => {
              const selected = mode === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => changeMode(option)}
                  className={`relative z-10 min-w-[112px] rounded-[14px] px-5 py-3 text-[13px] font-bold capitalize transition-colors sm:min-w-[132px] sm:text-[14px] ${
                    selected ? "text-white" : "text-[#526078]"
                  }`}
                >
                  {selected && (
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {items.map((item, index) => (
              <AgentCard
                key={`${mode}-${item.title}`}
                item={item}
                index={index}
                active={playingIndex === index}
                onToggle={() =>
                  setPlayingIndex((current) =>
                    current === index ? null : index,
                  )
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
