"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "healthcare", label: "Healthcare", icon: "local_hospital" },
  { id: "realestate", label: "Real Estate", icon: "home" },
  { id: "restaurant", label: "Restaurant", icon: "restaurant" },
  { id: "automotive", label: "Automotive", icon: "directions_car" },
];

interface Dialogue {
  caller: string;
  ai: string;
  intent: string;
  action: string;
  actionLabel: string;
}

const DIALOGUES: Record<string, Dialogue> = {
  healthcare: {
    caller: "Can I book an appointment with Dr. Mehta for tomorrow evening?",
    ai: "Of course. Dr. Mehta has slots at 5:30 PM and 6:15 PM. Which one works best?",
    intent: "Appointment Booking",
    action: "Appointment Scheduled",
    actionLabel: "APPOINTMENT SCHEDULED",
  },
  realestate: {
    caller: "I'm interested in the 3BHK apartment near Adyar. Can I visit this weekend?",
    ai: "Sure. I can schedule a property visit for Saturday at 11 AM or 4 PM.",
    intent: "Property Visit Request",
    action: "Site Visit Booked",
    actionLabel: "SITE VISIT BOOKED",
  },
  restaurant: {
    caller: "Can I reserve a table for four tonight at 8?",
    ai: "Yes, a table for four is available at 8 PM. I've reserved it under your name.",
    intent: "Restaurant Booking",
    action: "Table Reserved",
    actionLabel: "TABLE RESERVED",
  },
  automotive: {
    caller: "Can I book my car for a standard periodic service this Friday?",
    ai: "Sure. The service center has slots at 11 AM and 3 PM. Which time works best?",
    intent: "Service Booking",
    action: "Service Booked",
    actionLabel: "SERVICE BOOKED",
  },
};

// Audio file mapping for industries
const AUDIO_FILES: Record<string, string> = {
  healthcare: "/audio/healthcare-demo.mp3",
  realestate: "/audio/real-estate-demo.mp3",
  restaurant: "/audio/restaurant-demo.mp3",
  automotive: "/audio/automotive-demo.mp3",
};

