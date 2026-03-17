import { course, CreateCoursePayload } from "@/services/courseService";
import { Course } from "@/types/course";
import { useState, useEffect } from "react";

export function useInstructorCourses() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    async function fetchLoggedInInstructorCourses() {
      setFetching(true);
      try {
        const res = await course.getLoggedInInstructorCourses();
        setCourses(res.courses);
      } catch (err: any) {
        setError(err.message || "Failed to fetch courses");
        console.error(err.message ?? err);
      } finally {
        setFetching(false);
      }
    }

    fetchLoggedInInstructorCourses();
  }, []);

  async function createCourse(data: CreateCoursePayload) {
    setCreating(true);
    try {
      const res = await course.createCourse(data);
      setCourses((prev) => (prev ? [...prev, res.course] : [res.course]));
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error(err.message ?? err);
    } finally {
      setCreating(false);
    }
  }

  async function updateCourse(
    courseId: string,
    data: Partial<CreateCoursePayload>,
  ) {
    setUpdating(true);
    try {
      const res = await course.updateCourse(courseId, data);
      if (!res) return;
      setCourses((prev) =>
        prev ? prev.map((c) => (c.id === courseId ? res.course : c)) : null,
      );
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error(err.message ?? err);
    } finally {
      setUpdating(false);
    }
  }

  async function deleteCourse(courseId: string) {
    setDeleting(true);
    try {
      await course.deleteCourse(courseId);
      setCourses((prev) =>
        prev ? prev.filter((c) => c.id !== courseId) : null,
      );
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      console.error(err.message ?? err);
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
