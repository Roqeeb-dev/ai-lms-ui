"use client";

import { course, CreateCoursePayload } from "@/services/courseService";
import { Course } from "@/types/course";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

export function getErrorMessage(err: any): string {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong"
  );
}

export function useInstructorCourses() {
  const { user } = useUserStore();
  const { addToast } = useToastStore();

  const [fetching, setFetching] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    let isMounted = true;

    if (!user || user.role !== "instructor") return;

    async function fetchLoggedInInstructorCourses() {
      setFetching(true);
      setError(null);

      try {
        const res = await course.getLoggedInInstructorCourses();
        if (isMounted) {
          setCourses(res.courses ?? []);
        }
      } catch (err: any) {
        const message = getErrorMessage(err);
        if (isMounted) {
          setError(message);
          addToast(message, "error");
        }
        console.error(message);
      } finally {
        if (isMounted) setFetching(false);
      }
    }

    fetchLoggedInInstructorCourses();

    return () => {
      isMounted = false;
    };
  }, [user, addToast]);

  async function createCourse(data: CreateCoursePayload) {
    setCreating(true);
    setError(null);
    try {
      const res = await course.createCourse(data);
      setCourses((prev) => [...prev, res.course]);
      addToast("Course created successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setCreating(false);
    }
  }

  async function updateCourse(
    courseId: string,
    data: Partial<CreateCoursePayload>,
  ) {
    setUpdating(true);
    setError(null);
    try {
      const res = await course.updateCourse(courseId, data);
      if (!res) return;
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? res.course : c)),
      );
      addToast("Course updated successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setUpdating(false);
    }
  }

  async function deleteCourse(courseId: string) {
    setDeleting(true);
    setError(null);
    try {
      await course.deleteCourse(courseId);
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
      addToast("Course deleted successfully!", "success");
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setDeleting(false);
    }
  }

  return {
    fetching,
    creating,
    createCourse,
    updating,
    updateCourse,
    deleting,
    deleteCourse,
    courses,
    error,
  };
}
