"use client";

import { useState } from "react";
import {
  getQuiz,
  createQuiz,
  startQuiz,
  submitQuiz,
  CreateQuizPayload,
  SubmitQuizPayload,
} from "@/services/quizService";

export function useQuiz() {
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create quiz (Instructor)
  async function createQuizAsInstructor(
    lessonId: string,
    data: CreateQuizPayload,
  ) {
    setCreating(true);
    setError(null);

    try {
      const res = await createQuiz(lessonId, data);
      return res;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      console.error(err?.message || err);
    } finally {
      setCreating(false);
    }
  }

  // Start quiz (Student)
  async function startQuizAsStudent(quizId: string) {
    setStarting(true);
    setError(null);

    try {
      const res = await startQuiz(quizId);
      return res;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      console.error(err?.message || err);
    } finally {
      setStarting(false);
    }
  }

  // Submit quiz (Student)
  async function submitQuizAsStudent(
    attemptId: string,
    data: SubmitQuizPayload,
  ) {
    setSubmitting(true);
    setError(null);

    try {
      const res = await submitQuiz(attemptId, data);
      return res;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      console.error(err?.message || err);
    } finally {
      setSubmitting(false);
    }
  }

  // Get quiz (Student)
  async function getQuizAsStudent(quizId: string) {
    setFetching(true);
    setError(null);

    try {
      const res = await getQuiz(quizId);
      return res;
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      console.error(err?.message || err);
    } finally {
      setFetching(false);
    }
  }

  return {
    creating,
    starting,
    submitting,
    fetching,
    error,

    createQuizAsInstructor,
    startQuizAsStudent,
    submitQuizAsStudent,
    getQuizAsStudent,
  };
}
