"use client";

const TOPICS = [
  { name: "Greetings", icon: "👋" },
  { name: "Introductions", icon: "🤝" },
  { name: "Family", icon: "👨‍👩‍👧" },
  { name: "Food", icon: "🍲" },
  { name: "Daily Life", icon: "☀️" },
  { name: "Polite Expressions", icon: "🙏" },
];

export default function ProgressView() {
  const stats = {
    sessionsCompleted: 0,
    totalMinutes: 0,
    phrasesLearned: 0,
    phrasesMastered: 0,
    currentStreak: 0,
    level: "Beginner",
  };

  const topicProgress = TOPICS.map((topic) => ({
    ...topic,
    progress: 0,
    phrases: 0,
  }));

  const weakSpots = [];

  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-8 max-w-4xl mx-auto w-full">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Progress</h2>
        <p className="text-gray-500 mb-6">
          Track your improvement and see what to practice next.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 animate-fade-in-up">
        <StatCard label="Sessions" value={stats.sessionsCompleted} />
        <StatCard label="Minutes Practiced" value={stats.totalMinutes} />
        <StatCard label="Phrases Learned" value={stats.phrasesLearned} />
        <StatCard label="Phrases Mastered" value={stats.phrasesMastered} />
        <StatCard label="Day Streak" value={stats.currentStreak} />
        <StatCard label="Level" value={stats.level} highlight />
      </div>

      {/* Topic Progress */}
      <section className="mb-8 animate-fade-in-up">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Topics</h3>
        <div className="space-y-3">
          {topicProgress.map((topic) => (
            <div
              key={topic.name}
              className="bg-white rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{topic.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800">{topic.name}</p>
                    <span className="text-xs text-gray-500">
                      {topic.phrases} phrases
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-9">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#2d6a4f] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {topic.progress}% complete
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Areas to Improve */}
      <section className="animate-fade-in-up">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Areas to Improve
        </h3>

        {weakSpots.length > 0 ? (
          <div className="space-y-3">
            {weakSpots.map((spot, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{spot.phrase}</p>
                  <p className="text-sm text-gray-500">{spot.issue}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">Nothing here yet</p>
            <p className="text-xs text-gray-400 mt-1">
              After a few practice sessions, areas where you need more work will show up here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center">
      <p
        className={`text-2xl font-bold ${
          highlight ? "text-[#2d6a4f]" : "text-gray-900"
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
