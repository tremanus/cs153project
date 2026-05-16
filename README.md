# AI Amharic Tutor

A voice-first AI conversation tutor for beginner Amharic learners. The app teaches through guided spoken dialogue while a companion website provides feedback, review, and progress tracking.

## What it does

- **Practice**: Start a voice conversation with the AI tutor. Speak in Amharic, get guided responses with translations and hints.
- **Review**: See saved vocabulary, past corrections, and phrase breakdowns from your sessions.
- **Progress**: Track sessions completed, phrases learned, topic mastery, and areas to improve.

## Current status

- [x] Voice input via Web Speech API (Chrome/Edge, language set to Amharic)
- [x] Three-tab UI: Practice / Review / Progress
- [x] Mic-first interaction with text fallback
- [x] Rich tutor messages (Amharic + transliteration + English + hints)
- [ ] AI-powered tutor responses (currently uses scripted responses)
- [ ] Text-to-speech for tutor output
- [ ] Persistent session data (localStorage)
- [ ] Conversation corrections and vocabulary extraction

## Tech stack

- Next.js (App Router)
- Tailwind CSS
- Web Speech API (browser-native speech recognition)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in Chrome or Edge (required for speech recognition).

## Scope

This project focuses on spoken beginner Amharic:
- Greetings
- Introductions
- Family
- Food
- Daily life
- Polite expressions

It does not cover alphabet/script instruction, reading, writing, or advanced grammar.
