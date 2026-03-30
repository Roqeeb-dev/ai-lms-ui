"use client";

import { useState, useCallback } from "react";
import {
  getCourseAnalytics,
  getInstructorQuizAnalytics,
  getStudentAnalytics,
  CourseAnalytics,
  QuizAnalytics,
  StudentAnalytics,
} from "@/services/analyticsService";

type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function initialState<T>(): AsyncState<T> {
  return { data: null, loading: false, error: null };
}

export function useAnalytics() {
  const [courseAnalytics, setCourseAnalytics] =
    useState<AsyncState<CourseAnalytics>>(initialState());

  const [quizAnalytics, setQuizAnalytics] =
    useState<AsyncState<QuizAnalytics>>(initialState());

  const [studentAnalytics, setStudentAnalytics] =
    useState<AsyncState<StudentAnalytics>>(initialState());

  const fetchCourseAnalytics = useCallback(async (courseId: string) => {
    setCourseAnalytics({ data: null, loading: true, error: null });
    try {
      const data = await getCourseAnalytics(courseId);
      setCourseAnalytics({ data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load course analytics";
      setCourseAnalytics({ data: null, loading: false, error: message });
    }
  }, []);

  const fetchQuizAnalytics = useCallback(async (quizId: string) => {
    setQuizAnalytics({ data: null, loading: true, error: null });
    try {
      const data = await getInstructorQuizAnalytics(quizId);
      setQuizAnalytics({ data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load quiz analytics";
      setQuizAnalytics({ data: null, loading: false, error: message });
    }
  }, []);

  const fetchStudentAnalytics = useCallback(async () => {
    setStudentAnalytics({ data: null, loading: true, error: null });
    try {
      const data = await getStudentAnalytics();
      setStudentAnalytics({ data, loading: false, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load student analytics";
      setStudentAnalytics({ data: null, loading: false, error: message });
    }
  }, []);

  return {
    courseAnalytics,
    quizAnalytics,
    studentAnalytics,
    fetchCourseAnalytics,
    fetchQuizAnalytics,
    fetchStudentAnalytics,
  };
}
