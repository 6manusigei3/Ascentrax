
"use client";

import { useState } from "react";

const questions = [
  {
    topic: "Cloud concepts",
    question: "A company wants to use computing resources without buying and maintaining physical servers. Which cloud benefit best describes this?",
    options: [
      "High availability",
      "Capital expenditure on hardware",
      "Scalability and reduced upfront costs",
      "Manual hardware maintenance",
    ],
    answer: 2,
    explanation:
      "Cloud services let organizations provision computing resources without purchasing all the underlying hardware upfront. They can also scale resources as needs change.",
    tip: "Remember: cloud computing can reduce upfront infrastructure costs and make scaling easier.",
  },
  {
    topic: "Cloud concepts",
    question: "A business needs its application to remain accessible even if one server fails. Which concept focuses most directly on keeping services operational?",
    options: [
      "High availability",
      "Resource tagging",
      "Capital expenditure",
      "Manual deployment",
    ],
    answer: 0,
    explanation:
      "High availability aims to keep a service accessible with minimal interruption, often by using redundancy and resilient architecture.",
    tip: "Availability is about keeping a service running and accessible.",
  },
  {
    topic: "Azure architecture",
    question: "What is the primary purpose of an Azure region?",
    options: [
      "To store only user passwords",
      "To represent a geographic area containing Azure datacenters",
      "To replace all resource groups",
      "To manage a user's browser settings",
    ],
    answer: 1,
    explanation:
      "An Azure region is a geographic area containing one or more datacenters connected through a dedicated regional network.",
    tip: "Think geography: a region identifies where Azure resources can be hosted.",
  },
  {
    topic: "Azure architecture",
    question: "In Azure, what is a resource group mainly used for?",
    options: [
      "Grouping and managing related Azure resources",
      "Replacing the need for subscriptions",
      "Creating physical datacenters",
      "Guaranteeing that every resource is free",
    ],
    answer: 0,
    explanation:
      "A resource group is a logical container for resources that are managed together. Resources in a group can have different lifecycles, so plan management carefully.",
    tip: "Resource groups organize related resources; they do not replace subscriptions.",
  },
  {
    topic: "Management and governance",
    question: "An organization wants to apply rules that restrict which Azure resource types can be deployed. Which service should it consider?",
    options: [
      "Azure Monitor",
      "Azure Policy",
      "Azure DNS",
      "Azure Virtual Network",
    ],
    answer: 1,
    explanation:
      "Azure Policy helps organizations enforce or assess standards and rules for their resources, including restricting permitted resource types.",
    tip: "Policy is for rules and compliance. Monitor is for observing performance and activity.",
  },
  {
    topic: "Management and governance",
    question: "Which Azure service helps estimate the expected cost of planned Azure usage before deployment?",
    options: [
      "Azure Cost Management + Billing tools",
      "Azure Virtual Desktop",
      "Azure DNS",
      "Azure Load Balancer",
    ],
    answer: 0,
    explanation:
      "Azure pricing and cost tools help estimate, monitor, and analyze spending. Actual costs can vary with configuration and usage.",
    tip: "Use Azure pricing and cost-management tools to plan and monitor expenditure.",
  },
  {
    topic: "Cloud concepts",
    question: "Which cloud model combines private infrastructure with public cloud services?",
    options: [
      "Public cloud only",
      "Private cloud only",
      "Hybrid cloud",
      "A single local workstation",
    ],
    answer: 2,
    explanation:
      "A hybrid cloud combines private cloud or on-premises infrastructure with public cloud services, allowing workloads and data to be used across environments.",
    tip: "Hybrid means combining environments rather than relying on only one.",
  },
  {
    topic: "Azure architecture",
    question: "What is the purpose of Azure Availability Zones?",
    options: [
      "To separate resources across distinct datacenter locations within a region",
      "To group billing invoices by month",
      "To create usernames automatically",
      "To guarantee zero cost",
    ],
    answer: 0,
    explanation:
      "Availability Zones are physically separate locations within an Azure region, designed to improve resilience against certain datacenter-level failures.",
    tip: "Availability Zones provide additional physical separation within a region.",
  },
];

