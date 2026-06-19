"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Language {
  name: string;
  nativeName: string;
  flagUrl: string;
  langCode: string; // SpeechSynthesis code
  sampleText: string;
}

const LANGUAGES: Language[] = [
  {
    name: "Hindi",
    nativeName: "हिंदी",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "hi-IN",
    sampleText: "नमस्ते, मैं आपका एआई वॉइस एजेंट हूँ। मैं आपकी क्या मदद कर सकता हूँ?",
  },
  {
    name: "English (India)",
    nativeName: "English",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "en-IN",
    sampleText: "Hello, this is your AI voice agent. How can I help you today?",
  },
  {
    name: "Tamil",
    nativeName: "தமிழ்",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "ta-IN",
    sampleText: "வணக்கம், நான் உங்கள் ஏஐ குரல் உதவியாளர். நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
  },
  {
    name: "Telugu",
    nativeName: "తెలుగు",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "te-IN",
    sampleText: "నమస్తే, నేను మీ ఏఐ వాయిస్ ఏజెంట్. ఈ రోజు మీకు ఏ విధంగా సహాయం చేయగలను?",
  },
  {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "kn-IN",
    sampleText: "ನಮಸ್ತೆ, ನಾನು ನಿಮ್ಮ ಎಐ ಧ್ವನಿ ಸಹಾಯಕ. ನಾನು ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
  },
  {
    name: "Malayalam",
    nativeName: "മലയാളം",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "ml-IN",
    sampleText: "നമസ്കാരം, ഞാൻ നിങ്ങളുടെ എഐ ശബ്ദ സഹായിയാണ്. ഇന്ന് ഞാൻ നിങ്ങൾക്ക് എങ്ങനെയാണ് സഹായിക്കേണ്ടത്?",
  },
  {
    name: "Marathi",
    nativeName: "मराठी",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "mr-IN",
    sampleText: "नमस्कार, मी तुमचा एआय व्हॉईस असिस्टंट आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
  },
  {
    name: "Bengali",
    nativeName: "বাংলা",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "bn-IN",
    sampleText: "নমস্কার, আমি আপনার এআই ভয়েস এজেন্ট। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
  },
  {
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flagUrl: "https://flagcdn.com/w80/in.png",
    langCode: "gu-IN",
    sampleText: "નમસ્તે, હું તમારો એઆઈ વોઈस એજન્ટ છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
  },
  {
    name: "Spanish",
    nativeName: "Español",
    flagUrl: "https://flagcdn.com/w80/es.png",
    langCode: "es-ES",
    sampleText: "Hola, soy tu agente de voz con IA. ¿Cómo puedo ayudarte hoy?",
  },
  {
    name: "French",
    nativeName: "Français",
    flagUrl: "https://flagcdn.com/w80/fr.png",
    langCode: "fr-FR",
    sampleText: "Bonjour, je suis votre agent vocal IA. Comment puis-je vous aider aujourd'hui?",
  },
  {
    name: "German",
    nativeName: "Deutsch",
    flagUrl: "https://flagcdn.com/w80/de.png",
    langCode: "de-DE",
    sampleText: "Hallo, ich bin Ihr KI-Sprachassistent. Wie kann ich Ihnen heute helfen?",
  },
  {
    name: "Italian",
    nativeName: "Italiano",
    flagUrl: "https://flagcdn.com/w80/it.png",
    langCode: "it-IT",
    sampleText: "Ciao, sono il tuo agente vocale IA. Come posso aiutarti oggi?",
  },
  {
    name: "Arabic",
    nativeName: "العربية",
    flagUrl: "https://flagcdn.com/w80/ae.png",
    langCode: "ar-AE",
    sampleText: "مرحباً، أنا وكيل الصوت بالذكاء الاصطناعي الخاص بك. كيف يمكنني مساعدتك اليوم؟",
  },
  {
    name: "Portuguese",
    nativeName: "Português",
    flagUrl: "https://flagcdn.com/w80/pt.png",
    langCode: "pt-PT",
    sampleText: "Olá, sou o seu agente de voz IA. Como posso ajudar você hoje?",
  },
  {
    name: "Russian",
    nativeName: "Русский",
    flagUrl: "https://flagcdn.com/w80/ru.png",
    langCode: "ru-RU",
    sampleText: "Здравствуйте, я ваш голосовой ассистент ИИ. Чем я могу помочь вам сегодня?",
  },
];

