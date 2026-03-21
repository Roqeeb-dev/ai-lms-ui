"use client";

import { useState } from "react";
import {
  createLesson,
  getModuleLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
  completeLesson,
  CreateLessonPayload,
  UpdateLessonPayload,
} from "@/services/lessonService";
import { Lesson } from "@/types/lesson";
import { getErrorMessage } from "./useInstructorCourses";

export function useLesson() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingSingle, setFetchingSingle] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addLesson(moduleId: string, data: CreateLessonPayload) {
    setCreating(true);
    setError(null);
    try {
      const res = await createLesson(moduleId, data);
      setLessons((prev) => [...prev, res.lesson]);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setCreating(false);
    }
  }

  async function fetchModuleLessons(moduleId: string) {
    setFetching(true);
    setError(null);
    try {
      const res = await getModuleLessons(moduleId);
      setLessons(res.lessons);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setFetching(false);
    }
  }

  async function fetchSingleLesson(lessonId: string) {
    setFetchingSingle(true);
    setError(null);
    try {
      const res = await getSingleLesson(lessonId);
      setSelectedLesson(res.lesson);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setFetchingSingle(false);
    }
  }

  async function editLesson(lessonId: string, data: UpdateLessonPayload) {
    setUpdating(true);
    setError(null);
    try {
      const res = await updateLesson(lessonId, data);
      setLessons((prev) =>
        prev.map((l) => (l.id === lessonId ? res.lesson : l)),
      );
      if (selectedLesson?.id === lessonId) setSelectedLesson(res.lesson);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setUpdating(false);
    }
  }

  async function removeLesson(lessonId: string) {
    setDeleting(true);
    setError(null);
    try {
      const res = await deleteLesson(lessonId);
      setLessons((prev) => prev.filter((l) => l.id !== lessonId));
      if (selectedLesson?.id === lessonId) setSelectedLesson(null);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setDeleting(false);
    }
  }

  async function markLessonComplete(lessonId: string) {
    setCompleting(true);
    setError(null);
    try {
      const res = await completeLesson(lessonId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setCompleting(false);
    }
  }

  return {
    lessons,
    selectedLesson,
    error,
    creating,
    fetching,
    fetchingSingle,
    updating,
    deleting,
    completing,
    addLesson,
    fetchModuleLessons,
    fetchSingleLesson,
    editLesson,
    removeLesson,
    markLessonComplete,
  };
}
