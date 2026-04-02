"use client";

import { useState } from "react";
import {
  getQuiz,
  createQuiz,
  startQuiz,
  submitQuiz,
  getQuizzesByLesson,
  CreateQuizPayload,
  SubmitQuizPayload,
} from "@/services/quizService";
import { useToastStore } from "@/store/useToastStore";

function getErrorMessage(err: any): string {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong"
  );
}

export function useQuiz() {
  const [creating, setCreating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingByLesson, setFetchingByLesson] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  async function createQuizAsInstructor(
    lessonId: string,
    data: CreateQuizPayload,
  ) {
    setCreating(true);
    setError(null);
    try {
      const res = await createQuiz(lessonId, data);
      addToast("Quiz created successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setCreating(false);
    }
  }

  async function fetchQuizzesByLesson(lessonId: string) {
    setFetchingByLesson(true);
    setError(null);
    try {
      const res = await getQuizzesByLesson(lessonId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setFetchingByLesson(false);
    }
  }

  // Start quiz (Student)
  async function startQuizAsStudent(quizId: string) {
    setStarting(true);
    setError(null);
    try {
      const res = await startQuiz(quizId);
      addToast("Quiz started!", "info");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
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
      addToast("Quiz submitted successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setSubmitting(false);
    }
  }

  // Get single quiz by ID (Student)
  async function getQuizAsStudent(quizId: string) {
    setFetching(true);
    setError(null);
    try {
      const res = await getQuiz(quizId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setFetching(false);
    }
  }

  return {
    creating,
    starting,
    submitting,
    fetching,
    fetchingByLesson,
    error,

    createQuizAsInstructor,
    fetchQuizzesByLesson,
    startQuizAsStudent,
    submitQuizAsStudent,
    getQuizAsStudent,
  };
}
