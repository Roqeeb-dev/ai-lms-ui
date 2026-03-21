"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { Course } from "@/types/course";

export default function BuilderClient() {
  const params = useParams<{ courseId: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const { fetchingCourseDetails, getCourseDetails } = useCourse();

  useEffect(() => {
    async function fetchCourse() {
      const res = await getCourseDetails(params.courseId);
      if (!res) return;
      setCourseDetails(res.course);
    }
    fetchCourse();
  }, [params.courseId]);

  if (fetchingCourseDetails) return <div>Loading...</div>;
  if (!courseDetails) return null;

  return (
    <main>
      <div>
        <h1>{courseDetails.title}</h1>
        <h2>{courseDetails.description}</h2>
      </div>
      <div>This is the left panel</div>
      <div>This is the right panel</div>
    </main>
  );
}
