"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { Quiz } from "@/types/quiz";
import { Answer } from "@/services/quizService";
import { QuizIntro } from "@/components/QuizIntro";
import { QuizResult } from "@/components/QuizResult";
import { QuizActiveSection } from "@/components/QuizActiveSection";
import { useLesson } from "@/hooks/useLesson";

type Stage = "intro" | "active" | "results" | "exhausted";

export interface QuizResult {
  score: number;
  percentage: number;
  passed: boolean;
  duration: number;
  passingScore: number;
  totalQuestions: number;
  startedAt: Date;
  submittedAt: Date;
}

// --- localStorage helpers ---
function getAttemptedQuizIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem("attemptedQuizIds") || "[]");
  } catch {
    return [];
  }
}

function markQuizAsAttempted(quizId: string) {
  const existing = getAttemptedQuizIds();
  if (!existing.includes(quizId)) {
    localStorage.setItem(
      "attemptedQuizIds",
      JSON.stringify([...existing, quizId]),
    );
  }
}

function hasAttemptedQuiz(quizId: string): boolean {
  return getAttemptedQuizIds().includes(quizId);
}
// ----------------------------

export function QuizViewerClient() {
  const params = useParams<{ courseId: string; quizId: string }>();
  const router = useRouter();
  const { markLessonComplete } = useLesson();

  const {
    startQuizAsStudent,
    submitQuizAsStudent,
    getQuizAsStudent,
    fetching,
    starting,
    submitting,
  } = useQuiz();

  const [stage, setStage] = useState<Stage>("intro");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    async function loadQuiz() {
      if (!params.quizId) return;

      try {
        const quizRes = await getQuizAsStudent(params.quizId);

        if (quizRes?.data) {
          setQuiz(quizRes.data);

          // Check localStorage — if already attempted and maxAttempts is 1,
          // skip straight to exhausted stage
          if (hasAttemptedQuiz(params.quizId)) {
            setStage("exhausted");
          }
        } else {
          console.warn("No quiz found for this lesson ID:", params.quizId);
        }
      } catch (error: any) {
        console.error("Failed to fetch quiz:", error.message, error);
      }
    }

    loadQuiz();
  }, [params.quizId]);

  async function handleStart() {
    if (!quiz) return;
    try {
      const res = await startQuizAsStudent(quiz.id);
      setAttemptId(res.data.id);
      setStage("active");
    } catch (error) {
      console.error("Failed to start quiz:", error);
    }
  }

  function handleSelectOption(optionIdx: number) {
    setSelectedOption(optionIdx);
  }

  function handleNext() {
    if (selectedOption === null || !quiz) return;

    const currentQuestion = quiz.questions[currentIndex];
    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion._id),
      { questionId: currentQuestion._id, selectedOption },
    ];

    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }

  async function handleSubmit() {
    if (selectedOption === null || !quiz || !attemptId) return;

    const currentQuestion = quiz.questions[currentIndex];
    const finalAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion._id),
      { questionId: currentQuestion._id, selectedOption },
    ];

    try {
      const res = await submitQuizAsStudent(attemptId, {
        answers: finalAnswers,
      });

      await markLessonComplete(quiz.lessonId);

      // Write to localStorage so Client.tsx and LessonViewer know this quiz
      // has been attempted without needing an extra fetch
      markQuizAsAttempted(params.quizId);

      setResult({
        score: res.data.score,
        percentage: res.data.percentage,
        passed: res.data.passed,
        duration: res.data.duration,
        passingScore: res.data.quiz.passingScore,
        totalQuestions: res.data.answers.length,
        startedAt: res.data.startedAt,
        submittedAt: res.data.submittedAt,
      });
      setStage("results");
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  }

  const isLastQuestion = quiz && currentIndex === quiz.questions.length - 1;

  if (stage === "intro") {
    return (
      <QuizIntro
        onBack={() => router.back()}
        fetchingByLesson={fetching}
        starting={starting}
        quiz={quiz}
        handleStart={handleStart}
      />
    );
  }

  if (stage === "active" && quiz) {
    const question = quiz.questions[currentIndex];

    return (
      <QuizActiveSection
        currentIndex={currentIndex}
        quiz={quiz}
        question={question}
        submitting={submitting}
        isLastQuestion={!!isLastQuestion}
        selectedOption={selectedOption}
        handleSelectOption={handleSelectOption}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (stage === "results" && result) {
    return (
      <QuizResult
        result={result}
        courseId={params.courseId}
        onBackToCourse={(courseId) =>
          router.push(`/dashboard/student/courses/${courseId}`)
        }
      />
    );
  }

  if (stage === "exhausted") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 flex flex-col items-center gap-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">
              Attempt Limit Reached
            </h2>
            <p className="text-sm text-foreground-muted leading-relaxed">
              You have already completed this quiz. No more attempts are
              available.
            </p>
          </div>
          <button
            onClick={() =>
              router.push(`/dashboard/student/courses/${params.courseId}`)
            }
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return null;
}
