# Audio Demo Implementation Guide

## Overview

The **Play Call Demo** button in the ConversationDemo component now plays actual audio alongside the visual animation. The system supports two modes:

1. **Real Audio Files** (preferred) - MP3 files from `/public/audio/`
2. **Speech Synthesis Fallback** (automatic) - Browser's built-in text-to-speech

---

## 🎵 How It Works

### Audio Mode Priority

```
1. Try to load industry-specific MP3 file
   ↓
2. If file exists and loads → Play audio file
   ↓
3. If file missing or fails → Use Speech Synthesis API
   ↓
4. If Speech Synthesis unavailable → Show warning, visual-only mode
```

### Interaction Flow

**When user clicks "Play Call Demo":**

1. Component attempts to load audio file for selected industry
2. If successful, plays the MP3 and syncs visual timeline
3. If unsuccessful, uses browser Speech Synthesis to speak the conversation
4. Visual timeline stays synchronized with audio playback

**During playback:**
- Caller message highlights when caller is speaking
- Processing indicator shows when AI is analyzing
- AI message highlights when AI is responding
- Success chip appears when action completes
- Waveforms animate in sync with active speaker

---

## 📁 Audio Files Setup

### File Location
Place audio files in: `/public/audio/`

### Required Filenames
- `healthcare-demo.mp3`
- `real-estate-demo.mp3`
- `restaurant-demo.mp3`
- `automotive-demo.mp3`

### File Requirements
- **Format**: MP3 (or any browser-supported format: mp3, ogg, wav)
- **Duration**: 8-12 seconds recommended
- **Quality**: Clear, professional recording
- **Content**: Natural conversation matching the dialogue text

---

## 🎙️ Speech Synthesis Fallback

### Voice Configuration

**Caller Voice:**
- Rate: 0.95 (slightly slower)
- Pitch: 1.0 (normal)
- Volume: 0.8 (slightly quieter)
- Preference: Native voices over Google voices

**AI Agent Voice:**
- Rate: 0.9 (slower, more clear)
- Pitch: 1.05 (slightly higher, more confident)
- Volume: 0.9 (clear and present)
- Preference: Google voices for cleaner synthesis

### Timeline Synchronization

The component uses `onstart` and `onend` events from `SpeechSynthesisUtterance` to sync visual states:

1. **Caller speaks** → `callerUtterance.onend` triggers next step
2. **Processing delay** → 1.5s timeout
3. **AI responds** → `aiUtterance.onend` triggers next step
4. **Action complete** → 0.8s timeout → 2.5s display → Reset

---

## 🎛️ Controls

### Play/Stop Button
- **Default state**: "Play Call Demo" (green)
- **Playing state**: "Stop Demo" (red)
- **After completion**: "Replay Demo" (green)

**Behavior:**
- Click to start playback
- Click again to stop mid-playback
- Cannot switch industry tabs during playback

### Mute/Unmute Button
- **Icon**: `volume_up` / `volume_off`
- **Default**: Unmuted
- **Persists**: Mute state preserved across demos

