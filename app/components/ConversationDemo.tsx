"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Agent {
  id: string;
  name: string;
  category: string;
  title: string;
  description: string;
  audioPath: string;
  bgColor: string;    // soft background of expanded panel
  textColor: string;  // text color inside expanded panel
  pillBg: string;     // color of category pill
  themeColor: string; // play button and track color
  accentColor: string;// shadow/glow color
}

const AGENTS: Agent[] = [
  {
    id: "priya",
    name: "Priya",
    category: "Healthcare",
    title: "Care Triage / Dental Clinic",
    description: "Listen how our AI Voice Agent politely reminds a patient about their clinic visit and answers their queries.",
    audioPath: "/mp3/priya-healthcare.mp3",
    bgColor: "bg-[#F3E8FF]", // Light purple
    textColor: "text-[#3B1E6C]",
    pillBg: "bg-[#7C3AED]",
    themeColor: "bg-[#7C3AED]",
    accentColor: "rgba(124, 58, 237, 0.3)",
  },
  {
    id: "meera",
    name: "Meera",
    category: "Support",
    title: "Table Booking / Restaurant",
    description: "Listen how our AI Voice Agent handles a reservation inquiry, checks availability, and confirms a booking.",
    audioPath: "/mp3/meera-restaurant.mp3",
    bgColor: "bg-[#E6FDF9]", // Light teal
    textColor: "text-[#115E59]",
    pillBg: "bg-[#0D9488]",
    themeColor: "bg-[#0D9488]",
    accentColor: "rgba(13, 148, 136, 0.3)",
  },
  {
    id: "rohan",
    name: "Rohan",
    category: "Sales",
    title: "Real Estate Demo Agent",
    description: "Listen how our AI Voice Agent explains our real estate listings and qualifies a potential lead.",
    audioPath: "/mp3/rohan-realestate.mp3",
    bgColor: "bg-[#FEF3C7]", // Light amber/orange
    textColor: "text-[#78350F]",
    pillBg: "bg-[#D97706]",
    themeColor: "bg-[#D97706]",
    accentColor: "rgba(217, 119, 6, 0.3)",
  },
  {
    id: "kavya",
    name: "Kavya",
    category: "Automotive",
    title: "Service Scheduling",
    description: "Listen how our AI Voice Agent schedules a periodic car servicing and books the service center slot.",
    audioPath: "/mp3/kavya-automotive.mp3",
    bgColor: "bg-[#EFF6FF]", // Light blue
    textColor: "text-[#1E40AF]",
    pillBg: "bg-[#2563EB]",
    themeColor: "bg-[#2563EB]",
    accentColor: "rgba(37, 99, 237, 0.3)",
  },
];

