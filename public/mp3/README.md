# 🎙️ Xyras AI Demo Recordings

Place your pre-recorded MP3 demo files in this folder.

## File Naming Convention

| File Name | Agent | Industry |
|-----------|-------|----------|
| `priya-healthcare.mp3` | Priya | Healthcare |
| `meera-restaurant.mp3` | Meera | Restaurant |
| `arjun-automotive.mp3` | Arjun | Automotive |
| `riya-realestate.mp3` | Riya | Real Estate |

## How It Works

The voice demo section on the homepage will automatically pick up these files and play them when visitors click "Play Demo" on the respective agent card.

## Audio Requirements

- Format: MP3 (`.mp3`)
- Recommended duration: 30–90 seconds per demo
- Bitrate: 128kbps or higher recommended
- Sample rate: 44.1kHz

## Adding a New Agent

To add a new agent card, update the `AGENTS` array inside:
`app/components/VoiceDemoSection.tsx`