**Behavior:**
- For audio files: Sets `audio.muted = true/false`
- For speech synthesis: Prevents speech from starting (can't mute mid-speech)
- Visual animation continues regardless of mute state

---

## ♿ Accessibility

### Keyboard Support
- Both buttons are fully keyboard accessible (Tab, Enter, Space)
- Proper focus states with outline

### ARIA Labels
```tsx
aria-label={isPlaying ? "Stop demo" : "Play call demo"}
aria-label={isMuted ? "Unmute audio" : "Mute audio"}
```

### Reduced Motion
- Respects `prefers-reduced-motion: reduce`
- Waveform animations disabled
- Timeline transitions still work
- Audio playback unaffected

### No Autoplay
- Audio never plays automatically on page load
- User must explicitly click "Play Call Demo"
- Complies with browser autoplay policies

---

## 🔧 Technical Implementation

### State Management

```tsx
const [isMuted, setIsMuted] = useState(false);
const [audioMode, setAudioMode] = useState<"file" | "speech" | "unavailable">("speech");
const [buttonState, setButtonState] = useState<"play" | "playing" | "stop">("play");

const audioRef = useRef<HTMLAudioElement | null>(null);
const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
const timersRef = useRef<NodeJS.Timeout[]>([]);
```

### Cleanup Functions

**On unmount:**
```tsx
useEffect(() => {
  return () => stopAudio();
}, []);
```

**On tab change:**
```tsx
useEffect(() => {
  if (isPlaying) {
    stopAudio();
    setIsPlaying(false);
  }
}, [activeTab]);
```

**stopAudio() function:**
- Clears all timers
- Pauses and resets audio element
- Cancels all speech synthesis
- Cleans up refs

### Audio File Loading

```tsx
const tryLoadAudioFile = async (industry: string): Promise<boolean> => {
  const audio = new Audio();
  audio.src = AUDIO_FILES[industry];
  
  return new Promise((resolve) => {
    audio.addEventListener("canplaythrough", () => {
      audioRef.current = audio;
      resolve(true);
    });
    audio.addEventListener("error", () => resolve(false));
    
    // 2-second timeout
    setTimeout(() => resolve(false), 2000);
  });
};
```

### Speech Synthesis Timing

```mermaid
Start (0s)
  ↓
Caller speaks (0.5s delay)
  ↓
[utterance.onend event]
  ↓
Processing (show intent)
  ↓
AI responds (1.5s delay)
  ↓
[utterance.onend event]
  ↓
Action complete (0.8s delay)
  ↓
Display success (2.5s)
  ↓
Reset
```

---

## 🎨 Visual Sync

### Waveform Animation

```tsx
<VoiceWaveform 
  isActive={isPlaying && playStep === 1} // Caller
  size="small"
  reduceMotion={reduceMotion}
/>

<VoiceWaveform 
  isActive={isPlaying && playStep === 3} // AI
  size="small"
  reduceMotion={reduceMotion}
/>
```

### Message Highlighting

```tsx
className={`transition-all ${
  isPlaying && playStep === 1
    ? "border-secondary/30 shadow-lg shadow-secondary/10"
    : "border-[#0E1726]/5"
}`}
```

### Timeline Steps

```tsx
const steps = [
  { label: "Caller speaks", icon: "person" },        // Step 0-1
  { label: "AI listens", icon: "hearing" },          // Step 2
  { label: "AI responds", icon: "smart_toy" },       // Step 3
  { label: "Action completed", icon: "check_circle" } // Step 4
];
```

---

## 🐛 Error Handling

### Speech Synthesis Unavailable
```tsx
if (!window.speechSynthesis) {
  setAudioMode("unavailable");
  console.warn("Speech Synthesis API not available");
  return;
}
```

### Audio File Load Failure
```tsx
audio.play().catch(err => {
  console.warn("Audio playback failed:", err);
  playSpeechSynthesis(); // Automatic fallback
});
```

### Browser Autoplay Block
- Audio only plays after explicit user interaction (click)
- Complies with Chrome, Firefox, Safari autoplay policies

---

## 📊 Browser Compatibility

### Speech Synthesis API
✅ Chrome/Edge 33+
✅ Firefox 49+
✅ Safari 7+
✅ Opera 21+
❌ IE (not supported)

### Audio Element
✅ All modern browsers
✅ MP3 format widely supported
⚠️ OGG for Firefox fallback (optional)

---

## 🎬 Recording Audio Files (Optional)

### Recommended Tools
- **Professional**: Adobe Audition, Audacity
- **Online**: Riverside.fm, Descript, Cleanvoice
- **AI Voices**: ElevenLabs, Play.ht, Murf.ai

### Recording Tips
1. Use two distinct voices (or voice actors)
2. Caller: Warm, natural, slightly questioning tone
3. AI Agent: Clear, confident, professional tone
4. Add 0.5-1s pause between caller and AI
5. Keep total duration under 12 seconds
6. Export as 128-192kbps MP3
7. Normalize audio levels to -3dB

### Example Audio Structure
```
[0.0s - 0.5s]  Silence
[0.5s - 3.5s]  Caller speaks
[3.5s - 4.0s]  Brief pause
[4.0s - 8.5s]  AI responds
[8.5s - 9.0s]  Silence/fade
```

---

## 🚀 Testing Checklist

### Functional Tests
- [ ] Click "Play Call Demo" starts audio
- [ ] Visual timeline syncs with audio
- [ ] Waveforms animate during speech
- [ ] Message bubbles highlight correctly
- [ ] Click "Stop Demo" stops audio immediately
- [ ] Mute button toggles audio
- [ ] Changing tabs stops current playback
- [ ] Works with audio files (if present)
- [ ] Falls back to speech synthesis gracefully
- [ ] Shows "Audio unavailable" if neither works

### Accessibility Tests
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] ARIA labels are present
- [ ] No autoplay on page load
- [ ] Reduced motion disables animations only
- [ ] Focus visible on buttons

### Browser Tests
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## 📝 Future Enhancements

### Potential Improvements
1. **Visual progress bar** during audio playback
2. **Playback speed control** (0.75x, 1x, 1.25x)
3. **Subtitle/caption display** synced with audio
4. **Download audio file** button for users
5. **Multiple language versions** of audio files
6. **Waveform visualization** showing actual audio amplitude
7. **Pause/resume** instead of just stop
8. **Keyboard shortcuts** (Space to play/pause, M to mute)

---

## 🎯 Summary

**Before**: Visual-only call simulation
**After**: Full audio + visual experience with intelligent fallback

**Key Features:**
✅ Real audio file support (MP3)
✅ Speech Synthesis fallback (text-to-speech)
✅ Synchronized visual timeline
✅ Mute/unmute control
✅ Stop/replay functionality
✅ Automatic cleanup on tab change
✅ Accessible and keyboard-friendly
✅ No autoplay (user-initiated only)
✅ Reduced motion support
✅ Zero TypeScript errors
✅ Production-ready

---

## 📞 Support

For questions or issues with audio implementation:
1. Check browser console for warnings
2. Verify audio file paths and formats
3. Test Speech Synthesis API availability: `!!window.speechSynthesis`
4. Ensure HTTPS (some browsers require secure context)

---

**Implementation Date**: June 18, 2026
**Component**: `app/components/ConversationDemo.tsx`
**Audio Directory**: `public/audio/`
