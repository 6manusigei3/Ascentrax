
"use client";

import { useEffect, useState } from "react";
import Quiz from "./quiz/Quiz";
import StudyBuddy from "./study-buddy/StudyBuddy";

const topics = [
  { name: "Describe cloud concepts", progress: 72 },
  { name: "Describe Azure architecture and services", progress: 48 },
  { name: "Describe Azure management and governance", progress: 25 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [headlineWord, setHeadlineWord] = useState("Practice.");

  useEffect(() => {
    const words = ["Practice.", "Improve.", "Master.", "Succeed."];
    const timer = window.setInterval(() => {
      setHeadlineWord((current) => {
        const index = words.indexOf(current);
        return words[(index + 1) % words.length];
      });
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);
  const [quizResult, setQuizResult] = useState<{
    correct: number;
    total: number;
    percentage: number;
    questionsPracticed: number;
  } | null>(null);

  useEffect(() => {
    const loadProgress = () => {
      try {
        const saved = window.localStorage.getItem("ascentrax-quiz-result");
        if (saved) setQuizResult(JSON.parse(saved));
      } catch {
        console.warn("Could not load saved Ascentrax progress.");
      }
    };
    loadProgress();
    window.addEventListener("ascentrax-progress-updated", loadProgress);
    return () => window.removeEventListener("ascentrax-progress-updated", loadProgress);
  }, []);

  const navigation = [
    { name: "Overview", icon: "⌂" },
    { name: "Practice quiz", icon: "◎" },
    { name: "Study buddy", icon: "✳" },
    { name: "My progress", icon: "↗" },
  ];

  return (
    <main className="ascentrax-page min-h-screen bg-[#F7F9F6] text-[#24352C] md:flex">
      <aside className="flex flex-col bg-[#174D3B] p-5 text-white md:min-h-screen md:w-64 md:shrink-0 md:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-black text-[#174D3B]">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">ascentrax</h1>
            <p className="text-xs text-[#D4E4D9]">Rise through knowledge.</p>
          </div>
        </div>

        <div className="mb-3 mt-9 text-xs font-semibold uppercase tracking-[0.18em] text-[#C0D8C9]">
          Learning space
        </div>

        <nav className="flex flex-wrap gap-2 md:flex-col">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 hover:translate-x-1 ${
                activeTab === item.name
                  ? "bg-white font-semibold text-[#174D3B] shadow-sm"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="w-5 text-center text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.07] p-4 md:mt-auto">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-[#D8EAA7]">✦</span>
            <span>Daily learning goal</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#E0EBE4]">
            Small steps every day lead to lasting progress.
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/20">
            <div className="h-full w-2/5 rounded-full bg-[#D8EAA7]" />
          </div>
          <p className="mt-2 text-xs text-[#D4E4D9]">
            2 of 5 activities · Sample data
          </p>
        </div>

        <div className="mt-6 border-t border-white/15 pt-4 text-xs text-[#D4E4D9]">
          Independent learning platform
        </div>
      </aside>

      <section className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <header className="ascentrax-hero relative isolate mb-8 overflow-hidden rounded-3xl border border-[#DFE9DD] bg-gradient-to-br from-white via-[#F3F8F0] to-[#E6F0E3] p-6 sm:p-8 lg:p-10">
          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8E6D4] bg-white/80 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#315B45] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                </svg>
                YOUR NEXT LEVEL STARTS HERE
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#203B2D] sm:text-5xl">
                Learn.{" "}
                <span key={headlineWord} className="ascentrax-word-in inline-block text-[#397557]" aria-live="polite">
                  {headlineWord}
                </span>
                <br className="hidden sm:block" />
                <span className="text-[#203B2D]">Rise above.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#59665E] sm:text-base">
                Build your confidence for Azure Fundamentals. Learn the concepts,
                practise your knowledge, and turn mistakes into mastery.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("Practice quiz")}
                  className="ascentrax-action inline-flex items-center justify-center gap-2 rounded-xl bg-[#174D3B] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#174D3B]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#103D2E] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#397557]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="m9 6 9 6-9 6V6Z" fill="currentColor"/>
                  </svg>
                  Start practicing
                </button>
                <button
                  onClick={() => setActiveTab("Study buddy")}
                  className="ascentrax-action inline-flex items-center justify-center gap-2 rounded-xl border border-[#D5E1D2] bg-white/85 px-5 py-3 text-sm font-semibold text-[#315B45] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9EBDA0] hover:bg-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#397557]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20M8 7h8M8 10h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                  Explore lessons
                </button>
              </div>
            </div>

            <div className="relative z-10 flex shrink-0 items-center justify-center self-center lg:mr-5">
              <div
                className="ascentrax-readiness-ring"
                role="img"
                aria-label={`Readiness ${quizResult ? quizResult.percentage : 48} percent`}
                style={{
                  background: `conic-gradient(#397557 ${(quizResult ? quizResult.percentage : 48)}%, #E2EAE0 0)`
                }}
              >
                <div className="ascentrax-ring-inner">
                  <svg viewBox="0 0 24 24" fill="none" className="mb-1 h-5 w-5 text-[#397557]" aria-hidden="true">
                    <path d="m12 3 2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-3xl font-bold tracking-tight text-[#203B2D]">
                    {quizResult ? quizResult.percentage : 48}%
                  </span>
                  <span className="mt-1 text-xs font-semibold text-[#59665E]">Readiness</span>
                  <span className="mt-1 text-center text-[10px] text-[#69756D]">
                    {quizResult ? "Latest quiz score" : "Demo estimate"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {activeTab === "Study buddy" ? (
          <StudyBuddy />
        ) : activeTab === "Practice quiz" ? (
            <Quiz />
          ) : activeTab === "Overview" ? (
          <>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-[#E1E8DF] bg-white p-5 shadow-sm shadow-[#193C2B]/[0.03] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#59665E]">
                    Overall readiness
                  </p>
                  <span className="rounded-lg bg-[#EAF2E8] px-2 py-1 text-xs font-medium text-[#315B45]">
                    In progress
                  </span>
                </div>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-[#203B2D]">
                    {quizResult ? `${quizResult.percentage}%` : "48%"}
                  </span>
                  <span className="mb-1 text-sm text-[#397557]">
                    Keep going
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[#E9EEE7]">
                  <div className="h-2 rounded-full bg-[#397557]" style={{ width: `${quizResult ? quizResult.percentage : 48}%` }} />
                </div>
                <p className="mt-3 text-xs text-[#69756D]">
                  {quizResult ? "Based on your latest completed quiz" : "Illustrative demo progress"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E1E8DF] bg-white p-5 shadow-sm shadow-[#193C2B]/[0.03] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
                <p className="text-sm font-medium text-[#59665E]">
                  Questions practiced
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2E8] text-xl text-[#315B45]">
                    ◎
                  </div>
                  <span className="text-4xl font-bold tracking-tight text-[#203B2D]">
                    {quizResult ? quizResult.questionsPracticed : 12}
                  </span>
                </div>
                <p className="mt-4 text-xs text-[#69756D]">
                  {quizResult ? "Questions in your latest completed quiz" : "Sample count for the prototype"}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E1E8DF] bg-white p-5 shadow-sm shadow-[#193C2B]/[0.03] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sm:col-span-2 xl:col-span-1">
                <p className="text-sm font-medium text-[#59665E]">
                  Learning streak
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F3DE] text-xl text-[#526B30]">
                    ✦
                  </div>
                  <span className="text-4xl font-bold tracking-tight text-[#203B2D]">
                    3 <span className="text-xl font-medium">days</span>
                  </span>
                </div>
                <p className="mt-4 text-xs text-[#69756D]">
                  Consistency beats cramming.
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
              <div className="rounded-2xl border border-[#E1E8DF] bg-white p-5 shadow-sm shadow-[#193C2B]/[0.03] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg sm:p-6">
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#203B2D]">
                      Your learning path
                    </h3>
                    <p className="mt-1 text-sm text-[#69756D]">
                      Three skill areas to explore.
                    </p>
                  </div>
                  <span className="rounded-lg bg-[#F1F4EF] px-3 py-2 text-xs font-medium text-[#52665A]">
                    3 topics
                  </span>
                </div>

                <div className="space-y-6">
                  {topics.map((topic, index) => (
                    <div key={topic.name}>
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2E8] text-sm font-semibold text-[#315B45]">
                          0{index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#293C30]">
                            {topic.name}
                          </p>
                          <p className="mt-1 text-xs text-[#69756D]">
                            {topic.progress}% complete · Sample progress
                          </p>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-[#E9EEE7]">
                        <div
                          className="h-2 rounded-full bg-[#397557]"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("Practice quiz")}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#174D3B] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#103C2D] focus:outline-none focus:ring-2 focus:ring-[#397557] focus:ring-offset-2"
                >
                  Start practicing <span aria-hidden="true">→</span>
                </button>
              </div>

              <div className="flex flex-col rounded-2xl border border-[#D9E4D4] bg-[#EDF3E9] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-[#315B45] shadow-sm">
                  ✳
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#397557]">
                  THE ASCENTRAX METHOD
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-[#203B2D]">
                  Mistake to Mastery
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#526258]">
                  A wrong answer is an opportunity to improve. Understand why,
                  revisit the concept, and try again with confidence.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    ["01", "Find your knowledge gap"],
                    ["02", "Understand the explanation"],
                    ["03", "Retry and reinforce"],
                  ].map(([number, label]) => (
                    <div key={number} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#315B45]">
                        {number}
                      </span>
                      <span className="text-sm font-medium text-[#344B3C]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("Study buddy")}
                  className="mt-7 rounded-xl border border-[#B9CEBA] bg-white px-4 py-3 text-sm font-semibold text-[#24553C] transition hover:bg-[#F8FBF6] focus:outline-none focus:ring-2 focus:ring-[#397557] focus:ring-offset-2"
                >
                  Explore study buddy →
                </button>
              </div>
            </div>
          </>
        ) : activeTab === "My progress" ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E1E8DF] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397557]">
                YOUR LEARNING JOURNEY
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[#203B2D]">
                Progress that you can measure.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#59665E]">
                Every practice session helps you identify what you know and
                what you should revisit.
              </p>

              {quizResult ? (
                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-[#EDF3E9] p-5">
                    <p className="text-sm text-[#526258]">Latest quiz score</p>
                    <p className="mt-2 text-3xl font-bold text-[#203B2D]">
                      {quizResult.percentage}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F4F6F1] p-5">
                    <p className="text-sm text-[#526258]">Correct answers</p>
                    <p className="mt-2 text-3xl font-bold text-[#203B2D]">
                      {quizResult.correct} / {quizResult.total}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F4F6F1] p-5">
                    <p className="text-sm text-[#526258]">Questions attempted</p>
                    <p className="mt-2 text-3xl font-bold text-[#203B2D]">
                      {quizResult.questionsPracticed}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-7 rounded-xl border border-dashed border-[#C9D8C8] bg-[#F8FAF6] p-6">
                  <h4 className="font-semibold text-[#203B2D]">
                    Your first milestone starts here.
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#59665E]">
                    Complete a practice quiz to see your score and results here.
                    Your progress will be saved in this browser.
                  </p>
                </div>
              )}

              {quizResult && (
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-[#344B3C]">Latest result</span>
                    <span className="font-semibold text-[#315B45]">
                      {quizResult.percentage}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-[#E9EEE7]">
                    <div
                      className="h-3 rounded-full bg-[#397557] transition-all"
                      style={{ width: `${Math.min(100, Math.max(0, quizResult.percentage))}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-[#59665E]">
                    {quizResult.percentage >= 80
                      ? "Great work! Keep practising to reinforce what you have learned."
                      : "Review the explanations for questions you missed, then try again."}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-[#D9E4D4] bg-[#EDF3E9] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#203B2D]">
                Your next step
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#526258]">
                Use the Mistake to Mastery approach: practise, understand
                mistakes, and retry. A single score is a starting point, not
                the whole story.
              </p>
              <button
                onClick={() => setActiveTab("Practice quiz")}
                className="mt-5 rounded-xl bg-[#174D3B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103C2D] focus:outline-none focus:ring-2 focus:ring-[#397557] focus:ring-offset-2"
              >
                Take another practice quiz →
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E1E8DF] bg-white p-8 shadow-sm sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397557]">
              ASCENTRAX LEARNING SPACE
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#203B2D]">
              {activeTab}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[#59665E]">
              This learning space is being developed. Your practice quiz and
              progress tracking are available now.
            </p>
            <button
              onClick={() => setActiveTab("Overview")}
              className="mt-6 rounded-xl bg-[#174D3B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103C2D]"
            >
              ← Back to overview
            </button>
          </div>
        )}

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#E1E8DF] pt-5 text-xs text-[#69756D]">
          <span>Ascentrax · Rise through knowledge.</span>
          <span>Independent AZ-900 study prototype · Not an official exam product</span>
        </footer>
      </section>
    </main>
  );
}