type Attempt = {
  selected: number;
  correct: boolean;
};

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Attempt>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[questionIndex];
  const attempt = answers[questionIndex];
  const correctCount = Object.values(answers).filter(
    (item) => item.correct
  ).length;
  const wrongIndexes = Object.entries(answers)
    .filter(([, item]) => !item.correct)
    .map(([index]) => Number(index));
  const progress = ((questionIndex + 1) / questions.length) * 100;

  function submitAnswer() {
    if (selected === null || showFeedback) return;

    const correct = selected === question.answer;

    setAnswers((previous) => ({
      ...previous,
      [questionIndex]: { selected, correct },
    }));
    setShowFeedback(true);
  }

  function nextQuestion() {
    setSelected(null);
    setShowFeedback(false);

    if (questionIndex === questions.length - 1) {
      if (!reviewMode) {
        const result = {
          correct: correctCount,
          total: questions.length,
          percentage: Math.round((correctCount / questions.length) * 100),
          questionsPracticed: Object.keys(answers).length,
        };
        try {
          window.localStorage.setItem("ascentrax-quiz-result", JSON.stringify(result));
          window.dispatchEvent(new Event("ascentrax-progress-updated"));
        } catch {
          console.warn("Could not save Ascentrax quiz progress.");
        }
      }
      setFinished(true);
    } else {
      setQuestionIndex((current) => current + 1);
    }
  }

  function startReview() {
    if (wrongIndexes.length === 0) return;

    setQuestionIndex(wrongIndexes[0]);
    setReviewMode(true);
    setFinished(false);
    setSelected(null);
    setShowFeedback(false);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setAnswers({});
    setSelected(null);
    setShowFeedback(false);
    setReviewMode(false);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((correctCount / questions.length) * 100);

    return (
      <section className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[#E1E8DF] bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2E8] text-3xl text-[#174D3B]">
            {percentage >= 70 ? "✓" : "↗"}
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#397557]">
            {reviewMode ? "REVIEW COMPLETE" : "PRACTICE COMPLETE"}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#203B2D]">
            {percentage >= 70
              ? "Great progress!"
              : "Every attempt is progress."}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#59665E]">
            {reviewMode
              ? "You've revisited the questions you previously missed. Keep practising to strengthen your understanding."
              : "Review your answers, understand your mistakes, and keep building your knowledge."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-xl bg-[#F4F7F2] p-4">
              <p className="text-sm text-[#59665E]">Correct answers</p>
              <p className="mt-2 text-3xl font-bold text-[#174D3B]">
                {correctCount}/{questions.length}
              </p>
            </div>
            <div className="rounded-xl bg-[#F4F7F2] p-4">
              <p className="text-sm text-[#59665E]">Score</p>
              <p className="mt-2 text-3xl font-bold text-[#174D3B]">
                {percentage}%
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={restartQuiz}
              className="flex-1 rounded-xl bg-[#174D3B] px-5 py-3 font-semibold text-white hover:bg-[#103C2D]"
            >
              Try the quiz again
            </button>

            {wrongIndexes.length > 0 && !reviewMode && (
              <button
                onClick={startReview}
                className="flex-1 rounded-xl border border-[#B9CEBA] bg-white px-5 py-3 font-semibold text-[#24553C] hover:bg-[#F4F7F2]"
              >
                Review mistakes ({wrongIndexes.length})
              </button>
            )}
          </div>

          <p className="mt-5 text-xs text-[#69756D]">
            These are original practice questions, not official exam questions
            or a prediction of your actual exam result.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397557]">
            AZ-900 PRACTICE
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#203B2D] sm:text-3xl">
            Test your understanding.
          </h2>
          <p className="mt-2 text-sm text-[#59665E]">
            Original questions with explanations to help you learn.
          </p>
        </div>
        <span className="rounded-full border border-[#DCE6DC] bg-white px-4 py-2 text-sm font-medium text-[#315B45]">
          {reviewMode ? "Mistake review" : "Practice mode"}
        </span>
      </div>

      <div className="rounded-2xl border border-[#E1E8DF] bg-white p-5 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-lg bg-[#EAF2E8] px-3 py-2 text-xs font-semibold text-[#315B45]">
            {question.topic}
          </span>
          <span className="text-sm text-[#69756D]">
            Question {questionIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="mt-5 h-2 rounded-full bg-[#E9EEE7]">
          <div
            className="h-2 rounded-full bg-[#397557] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h3 className="mt-8 text-lg font-semibold leading-8 text-[#24352C] sm:text-xl">
          {question.question}
        </h3>

        <div className="mt-6 space-y-3">
          {question.options.map((option, index) => {
            const isCorrect = index === question.answer;
            const isSelected = selected === index;

            let style =
              "border-[#E1E8DF] bg-white text-[#34463A] hover:border-[#8EAD95] hover:bg-[#F8FAF7]";

            if (showFeedback && isCorrect) {
              style = "border-[#78A886] bg-[#EAF4E9] text-[#205333]";
            } else if (showFeedback && isSelected && !isCorrect) {
              style = "border-[#D9A09A] bg-[#FFF0ED] text-[#873D35]";
            } else if (isSelected) {
              style = "border-[#397557] bg-[#F0F5EE] text-[#174D3B] ring-1 ring-[#397557]";
            }

            return (
              <button
                key={option}
                disabled={showFeedback}
                onClick={() => setSelected(index)}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm leading-6 transition ${style}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-current/20 text-xs font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 pt-0.5">{option}</span>
                {showFeedback && isCorrect && (
                  <span className="font-bold">✓</span>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <span className="font-bold">✕</span>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div
            className={`mt-6 rounded-xl border p-5 ${
              attempt?.correct
                ? "border-[#C9E0C8] bg-[#F0F7EF]"
                : "border-[#E9D9B5] bg-[#FFFAEF]"
            }`}
          >
            <p className="font-semibold text-[#24352C]">
              {attempt?.correct
                ? "Correct! Well done."
                : "Not quite. Here's what to learn."}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#46564B]">
              {question.explanation}
            </p>
            <div className="mt-4 border-t border-[#DCE4D6] pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#397557]">
                Remember this
              </p>
              <p className="mt-2 text-sm leading-6 text-[#46564B]">
                {question.tip}
              </p>
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-col-reverse justify-between gap-3 sm:flex-row">
          <button
            onClick={() => {
              if (questionIndex > 0) {
                setQuestionIndex(questionIndex - 1);
                setSelected(answers[questionIndex - 1]?.selected ?? null);
                setShowFeedback(Boolean(answers[questionIndex - 1]));
              }
            }}
            disabled={questionIndex === 0 || showFeedback}
            className="rounded-xl border border-[#DCE6DC] px-5 py-3 text-sm font-semibold text-[#315B45] hover:bg-[#F4F7F2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          {!showFeedback ? (
            <button
              onClick={submitAnswer}
              disabled={selected === null}
              className="rounded-xl bg-[#174D3B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#103C2D] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="rounded-xl bg-[#174D3B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#103C2D]"
            >
              {questionIndex === questions.length - 1
                ? "See results"
                : "Next question →"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#69756D]">
        <span>Correct so far: {correctCount}</span>
        <span>Independent AZ-900 study prototype</span>
      </div>
    </section>
  );
}
