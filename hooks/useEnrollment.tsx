"use client";

import { useState, useEffect, useCallback } from "react";
import {
  createCourseEnrollment,
  getCoursesEnrollment,
  getCourseStudents,
} from "@/services/enrollmentService";
import {
  EnrollmentWithCourse,
  EnrollmentWithStudent,
} from "@/types/enrollment";
import { getErrorMessage } from "./useInstructorCourses";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

interface UseEnrollmentOptions {
  publishedOnly?: boolean;
}

export function useEnrollment({
  publishedOnly = false,
}: UseEnrollmentOptions = {}) {
  const { user } = useUserStore();
  const { addToast } = useToastStore();

  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [courseStudents, setCourseStudents] = useState<EnrollmentWithStudent[]>(
    [],
  );
  const [fetching, setFetching] = useState(false);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!user || user.role !== "student") return;

    async function fetchEnrollments() {
      setFetching(true);
      setError(null);
      try {
        const res = await getCoursesEnrollment();
        if (isMounted) {
          setEnrollments(res.enrollments);
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

    fetchEnrollments();

    return () => {
      isMounted = false;
    };
  }, [user, addToast]);

  async function enroll(courseId: string) {
    setEnrolling(true);
    setError(null);
    try {
      const res = await createCourseEnrollment(courseId);
      addToast("Enrolled in course successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setEnrolling(false);
    }
  }

  const fetchCourseStudents = useCallback(
    async (courseId: string) => {
      setFetchingStudents(true);
      setError(null);

      try {
        const res = await getCourseStudents(courseId);
        setCourseStudents(res.enrollments);
        return res;
      } catch (err: any) {
        const message = getErrorMessage(err);
        setError(message);
        addToast(message, "error");
        console.error(message);
        throw new Error(message);
      } finally {
        setFetchingStudents(false);
      }
    },
    [addToast],
  );

  async function refetchEnrollments() {
    try {
      const res = await getCoursesEnrollment();
      if (res) setEnrollments(res.enrollments);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    }
  }

  const filteredEnrollments = publishedOnly
    ? enrollments.filter((e) => e.course?.status === "published")
    : enrollments;

  const avgProgress =
    filteredEnrollments.length > 0
      ? Math.round(
          filteredEnrollments.reduce((acc, e) => acc + (e.course ? 0 : 0), 0) /
            filteredEnrollments.length,
        )
      : 0;

  return {
    enrollments: filteredEnrollments,
    courseStudents,
    fetching,
    fetchingStudents,
    enrolling,
    error,
    avgProgress,
    enroll,
    fetchCourseStudents,
    refetchEnrollments,
  };
}