function VoiceWaveform({ isPlaying, colorClass = "bg-white" }: { isPlaying: boolean; colorClass?: string }) {
  const bars = [0, 1, 2, 3, 4];
  const heights = [10, 22, 16, 26, 12];
  return (
    <div className="flex items-center gap-[3px] h-8 px-2 flex-shrink-0">
      {bars.map((i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${colorClass}`}
          animate={
            isPlaying
              ? { height: [heights[i], heights[i] * 1.5, heights[i] * 0.4, heights[i] * 1.2, heights[i]] }
              : { height: 8 }
          }
          transition={{
            duration: 1.2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  );
}

export default function ConversationDemo() {
  const [activeId, setActiveId] = useState<string>("priya");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // If active card changes, stop any playing audio from the previous card
    stopAudio();
  }, [activeId]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setPlayingId(null);
    setCurrentTime(0);
    setIsMockMode(false);
  };

  const togglePlay = (agentId: string, audioPath: string) => {
    if (playingId === agentId && isPlaying) {
      // Pause
      if (isMockMode) {
        setIsPlaying(false);
      } else if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    if (playingId === agentId && !isPlaying) {
      // Resume
      if (isMockMode) {
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio play failed on resume, entering mock mode:", err);
          setIsMockMode(true);
        });
        setIsPlaying(true);
      }
      return;
    }

    // Stop current playing audio
    stopAudio();

    setPlayingId(agentId);
    setIsPlaying(true);

    // Try playing real audio
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setPlayingId(null);
      setCurrentTime(0);
    });

    audio.addEventListener("error", () => {
      console.warn(`Audio file not found at ${audioPath}, falling back to mock simulation.`);
      setIsMockMode(true);
      setDuration(24); // 24-second mock audio length
      setCurrentTime(0);
    });

    audio.play().catch((err) => {
      console.warn("Audio play failed, entering mock simulation:", err);
      setIsMockMode(true);
      setDuration(24);
      setCurrentTime(0);
    });
  };

  // Mock playback tick handler
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isMockMode) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            setPlayingId(null);
            setIsMockMode(false);
            return 0;
          }
          return prev + 0.2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isMockMode, duration]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playingId !== activeId) return; // Only scrub if it is the current active card's audio
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    setCurrentTime(newTime);

    if (isMockMode) {
      // Just update local mock progress
    } else if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="px-4 sm:px-6 lg:px-6 pt-28 pb-20 sm:pt-36 sm:pb-28 bg-[#F8FAFC] border-b border-[#0E1726]/5 overflow-hidden scroll-mt-24" id="hear-it-live">
      <div className="max-w-[1480px] mx-auto flex flex-col items-center relative">

        {/* ── Title block with custom badges & handwritten notes ── */}
        <div className="relative text-center mb-16 max-w-3xl mx-auto w-full px-4">
          {/* Rotated language badge - centered on mobile, absolute left on desktop */}
          <motion.div 
            initial={{ rotate: -6, scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute left-1/2 -translate-x-1/2 lg:left-[-10px] lg:translate-x-0 top-[-35px] rotate-[-6deg] lg:rotate-[-12deg] bg-[#FFD02B] text-[#0E1726] px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-[10.5px] font-bold shadow-md tracking-wider border border-[#0E1726]/5 z-10 w-max"
          >
            in 40+ languages
          </motion.div>

          {/* Headline */}
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] sm:text-[3.2rem] leading-tight tracking-tight max-w-2xl mx-auto mt-4">
            Deploy AI voice agents that sound <br className="hidden sm:inline" /> human and work 24/7
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-[14px] sm:text-[16px] text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Deliver spectacular customer experience with round-the-clock human-like interactions, 400+ AI voices and in 40 global languages.
          </p>

          {/* Right handwritten note & curly arrow (Desktop only) */}
          <div className="hidden lg:block absolute right-[-40px] top-[15px] pointer-events-none w-48 z-10">
            <span className="font-handwritten text-[22px] text-[#334155] rotate-[8deg] inline-block font-semibold">
              Click to Play Recordings
            </span>
            <div className="relative w-24 h-20 ml-6 -mt-1 text-[#475569]">
              <svg width="80" height="70" viewBox="0 0 80 70" fill="none" stroke="currentColor">
                <motion.path
                  d="M 50 5 C 35 20, 65 35, 20 45"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 28 36 L 16 46 L 27 52"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Subtitle header indicator ── */}
        <div className="w-full max-w-[1480px] mb-6 flex items-center gap-2 text-[#64748B] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-4 lg:px-0">
          <span className="material-symbols-outlined text-[13px] sm:text-[14px]">headset</span>
          400+ Neural Voices For Lifelike Voice Agents
        </div>

        {/* ── Agents Showcase Accordion ── */}
        <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1480px] px-4 lg:px-0 lg:h-[460px]">
          {AGENTS.map((agent) => {
            const isActive = activeId === agent.id;
            const isAgentPlaying = playingId === agent.id && isPlaying;
            const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

            return (
              <motion.div
                key={agent.id}
                onClick={() => {
                  if (!isActive) setActiveId(agent.id);
                }}
                whileHover={!isActive ? { y: -6, boxShadow: "0 12px 30px rgba(14,23,38,0.15)" } : {}}
                className={`relative rounded-[28px] overflow-hidden cursor-pointer border shadow-sm w-full lg:h-full ${
                  isActive
                    ? `${agent.bgColor} border-${agent.themeColor}/10 lg:flex-grow p-0 flex flex-col lg:flex-row`
                    : "bg-white border-[#0E1726]/5 h-[80px] lg:w-[140px] xl:w-[170px] p-3 lg:p-0 flex flex-row lg:flex-col items-center lg:justify-end lg:items-stretch gap-4 flex-shrink-0"
                }`}
                layout
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  mass: 1
                }}
              >
                <AnimatePresence mode="wait">
                  {!isActive ? (
                    <motion.div
                      key="collapsed"
                      className="flex flex-row lg:flex-col items-center lg:justify-end lg:items-stretch lg:h-full gap-4 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Desktop Portrait Background - covers 100% of card, no paddings */}
                      <div
                        className="hidden lg:block absolute inset-0 bg-cover bg-no-repeat bg-center"
                        style={{
                          backgroundImage: `url('/images/${agent.id}-animated.png')`,
                        }}
                      />
                      {/* Circle avatar on mobile */}
                      <div
                        className="lg:hidden w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center border border-[#0E1726]/10 flex-shrink-0 shadow-sm"
                        style={{
                          backgroundImage: `url('/images/${agent.id}-animated.png')`,
                        }}
                      />
                      {/* Label Badge */}
                      <div className="relative z-10 flex lg:justify-center mt-0 lg:mt-auto w-full lg:w-auto lg:p-4">
                        <div className="bg-slate-50 lg:bg-white/95 lg:backdrop-blur-md px-4 py-1.5 rounded-full font-mono text-[11.5px] font-bold text-[#0E1726] shadow-sm border border-[#0E1726]/8 lg:border-[#0E1726]/5 tracking-wider w-max">
                          {agent.name}
                        </div>
                      </div>
                      {/* Open arrow (mobile indicator) */}
                      <span className="material-symbols-outlined text-[18px] text-[#64748B] ml-auto lg:hidden">
                        keyboard_arrow_right
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      className="flex flex-col lg:flex-row w-full lg:h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                      {/* Portrait on Left - flush with top/bottom/left edges of card */}
                      <div className="w-full lg:w-[320px] xl:w-[360px] h-[240px] lg:h-full relative overflow-hidden flex-shrink-0">
                        <div
                          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
                          style={{
                            backgroundImage: `url('/images/${agent.id}-animated.png')`,
                          }}
                        />
                        {/* Ambient shadow gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full font-mono text-[11px] font-bold text-[#0E1726] shadow-sm border border-[#0E1726]/5">
                          {agent.name}
                        </div>
                      </div>

                      {/* Content on Right - padded cleanly inside the panel */}
                      <div className={`flex flex-col justify-between flex-grow ${agent.textColor} p-5 sm:p-6 lg:p-8 min-w-0`}>
                        <div className="mb-4">
                          {/* Category badge */}
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider text-white ${agent.pillBg}`}>
                              {agent.category}
                            </span>
                            {isAgentPlaying && (
                              <div className="flex items-center gap-1.5">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
                                </span>
                                <span className="font-mono text-[8px] uppercase tracking-widest font-bold opacity-80">Playing</span>
                              </div>
                            )}
                          </div>

                          {/* Agent Title */}
                          <h3 className="font-headline font-bold text-[1.6rem] sm:text-[1.8rem] leading-tight mb-2 tracking-tight">
                            {agent.title}
                          </h3>

                          {/* Agent Description */}
                          <p className="text-[13.5px] sm:text-[14px] leading-relaxed opacity-90 font-body font-medium max-w-lg">
                            {agent.description}
                          </p>
                        </div>

                        {/* Player controls */}
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-sm border border-white/40 mt-auto w-full">
                          
                          {/* Play/Pause Button */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlay(agent.id, agent.audioPath);
                            }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0 cursor-pointer ${
                              agent.themeColor
                            }`}
                            style={{ boxShadow: `0 4px 14px ${agent.accentColor}` }}
                          >
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                              {isAgentPlaying ? "pause" : "play_arrow"}
                            </span>
                          </motion.button>

                          {/* Waveform indicator when playing (hidden on smaller screen widths) */}
                          <div className="hidden xl:block">
                            <VoiceWaveform isPlaying={isAgentPlaying} colorClass={agent.pillBg} />
                          </div>

                          {/* Progress Bar Track */}
                          <div className="flex-grow flex flex-col gap-1.5 min-w-0">
                            <div
                              onClick={handleProgressClick}
                              className="h-2 w-full bg-[#0E1726]/5 rounded-full overflow-hidden relative cursor-pointer group"
                            >
                              {/* Active track filling */}
                              <div
                                className={`h-full absolute left-0 top-0 transition-all duration-100 ${agent.themeColor}`}
                                style={{ width: `${progressPercent}%` }}
                              />
                              {/* Hover hover handle indicator */}
                              <div
                                className="absolute h-3 w-3 bg-white border border-slate-300 rounded-full -top-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                style={{ left: `calc(${progressPercent}% - 6px)` }}
                              />
                            </div>
                            <div className="flex justify-between font-mono text-[8.5px] text-[#64748B] font-bold">
                              <span>{formatTime(currentTime)}</span>
                              <span>{formatTime(duration)}</span>
                            </div>
                          </div>

                          {/* Download Trigger */}
                          <motion.a
                            href={agent.audioPath}
                            download
                            onClick={(e) => e.stopPropagation()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-slate-50 border border-slate-200 text-[#475569] hover:bg-slate-100 hover:text-[#0E1726] flex items-center justify-center flex-shrink-0 shadow-sm transition-all"
                            title="Download demo MP3"
                          >
                            <span className="material-symbols-outlined text-[14px] sm:text-[15px]">download</span>
                          </motion.a>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
