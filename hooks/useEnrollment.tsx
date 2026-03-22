"use client";

import { useState, useEffect } from "react";
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

export function useEnrollment() {
  const { user } = useUserStore();
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
        if (isMounted) setEnrollments(res.enrollments);
      } catch (err: any) {
        const message = getErrorMessage(err);
        if (isMounted) setError(message);
        console.error(message);
      } finally {
        if (isMounted) setFetching(false);
      }
    }

    fetchEnrollments();

    return () => {
      isMounted = false;
    };
  }, [user]);

  async function enroll(courseId: string) {
    setEnrolling(true);
    setError(null);
    try {
      const res = await createCourseEnrollment(courseId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setEnrolling(false);
    }
  }

  async function fetchCourseStudents(courseId: string) {
    setFetchingStudents(true);
    setError(null);
    try {
      const res = await getCourseStudents(courseId);
      setCourseStudents(res.enrollments);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
    } finally {
      setFetchingStudents(false);
    }
  }

  const avgProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((acc, e) => acc + (e.course ? 0 : 0), 0) /
            enrollments.length,
        )
      : 0;

  return {
    enrollments,
    courseStudents,
    fetching,
    fetchingStudents,
    enrolling,
    error,
    avgProgress,
    enroll,
    fetchCourseStudents,
  };
}
