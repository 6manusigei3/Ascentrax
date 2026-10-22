"use client";

import { useState } from "react";

const lessons = [
  {
    title: "Cloud computing",
    explanation:
      "Cloud computing lets you use computing resources over the internet instead of managing all the physical hardware yourself.",
    example:
      "Example: storing your files in online storage instead of only on your laptop.",
    question: "Which is an example of cloud computing?",
    options: [
      "Using online storage for files",
      "Typing a document without saving it",
      "Turning off your computer",
    ],
    answer: 0,
    takeaway: "Cloud services provide access to resources when you need them.",
  },
  {
    title: "Cloud service types",
    explanation:
      "IaaS provides infrastructure, PaaS provides a platform for building applications, and SaaS provides ready-to-use software.",
    example:
      "Think of IaaS as renting building blocks, PaaS as using a prepared workshop, and SaaS as using a finished product.",
    question: "Which service model provides ready-to-use software?",
    options: ["IaaS", "PaaS", "SaaS"],
    answer: 2,
    takeaway: "Remember: IaaS = infrastructure, PaaS = platform, SaaS = software.",
  },
  {
    title: "Azure architecture",
    explanation:
      "Azure regions are geographic areas containing datacenters. Availability zones are separate locations within a region designed to improve resilience.",
    example:
      "Deploying resources across availability zones can help an application remain available if one zone has a problem.",
    question: "What is a key purpose of availability zones?",
    options: [
      "To improve resilience",
      "To replace every user password",
      "To write application code automatically",
    ],
    answer: 0,
    takeaway: "Think about resilience: designing systems to keep working when failures occur.",
  },
  {
    title: "Management and governance",
    explanation:
      "Azure management tools help monitor, organize, control, and manage cloud resources, costs, and compliance.",
    example:
      "Cost-management tools help you review spending and identify unexpected charges.",
    question: "Which activity helps control cloud spending?",
    options: [
      "Ignoring resource usage",
      "Reviewing costs and budgets",
      "Creating resources without monitoring them",
    ],
    answer: 1,
    takeaway: "Good cloud management includes monitoring, cost control, and governance.",
  },
];

export default function StudyBuddy() {
  const [selected, setSelected] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);

  const lesson = lessons[selected];

  function changeLesson(index: number) {
    setSelected(index);
    setChoice(null);
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#397557]">
          GUIDED LEARNING
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#203B2D]">
          Study Buddy
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#59665E]">
          Learn a concept, connect it to a real example, then check your understanding.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {lessons.map((item, index) => (
          <button
            key={item.title}
            onClick={() => changeLesson(index)}
            className={`rounded-xl border p-4 text-left transition ${
              selected === index
                ? "border-[#174D3B] bg-[#EAF3EC]"
                : "border-[#E1E8DF] bg-white hover:border-[#9BB9A5]"
            }`}
          >
            <span className="text-xs font-semibold text-[#397557]">
              LESSON {index + 1}
            </span>
            <span className="mt-1 block font-bold text-[#203B2D]">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E1E8DF] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-[#397557]">
          LESSON {selected + 1} OF {lessons.length}
        </p>
        <h3 className="mt-2 text-2xl font-bold text-[#203B2D]">
          {lesson.title}
        </h3>
        <p className="mt-4 leading-7 text-[#46564B]">
          {lesson.explanation}
        </p>

        <div className="mt-5 rounded-xl bg-[#F3F7F2] p-4">
          <p className="text-sm font-bold text-[#203B2D]">Real-world example</p>
          <p className="mt-2 text-sm leading-6 text-[#59665E]">
            {lesson.example}
          </p>
        </div>

        <div className="mt-6">
          <h4 className="font-bold text-[#203B2D]">{lesson.question}</h4>
          <div className="mt-3 space-y-2">
            {lesson.options.map((option, index) => (
              <button
                key={option}
                onClick={() => setChoice(index)}
                className={`w-full rounded-xl border p-3 text-left text-sm transition ${
                  choice === index
                    ? "border-[#174D3B] bg-[#EAF3EC]"
                    : "border-[#E1E8DF] hover:bg-[#F7F9F6]"
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          {choice !== null && (
            <div className="mt-4 rounded-xl bg-[#F3F7F2] p-4">
              <p className="font-bold text-[#203B2D]">
                {choice === lesson.answer ? "Correct!" : "Not quite — try again."}
              </p>
              {choice === lesson.answer && (
                <p className="mt-2 text-sm leading-6 text-[#59665E]">
                  Key takeaway: {lesson.takeaway}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => changeLesson((selected + lessons.length - 1) % lessons.length)}
            className="rounded-xl border border-[#D6E0D5] px-4 py-3 text-sm font-semibold text-[#174D3B]"
          >
            Previous lesson
          </button>
          <button
            onClick={() => changeLesson((selected + 1) % lessons.length)}
            className="rounded-xl bg-[#174D3B] px-4 py-3 text-sm font-semibold text-white"
          >
            Next lesson →
          </button>
        </div>
      </div>
    </section>
  );
}
