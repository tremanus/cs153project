"use client";

import { useState, useRef, useEffect } from "react";

const TUTOR_SCRIPT = [
  {
    amharic: "ሰላም!",
    transliteration: "selam!",
    english: "Hello!",
    hint: "Try saying: selam",
  },
  {
    amharic: "እንዴት ነህ?",
    transliteration: "indet neh?",
    english: "How are you?",
    hint: "Try responding: dehna negn (I am fine)",
  },
  {
    amharic: "ደህና ነኝ። አንተስ?",
    transliteration: "dehna negn. antes?",
    english: "I am fine. And you?",
    hint: "Try: dehna negn (I am fine too)",
  },
  {
    amharic: "ጥሩ! ስምህ ማን ነው?",
    transliteration: "t'iru! simih man new?",
    english: "Good! What is your name?",
    hint: "Try: sime ___ new (My name is ___)",
  },
  {
    amharic: "መልካም! ዛሬ ሰላምታ እንለማመድ።",
    transliteration: "melkam! zare selamta inlemamed.",
    english: "Great! Today we practice greetings.",
    hint: "Try: ishi (OK)",
  },
  {
    amharic: "በጣም ጥሩ! እያደግህ ነው።",
    transliteration: "betam t'iru! iyadegih new.",
    english: "Very good! You are improving.",
    hint: null,
  },
];

const LESSON_INTRO = {
  amharic: "ሰላም! ዛሬ ሰላምታ እንለማመድ።",
  transliteration: "selam! zare selamta inlemamed.",
  english: "Hello! Today we will practice greetings. I'll start easy — when I say ሰላም, respond with ሰላም.",
  hint: "Say: selam",
  isIntro: true,
};

export default function PracticeView({ onSessionUpdate }) {
  const [messages, setMessages] = useState([
    { role: "tutor", ...LESSON_INTRO },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);
  const [sessionActive, setSessionActive] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function getTutorResponse() {
    const response = TUTOR_SCRIPT[turnIndex % TUTOR_SCRIPT.length];
    setTurnIndex((prev) => prev + 1);
    return response;
  }

  function handleSend() {
    if (!input.trim()) return;
    submitMessage(input.trim());
  }

  function submitMessage(text) {
    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getTutorResponse();
      setMessages((prev) => [...prev, { role: "tutor", ...response }]);
      setIsTyping(false);
      onSessionUpdate?.({
        type: "turn",
        userText: text,
        tutorResponse: response,
      });
    }, 1200);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleMicClick() {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Voice recognition not yet connected — stop after a few seconds
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  }

  function handleNewSession() {
    setMessages([{ role: "tutor", ...LESSON_INTRO }]);
    setTurnIndex(0);
    setSessionActive(true);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Lesson Context Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-[#fffde7]">
        <div className="flex items-center gap-3">
          <span className="text-lg">👋</span>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Lesson: Greetings
            </p>
            <p className="text-xs text-gray-500">
              Practice basic greetings and introductions
            </p>
          </div>
        </div>
        <button
          onClick={handleNewSession}
          className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
        >
          New Session
        </button>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex animate-fade-in ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "tutor" && (
              <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0 mt-1">
                ት
              </div>
            )}
            <div
              className={`max-w-[85%] sm:max-w-[75%] ${
                msg.role === "user" ? "" : ""
              }`}
            >
              {msg.role === "tutor" ? (
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <p className="text-lg font-semibold text-gray-900">
                    {msg.amharic}
                  </p>
                  {msg.transliteration && (
                    <p className="text-sm text-gray-500 italic mt-0.5">
                      {msg.transliteration}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{msg.english}</p>
                  {msg.hint && (
                    <div className="mt-2 pt-2 border-t border-gray-50">
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {msg.hint}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[#e8f5e9] text-gray-900 rounded-2xl rounded-tr-md px-4 py-3">
                  <p className="text-base">{msg.text}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0 mt-1">
              ት
            </div>
            <div className="bg-white border border-gray-100 px-4 py-4 rounded-2xl rounded-tl-md shadow-sm">
              <div className="flex gap-1.5">
                <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Voice-First Input Area */}
      <div className="border-t border-gray-100 bg-white p-4 sm:p-5">
        {/* Mic Button - Primary */}
        <div className="flex flex-col items-center mb-4">
          <button
            onClick={handleMicClick}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-[#c62828] hover:bg-[#b71c1c] mic-active"
                : "bg-gray-900 hover:bg-gray-700"
            }`}
          >
            {isListening ? (
              <div className="flex items-end gap-0.5 h-6">
                <span className="sound-bar w-1 bg-white rounded-full"></span>
                <span className="sound-bar w-1 bg-white rounded-full"></span>
                <span className="sound-bar w-1 bg-white rounded-full"></span>
                <span className="sound-bar w-1 bg-white rounded-full"></span>
                <span className="sound-bar w-1 bg-white rounded-full"></span>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m-4 0h8m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}
          </button>
          <p className="text-xs text-gray-400 mt-2">
            {isListening ? "Listening... tap to stop" : "Tap to speak"}
          </p>
        </div>

        {/* Text Input - Secondary/Fallback */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Or type here..."
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm bg-gray-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex-shrink-0 px-4 py-2.5 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