export default function LanguagesShowcase() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [playingCode, setPlayingCode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handlePreview = (lang: Language) => {
    if (playingCode === lang.langCode) {
      window.speechSynthesis?.cancel();
      setPlayingCode(null);
      return;
    }

    // Cancel any previous speaking audio
    window.speechSynthesis?.cancel();
    setPlayingCode(lang.langCode);

    const utterance = new SpeechSynthesisUtterance(lang.sampleText);
    utterance.lang = lang.langCode;
    utterance.onend = () => {
      setPlayingCode(null);
    };
    utterance.onerror = () => {
      // In case native voice package is missing in browser, mock standard 3.5s delay
      setTimeout(() => {
        setPlayingCode(null);
      }, 3500);
    };

    window.speechSynthesis?.speak(utterance);

    // Safety fallback in case native callback fails to trigger
    setTimeout(() => {
      setPlayingCode(prev => prev === lang.langCode ? null : prev);
    }, 7000);
  };

  const visibleLanguages = isExpanded ? LANGUAGES : LANGUAGES.slice(0, 8);

  return (
    <section 
      ref={sectionRef} 
      className="section-px py-24 sm:py-32 bg-[#F8FAFC] border-b border-[#0E1726]/5 overflow-hidden scroll-mt-24" 
      id="languages"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-8 mb-16">
          {/* Left: Title & Description */}
          <div className="max-w-xl relative">
            {/* 400+ voices rotated badge */}
            <motion.div 
              initial={{ rotate: 10, scale: 0.9, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              className="absolute right-0 sm:right-[15%] top-[-40px] rotate-[10deg] bg-[#FFD02B] text-[#0E1726] px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold shadow-md tracking-wider border border-[#0E1726]/5 z-10"
            >
              400+ voices
            </motion.div>

            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-3">06 · Global Voice Infrastructure</p>
            <h2 className="font-headline font-extrabold text-[#0E1726] text-[2.2rem] sm:text-[3.2rem] leading-tight tracking-tight mt-1">
              Choose from 30+ languages for your AI voice agents
            </h2>
            <p className="mt-4 text-[14px] sm:text-[15px] text-[#475569] leading-relaxed">
              Xyras ensures global reach and accessibility for your hospital operations, support desks, and clinical triage pipelines!
            </p>
          </div>

          {/* Right: Testimonial Box */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-sm bg-white border border-[#0E1726]/8 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-4"
          >
            {/* Stars row */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} className="material-symbols-outlined text-[16px] text-green-600 fill-green-600">star</span>
              ))}
            </div>
            {/* Quote */}
            <p className="text-[13px] sm:text-[13.5px] text-[#334155] leading-relaxed font-medium italic">
              "Xyras is like having a powerhouse medical support and clinical operations team working 24/7—without missing a single inbound call or triage request."
            </p>
            {/* Profiler */}
            <div className="flex items-center gap-3 pt-2 border-t border-[#0E1726]/5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                <img src="/images/doctor_profile.png" alt="Dr. Amit Verma headshot" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-sans text-[12px] font-bold text-[#0E1726] leading-none">Dr. Amit Verma</p>
                <p className="font-mono text-[9px] text-[#64748B] mt-1 uppercase font-bold tracking-wider">Clinical Operations Director</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Languages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full mt-4">
          <AnimatePresence mode="popLayout">
            {visibleLanguages.map((lang, idx) => {
              const isPlaying = playingCode === lang.langCode;
              return (
                <motion.div
                  key={lang.langCode}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
                  className="bg-white border border-[#0E1726]/8 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all hover:translate-y-[-1px]"
                >
                  {/* Flag round */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-slate-100 shadow-inner relative">
                    <img 
                      src={lang.flagUrl} 
                      alt={`${lang.name} flag`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Button */}
                  <div className="flex-grow flex flex-col gap-1 min-w-0">
                    <p className="font-sans text-[13px] font-bold text-[#0E1726] truncate leading-tight">
                      {lang.name}
                    </p>
                    <p className="font-mono text-[10px] text-[#64748B] font-medium truncate">
                      {lang.nativeName}
                    </p>
                    <div className="mt-1 flex items-center">
                      <button
                        onClick={() => handlePreview(lang)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
                          isPlaying
                            ? "bg-red-500 border-red-500 text-white shadow-sm"
                            : "bg-white hover:bg-slate-50 border-[#0E1726]/10 text-[#0E1726]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px] flex-shrink-0">
                          {isPlaying ? "stop" : "play_arrow"}
                        </span>
                        {isPlaying ? "Stop" : "Preview"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12 w-full">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2.5 rounded-full border border-[#0E1726]/10 hover:border-[#0E1726]/20 font-mono text-[11px] font-bold text-[#0E1726] bg-white hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>

        {/* Footer info indicator */}
        <div className="mt-8 flex items-center gap-1.5 text-[#64748B] font-mono text-[9px] font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[12px]">info</span>
          All previews run natively in your browser. 400+ more languages are available in-app.
        </div>

      </div>
    </section>
  );
}
