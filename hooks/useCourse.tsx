"use client";

import { useState } from "react";
import { course } from "@/services/courseService";
import { Course } from "@/types/course";
import { getErrorMessage } from "./useInstructorCourses";

export function useCourse() {
  const [fetchingCourseDetails, setFetchingCourseDetails] =
    useState<boolean>(false);
  const [gettingCourses, setGettingCourses] = useState<boolean>(false);
  const [fetchingAllCourses, setFetchingAllCourses] = useState<boolean>(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function getCourseDetails(courseId: string) {
    setFetchingCourseDetails(true);
    setError(null);
    try {
      const res = await course.getSingleCourse(courseId);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      console.error(message);
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
      console.error(message);
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
      console.error(message);
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
