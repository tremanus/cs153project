"use client";

import { useState, useRef, useEffect } from "react";

const TUTOR_RESPONSES = [
  { amharic: "ሰላም!", english: "Hello!" },
  { amharic: "እኔ ደህና ነኝ.", english: "I am fine." },
  { amharic: "አንተስ?", english: "And you?" },
  { amharic: "ጥሩ!", english: "Good!" },
  { amharic: "እሺ, እንቀጥል.", english: "OK, let's continue." },
  { amharic: "በጣም ጥሩ!", english: "Very good!" },
  { amharic: "እንደገና ሞክር.", english: "Try again." },
  { amharic: "አዎ!", english: "Yes!" },
];

const PRACTICE_TOPICS = [
  { name: "Greetings", icon: "👋", active: true },
  { name: "Introductions", icon: "🤝", active: false },
  { name: "Family", icon: "👨‍👩‍👧", active: false },
  { name: "Food", icon: "🍲", active: false },
  { name: "Daily Life", icon: "☀️", active: false },
];

const VOCABULARY = [
  { amharic: "ሰላም", english: "Hello" },
  { amharic: "እንዴት ነህ?", english: "How are you?" },
  { amharic: "ደህና ነኝ", english: "I am fine" },
  { amharic: "ስሜ ___ ነው", english: "My name is ___" },
];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "tutor",
      amharic: "ሰላም! እንኳን ደህና መጣህ።",
      english: "Hello! Welcome.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        TUTOR_RESPONSES[Math.floor(Math.random() * TUTOR_RESPONSES.length)];
      setMessages((prev) => [...prev, { role: "tutor", ...response }]);
      setIsTyping(false);
    }, 1200);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSpeak() {
    alert("🎤 Speech recognition coming soon! For now, type your message.");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2d6a4f]">
              AI Amharic Tutor
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-0.5">
              Practice beginner Amharic through simple conversation.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-[#f0fdf4] px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-green-700 font-medium">Online</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 gap-5">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex flex-col gap-4 order-2 lg:order-1">
          {/* Today's Practice */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Today&apos;s Practice
            </h2>
            <ul className="space-y-2">
              {PRACTICE_TOPICS.map((topic) => (
                <li
                  key={topic.name}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    topic.active
                      ? "bg-[#d8f3dc] text-[#2d6a4f] font-medium"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <span className="text-lg">{topic.icon}</span>
                  <span className="text-sm">{topic.name}</span>
                  {topic.active && (
                    <span className="ml-auto text-xs bg-[#2d6a4f] text-white px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Vocabulary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Vocabulary
            </h2>
            <ul className="space-y-3">
              {VOCABULARY.map((word, i) => (
                <li
                  key={i}
                  className="flex flex-col border-b border-gray-50 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-base font-medium text-[#2d6a4f]">
                    {word.amharic}
                  </span>
                  <span className="text-sm text-gray-500">{word.english}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Progress
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Lessons completed
                </span>
                <span className="text-sm font-bold text-[#2d6a4f]">1</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#40916c] h-2 rounded-full"
                  style={{ width: "10%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Words practiced</span>
                <span className="text-sm font-bold text-[#2d6a4f]">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Current level</span>
                <span className="text-xs font-medium bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded-full">
                  Beginner
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 order-1 lg:order-2 min-h-[500px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex animate-fade-in ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "tutor" && (
                  <div className="w-8 h-8 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-sm font-bold mr-2 flex-shrink-0 mt-1">
                    ት
                  </div>
                )}
                <div
                  className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-[#d8f3dc] text-gray-800 rounded-br-md"
                      : "bg-[#f1f5f9] text-gray-800 rounded-bl-md"
                  }`}
                >
                  {msg.role === "tutor" ? (
                    <>
                      <p className="text-base font-medium">{msg.amharic}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {msg.english}
                      </p>
                    </>
                  ) : (
                    <p className="text-base">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-sm font-bold mr-2 flex-shrink-0 mt-1">
                  ት
                </div>
                <div className="bg-[#f1f5f9] px-4 py-3 rounded-2xl rounded-bl-md">
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

          {/* Input Area */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeak}
                className="flex-shrink-0 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 bg-[#fef3c7] hover:bg-[#fde68a] text-[#92400e] rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                title="Start Speaking"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
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
                <span className="hidden sm:inline text-sm">Start Speaking</span>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type in English or Amharic..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#40916c] focus:border-transparent text-base bg-gray-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex-shrink-0 px-5 py-2.5 bg-[#2d6a4f] hover:bg-[#40916c] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors text-sm sm:text-base"
              >
                Send
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI tutor responses are simulated for this prototype.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
