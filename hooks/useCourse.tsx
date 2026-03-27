"use client";

import { useState } from "react";
import { course } from "@/services/courseService";
import { Course } from "@/types/course";
import { getErrorMessage } from "./useInstructorCourses";
import { useToastStore } from "@/store/useToastStore";

export function useCourse() {
  const [fetchingCourseDetails, setFetchingCourseDetails] = useState(false);
  const [gettingCourses, setGettingCourses] = useState(false);
  const [fetchingAllCourses, setFetchingAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  async function getCourseDetails(courseId: string) {
    setFetchingCourseDetails(true);
    setError(null);

    try {
      const res = await course.getSingleCourse(courseId);
      addToast("Course details fetched successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setFetchingCourseDetails(false);
    }
  }

  async function getInstructorCourses(instructorId: string) {
    setGettingCourses(true);
    setError(null);

    try {
      const res = await course.getInstructorCourses(instructorId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setGettingCourses(false);
    }
  }

  async function getAllCourses() {
    setFetchingAllCourses(true);
    setError(null);

    try {
      const res = await course.getAllCourses();
      setAllCourses(res.courses);
      addToast("All courses fetched successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setFetchingAllCourses(false);
    }
  }

  return {
    fetchingCourseDetails,
    gettingCourses,
    fetchingAllCourses,
    allCourses,
    error,
    getCourseDetails,
    getInstructorCourses,
    getAllCourses,
  };
}
