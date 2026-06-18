# Audio Demo Files

This directory is for optional audio demo files for the ConversationDemo component.

## Required Files

If you want to use real audio recordings instead of browser speech synthesis, place the following files here:

- `healthcare-demo.mp3` - Healthcare appointment booking conversation
- `real-estate-demo.mp3` - Real estate property viewing conversation
- `restaurant-demo.mp3` - Restaurant table reservation conversation
- `automotive-demo.mp3` - Automotive service booking conversation

## Audio File Format

- **Format**: MP3 (or any browser-supported audio format)
- **Duration**: 8-12 seconds recommended
- **Content**: Natural conversation between a caller and AI agent
- **Quality**: Clear, professional recording

## Conversation Scripts

### Healthcare Demo
**Caller**: "Can I book an appointment with Dr. Mehta for tomorrow evening?"
**AI Agent**: "Of course. Dr. Mehta has slots at 5:30 PM and 6:15 PM. Which one works best?"

### Real Estate Demo
**Caller**: "I'm interested in the 3BHK apartment near Adyar. Can I visit this weekend?"
**AI Agent**: "Sure. I can schedule a property visit for Saturday at 11 AM or 4 PM."

### Restaurant Demo
**Caller**: "Can I reserve a table for four tonight at 8?"
**AI Agent**: "Yes, a table for four is available at 8 PM. I've reserved it under your name."

### Automotive Demo
**Caller**: "Can I book my car for a standard periodic service this Friday?"
**AI Agent**: "Sure. The service center has slots at 11 AM and 3 PM. Which time works best?"

## Fallback Behavior

If audio files are not present or fail to load, the component will automatically fall back to using the browser's **Speech Synthesis API** to read the conversation aloud.

## Recording Tips

- Use distinct voices for caller (warmer, natural) and AI agent (clearer, professional)
- Add natural pauses between sentences
- Keep background noise minimal
- Maintain consistent audio levels
- End with a natural conversation closure
