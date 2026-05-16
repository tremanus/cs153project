"use client";

import { useState } from "react";

export default function ReviewView() {
  const [filter, setFilter] = useState("all");

  const savedPhrases = [];
  const pastCorrections = [];

  const filteredPhrases = savedPhrases.filter((p) => {
    if (filter === "mastered") return p.mastered;
    if (filter === "learning") return !p.mastered;
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-8 max-w-4xl mx-auto w-full">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Review</h2>
        <p className="text-gray-500 mb-6">
          Phrases, corrections, and vocabulary from your sessions.
        </p>
      </div>

      {/* Saved Vocabulary */}
      <section className="mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Saved Vocabulary
          </h3>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {[
              { key: "all", label: "All" },
              { key: "mastered", label: "Mastered" },
              { key: "learning", label: "Learning" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  filter === f.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredPhrases.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredPhrases.map((phrase, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {phrase.amharic}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      {phrase.transliteration}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {phrase.english}
                    </p>
                  </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      phrase.mastered
                        ? "bg-[#e8f5e9] text-[#2d6a4f]"
                        : "bg-[#fffde7] text-[#f9a825]"
                    }`}
                >
                  {phrase.mastered ? "Mastered" : "Learning"}
                </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">No vocabulary saved yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Phrases you learn during practice sessions will appear here.
            </p>
          </div>
        )}
      </section>

      {/* Past Corrections */}
      <section className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Corrections
        </h3>

        {pastCorrections.length > 0 ? (
          <div className="space-y-3">
            {pastCorrections.map((correction, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <span className="text-sm text-gray-400">You said:</span>
                      <span className="text-sm font-mono text-gray-700">
                        {correction.you_said}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <span className="text-sm text-gray-400">Correct:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {correction.correct}
                    </span>
                    </div>
                    <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                      {correction.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">No corrections yet</p>
            <p className="text-xs text-gray-400 mt-1">
              When the tutor corrects your pronunciation or grammar, it will show up here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
