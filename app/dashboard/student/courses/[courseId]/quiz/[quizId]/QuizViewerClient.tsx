"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { Quiz } from "@/types/quiz";
import { Answer } from "@/services/quizService";
import { QuizIntro } from "@/components/QuizIntro";
import { QuizResult } from "@/components/QuizResult";
import { QuizActiveSection } from "@/components/QuizActiveSection";

type Stage = "intro" | "active" | "results";

export interface QuizResult {
  score: number;
  percentage: number;
  passed: boolean;
  duration: number;
}

export function QuizViewerClient() {
  const params = useParams<{ courseId: string; quizId: string }>();
  const router = useRouter();

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
      setResult({
        score: res.data.score,
        percentage: res.data.percentage,
        passed: res.data.passed,
        duration: res.data.duration,
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

  return null;
}