// Waveform Component
function VoiceWaveform({ 
  isActive, 
  size = "medium",
  reduceMotion = false 
}: { 
  isActive: boolean; 
  size?: "small" | "medium";
  reduceMotion?: boolean;
}) {
  const bars = size === "small" ? 4 : 6;
  const heights = size === "small" 
    ? [8, 12, 10, 8] 
    : [10, 16, 20, 16, 12, 10];

  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${
            isActive ? "bg-secondary" : "bg-[#64748B]/30"
          }`}
          animate={
            isActive && !reduceMotion
              ? {
                  height: [
                    heights[i],
                    heights[i] * 1.8,
                    heights[i] * 0.6,
                    heights[i] * 1.4,
                    heights[i],
                  ],
                }
              : { height: heights[i] }
          }
          transition={{
            duration: 1.2,
            repeat: isActive && !reduceMotion ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Call Timeline Component
function CallTimeline({ step }: { step: number }) {
  const steps = [
    { label: "Caller speaks", icon: "person" },
    { label: "AI listens", icon: "hearing" },
    { label: "AI responds", icon: "smart_toy" },
    { label: "Action completed", icon: "check_circle" },
  ];

  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
              step >= i
                ? "bg-secondary/10 border-secondary/30 text-secondary"
                : "bg-[#F8FAFC] border-[#0E1726]/5 text-[#64748B]"
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">
              {s.icon}
            </span>
            <span className="font-mono text-[8px] font-bold uppercase tracking-wider hidden sm:inline">
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <motion.div
              className="h-[2px] w-4 bg-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step > i ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ConversationDemo() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const [inView, setInView] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playStep, setPlayStep] = useState(0);
  const [callTimer, setCallTimer] = useState(0);
  const [callStatus, setCallStatus] = useState("Live call simulation");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioMode, setAudioMode] = useState<"file" | "speech" | "unavailable">("speech");
  const [buttonState, setButtonState] = useState<"play" | "playing" | "stop">("play");
  
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  
  const dialogue = DIALOGUES[activeTab];

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Cleanup audio and speech on unmount or tab change
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Stop audio when tab changes
  useEffect(() => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
      setButtonState("play");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Stop audio function
  const stopAudio = () => {
    // Clear all timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // Stop and cleanup audio file
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    // Cancel all speech synthesis
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utterancesRef.current = [];
  };

  // Auto-cycling tabs every 4.8 seconds if user hasn't interacted
  useEffect(() => {
    if (userClicked || isPlaying) return;
    const id = setInterval(() => {
      setActiveTab((prev) => {
        const idx = TABS.findIndex((t) => t.id === prev);
        const nextIdx = (idx + 1) % TABS.length;
        return TABS[nextIdx].id;
      });
    }, 4800);
    return () => clearInterval(id);
  }, [userClicked, isPlaying]);

  // Try to load audio file, fallback to speech synthesis
  const tryLoadAudioFile = async (industry: string): Promise<boolean> => {
    const audioPath = AUDIO_FILES[industry];
    if (!audioPath) return false;

    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = audioPath;
      
      const handleCanPlay = () => {
        audioRef.current = audio;
        setAudioMode("file");
        audio.removeEventListener("canplaythrough", handleCanPlay);
        audio.removeEventListener("error", handleError);
        resolve(true);
      };

      const handleError = () => {
        audio.removeEventListener("canplaythrough", handleCanPlay);
        audio.removeEventListener("error", handleError);
        resolve(false);
      };

      audio.addEventListener("canplaythrough", handleCanPlay);
      audio.addEventListener("error", handleError);
      
      // Timeout after 2 seconds
      setTimeout(() => {
        audio.removeEventListener("canplaythrough", handleCanPlay);
        audio.removeEventListener("error", handleError);
        resolve(false);
      }, 2000);
    });
  };

  // Play using Speech Synthesis API
  const playSpeechSynthesis = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setAudioMode("unavailable");
      console.warn("Speech Synthesis API not available");
      return;
    }

    setAudioMode("speech");

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find good voices for caller and AI
    const callerVoice = voices.find(v => v.lang.startsWith("en") && !v.name.includes("Google")) || voices[0];
    const aiVoice = voices.find(v => v.lang.startsWith("en") && v.name.includes("Google")) || voices[1] || voices[0];

    // Step 0: Start
    setPlayStep(0);
    setCallStatus("Listening…");

    // Step 1: Caller speaks (0.5s delay then speak)
    const timer1 = setTimeout(() => {
      setPlayStep(1);
      setCallStatus("Caller speaking…");

      if (!isMuted) {
        const callerUtterance = new SpeechSynthesisUtterance(dialogue.caller);
        callerUtterance.voice = callerVoice;
        callerUtterance.rate = 0.95;
        callerUtterance.pitch = 1.0;
        callerUtterance.volume = 0.8;

        callerUtterance.onend = () => {
          // Step 2: Processing (after caller finishes)
          setPlayStep(2);
          setCallStatus(`Processing… (${dialogue.intent})`);

          // Step 3: AI responds (1.5s processing delay)
          const timer3 = setTimeout(() => {
            setPlayStep(3);
            setCallStatus("AI responding…");

            if (!isMuted) {
              const aiUtterance = new SpeechSynthesisUtterance(dialogue.ai);
              aiUtterance.voice = aiVoice;
              aiUtterance.rate = 0.9;
              aiUtterance.pitch = 1.05;
              aiUtterance.volume = 0.9;

              aiUtterance.onend = () => {
                // Step 4: Action completed (0.8s after AI finishes)
                const timer4 = setTimeout(() => {
                  setPlayStep(4);
                  setCallStatus(dialogue.actionLabel);

                  // Reset after 2.5s
                  const timer5 = setTimeout(() => {
                    setIsPlaying(false);
                    setButtonState("play");
                    setPlayStep(0);
                    setCallTimer(0);
                    setCallStatus("Live call simulation");
                  }, 2500);
                  timersRef.current.push(timer5);
                }, 800);
                timersRef.current.push(timer4);
              };

              utterancesRef.current.push(aiUtterance);
              window.speechSynthesis.speak(aiUtterance);
            } else {
              // If muted, still advance visually
              const timer4 = setTimeout(() => {
                setPlayStep(4);
                setCallStatus(dialogue.actionLabel);
                const timer5 = setTimeout(() => {
                  setIsPlaying(false);
                  setButtonState("play");
                  setPlayStep(0);
                  setCallTimer(0);
                  setCallStatus("Live call simulation");
                }, 2500);
                timersRef.current.push(timer5);
              }, 3500);
              timersRef.current.push(timer4);
            }
          }, 1500);
          timersRef.current.push(timer3);
        };

        utterancesRef.current.push(callerUtterance);
        window.speechSynthesis.speak(callerUtterance);
      } else {
        // If muted, simulate timing
        const timer2 = setTimeout(() => {
          setPlayStep(2);
          setCallStatus(`Processing… (${dialogue.intent})`);
          const timer3 = setTimeout(() => {
            setPlayStep(3);
            setCallStatus("AI responding…");
            const timer4 = setTimeout(() => {
              setPlayStep(4);
              setCallStatus(dialogue.actionLabel);
              const timer5 = setTimeout(() => {
                setIsPlaying(false);
                setButtonState("play");
                setPlayStep(0);
                setCallTimer(0);
                setCallStatus("Live call simulation");
              }, 2500);
              timersRef.current.push(timer5);
            }, 3500);
            timersRef.current.push(timer4);
          }, 1500);
          timersRef.current.push(timer3);
        }, 3000);
        timersRef.current.push(timer2);
      }
    }, 500);
    timersRef.current.push(timer1);

    // Call timer
    const timerInterval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    timersRef.current.push(timerInterval as any);
  };

  // Play using audio file
  const playAudioFile = () => {
    if (!audioRef.current) return;

    setAudioMode("file");
    const audio = audioRef.current;

    if (!isMuted) {
      audio.volume = 1.0;
      audio.play().catch(err => {
        console.warn("Audio playback failed:", err);
        // Fallback to speech synthesis
        playSpeechSynthesis();
      });
    }

    // Sync visual timeline with audio (approximate timing for generic demo)
    // These timings should be adjusted based on actual audio file durations
    setPlayStep(0);
    setCallStatus("Listening…");

    const timer1 = setTimeout(() => {
      setPlayStep(1);
      setCallStatus("Caller speaking…");
    }, 500);
    timersRef.current.push(timer1);

    const timer2 = setTimeout(() => {
      setPlayStep(2);
      setCallStatus(`Processing… (${dialogue.intent})`);
    }, 3000);
    timersRef.current.push(timer2);

    const timer3 = setTimeout(() => {
      setPlayStep(3);
      setCallStatus("AI responding…");
    }, 4500);
    timersRef.current.push(timer3);

    const timer4 = setTimeout(() => {
      setPlayStep(4);
      setCallStatus(dialogue.actionLabel);
    }, 8000);
    timersRef.current.push(timer4);

    const timer5 = setTimeout(() => {
      setIsPlaying(false);
      setButtonState("play");
      setPlayStep(0);
      setCallTimer(0);
      setCallStatus("Live call simulation");
    }, 10000);
    timersRef.current.push(timer5);

    // Call timer
    const timerInterval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    timersRef.current.push(timerInterval as any);

    // Handle audio end
    audio.onended = () => {
      setIsPlaying(false);
      setButtonState("play");
      setPlayStep(0);
      setCallTimer(0);
      setCallStatus("Live call simulation");
    };
  };

  // Call demo playback logic - REMOVED (replaced with audio functions above)

  const handleTabClick = (tabId: string) => {
    if (isPlaying) return; // Prevent tab switching during playback
    setActiveTab(tabId);
    setUserClicked(true);
  };

  const handlePlayDemo = async () => {
    if (isPlaying) {
      // Stop playback
      stopAudio();
      setIsPlaying(false);
      setButtonState("play");
      setPlayStep(0);
      setCallTimer(0);
      setCallStatus("Live call simulation");
      return;
    }

    // Start playback
    setIsPlaying(true);
    setButtonState("playing");
    stopAudio(); // Clear any previous audio

    // Try to load audio file first
    const audioLoaded = await tryLoadAudioFile(activeTab);

    if (audioLoaded) {
      // Play audio file
      playAudioFile();
    } else {
      // Fallback to speech synthesis
      playSpeechSynthesis();
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    
    // If currently playing, adjust audio
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.muted = !isMuted;
      }
      // Speech synthesis can't be muted mid-speech, so we just track state
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-px py-20 sm:py-28 bg-white border-b border-[#0E1726]/5 overflow-hidden" 
      id="hear-it-live"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Simple Label */}
        <div className="text-center mb-10 max-w-xl">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-3">
            03 · Platform Conversations
          </p>
          <h2 className="font-headline font-extrabold text-[#0E1726] text-[1.8rem] sm:text-[2.6rem] leading-tight tracking-tight">
            Conversations that flow naturally
          </h2>
        </div>

        {/* Industry Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-[#F8FAFC] border border-[#0E1726]/5 p-1.5 rounded-2xl max-w-lg w-full">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                disabled={isPlaying}
                className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isActive
                    ? "bg-white text-secondary shadow-[0_2px_8px_rgba(14,23,38,0.03)] border border-[#0E1726]/3"
                    : "text-[#64748B] hover:text-[#0E1726] border border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ color: isActive ? "#00C2A8" : "inherit" }}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Play Demo Button with Mute Toggle */}
        <div className="mb-6 flex items-center gap-3">
          <motion.button
            onClick={handlePlayDemo}
            whileHover={!isPlaying || buttonState !== "playing" ? { scale: 1.02 } : {}}
            whileTap={!isPlaying || buttonState !== "playing" ? { scale: 0.98 } : {}}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg transition-all border ${
              isPlaying
                ? "bg-red-500 text-white border-red-600 shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30"
                : "bg-secondary text-white border-secondary/20 shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30"
            }`}
            aria-label={isPlaying ? "Stop demo" : "Play call demo"}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? "stop_circle" : "play_circle"}
            </span>
            {isPlaying ? "Stop Demo" : buttonState === "play" ? "Play Call Demo" : "Replay Demo"}
          </motion.button>

          {/* Mute/Unmute Button */}
          <motion.button
            onClick={handleToggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#0E1726]/10 text-[#64748B] hover:text-[#0E1726] hover:border-[#0E1726]/20 transition-all shadow-sm"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            title={isMuted ? "Unmute" : "Mute"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
          </motion.button>

          {/* Audio mode indicator (only show in dev or for debugging) */}
          {audioMode === "unavailable" && isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700"
            >
              <span className="material-symbols-outlined text-[12px]">info</span>
              <span className="font-mono text-[9px] font-bold">Audio unavailable</span>
            </motion.div>
          )}
        </div>

        {/* Full-width Interactive Call Card */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-[32px] border bg-white p-6 sm:p-10 shadow-card flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${
            isPlaying && playStep >= 1 && playStep <= 3
              ? "border-secondary/30 shadow-[0_0_40px_rgba(0,194,168,0.15)]"
              : "border-[#0E1726]/5"
          }`}
          style={{ minHeight: "480px" }}
        >
          {/* Ambient Gradient Background */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isPlaying && playStep >= 1 && playStep <= 3
              ? "opacity-100 bg-gradient-to-br from-secondary/5 via-transparent to-[#5B8DEF]/5"
              : "opacity-50 bg-gradient-to-tr from-secondary/3 via-transparent to-[#5B8DEF]/3"
          }`} />

          {/* Call Status Header */}
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#0E1726]/5 pb-4 mb-6 z-10 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                  {callStatus}
                </span>
              </div>
              {isPlaying && (
                <div className="flex items-center gap-1.5 bg-[#0E1726] text-white px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-[10px]">timer</span>
                  <span className="font-mono text-[10px] font-bold">
                    {formatTime(callTimer)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-[#0E1726]/5 border border-[#0E1726]/10 px-3 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[12px] text-secondary">
                language
              </span>
              <span className="font-mono text-[9px] text-[#334155] font-bold uppercase">
                {TABS.find((t) => t.id === activeTab)?.label} Voice AI
              </span>
            </div>
          </div>

          {/* Call Timeline */}
          <div className="relative z-10 mb-6 overflow-x-auto">
            <CallTimeline step={playStep} />
          </div>

          {/* Conversational Bubbles */}
          <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Caller Message */}
                <motion.div
                  initial={isPlaying ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                  animate={
                    isPlaying && playStep >= 1
                      ? { opacity: 1, x: 0 }
                      : isPlaying
                      ? { opacity: 0, x: -20 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3 self-start max-w-[90%]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E1726] to-[#1E293B] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-white">
                      person
                    </span>
                  </div>
                  <div className={`bg-[#F8FAFC] border rounded-2xl rounded-tl-sm p-4 shadow-sm text-left transition-all ${
                    isPlaying && playStep === 1
                      ? "border-secondary/30 shadow-lg shadow-secondary/10"
                      : "border-[#0E1726]/5"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[9px] font-bold font-mono text-[#64748B] uppercase">
                        Caller
                      </p>
                      <VoiceWaveform 
                        isActive={isPlaying && playStep === 1} 
                        size="small"
                        reduceMotion={reduceMotion}
                      />
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-[#0E1726] font-medium leading-relaxed">
                      "{dialogue.caller}"
                    </p>
                  </div>
                </motion.div>

                {/* AI Processing Indicator */}
                {isPlaying && playStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center gap-2 py-2"
                  >
                    <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-4 py-2 rounded-full">
                      <VoiceWaveform isActive={true} size="small" reduceMotion={reduceMotion} />
                      <span className="font-mono text-[10px] font-bold text-secondary uppercase">
                        Intent: {dialogue.intent}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* AI Response */}
                <motion.div
                  initial={isPlaying ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  animate={
                    isPlaying && playStep >= 3
                      ? { opacity: 1, x: 0 }
                      : isPlaying
                      ? { opacity: 0, x: 20 }
                      : { opacity: 1, x: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-start gap-3 self-end flex-row-reverse max-w-[90%]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-[#00A890] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-white">
                      smart_toy
                    </span>
                  </div>
                  <div className={`bg-[#0E1726] text-white rounded-2xl rounded-tr-sm p-4 shadow-md border text-left transition-all ${
                    isPlaying && playStep === 3
                      ? "border-secondary/50 shadow-xl shadow-secondary/20"
                      : "border-white/5"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[9px] font-bold font-mono text-secondary uppercase">
                        Xyras AI Agent
                      </p>
                      <VoiceWaveform 
                        isActive={isPlaying && playStep === 3} 
                        size="small"
                        reduceMotion={reduceMotion}
                      />
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-white leading-relaxed">
                      "{dialogue.ai}"
                    </p>
                  </div>
                </motion.div>

                {/* Action Success Chip */}
                <motion.div
                  initial={isPlaying ? { opacity: 0, y: 10, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
                  animate={
                    isPlaying && playStep >= 4
                      ? { opacity: 1, y: 0, scale: 1 }
                      : isPlaying
                      ? { opacity: 0, y: 10, scale: 0.9 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: isPlaying && playStep >= 4 ? 0.2 : 0
                  }}
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-secondary to-[#00E0B8] text-white px-5 py-2.5 rounded-full shadow-lg shadow-secondary/30">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                      {dialogue.actionLabel}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicator Dot Navigation */}
          <div className="relative flex justify-center gap-1.5 mt-8 z-10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                disabled={isPlaying}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${
                  activeTab === tab.id ? "bg-secondary w-5" : "bg-[#0E1726]/15 hover:bg-[#0E1726]/30"
                }`}
                aria-label={`Switch to ${tab.label}`}
              />
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
