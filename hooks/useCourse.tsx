"use client";

import { useState } from "react";
import { course } from "@/services/courseService";
import { Course, CourseProgress } from "@/types/course";
import { getErrorMessage } from "./useInstructorCourses";
import { useToastStore } from "@/store/useToastStore";

interface UseCourseOptions {
  publishedOnly?: boolean;
}

export function useCourse({ publishedOnly = false }: UseCourseOptions = {}) {
  const [fetchingCourseDetails, setFetchingCourseDetails] = useState(false);
  const [gettingCourses, setGettingCourses] = useState(false);
  const [fetchingAllCourses, setFetchingAllCourses] = useState(false);
  const [fetchingProgress, setFetchingProgress] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  async function getCourseDetails(courseId: string) {
    setFetchingCourseDetails(true);
    setError(null);
    try {
      const res = await course.getSingleCourse(courseId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
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
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setFetchingAllCourses(false);
    }
  }

  async function getCourseProgress(courseId: string) {
    setFetchingProgress(true);
    setError(null);
    try {
      const res = await course.getCourseProgress(courseId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setFetchingProgress(false);
    }
  }

  const filteredCourses = publishedOnly
    ? allCourses.filter((c) => c.status === "published")
    : allCourses;

  return {
    fetchingCourseDetails,
    gettingCourses,
    fetchingAllCourses,
    fetchingProgress,
    allCourses: filteredCourses,
    error,
    getCourseDetails,
    getInstructorCourses,
    getAllCourses,
    getCourseProgress,
  };
}
