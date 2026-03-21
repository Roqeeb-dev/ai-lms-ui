"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { Course } from "@/types/course";
import BuilderHeader from "@/components/BuilderHeader";
import BuilderContent from "@/components/BuilderContent";
import BuilderEditor from "@/components/BuilderEditor";

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

  if (fetchingCourseDetails) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-foreground-muted">
        Loading course...
      </div>
    );
  }

  if (!courseDetails) return null;

  return (
    <div className="flex flex-col h-full">
      <BuilderHeader courseDetails={courseDetails} />

      <div className="flex flex-1 overflow-hidden">
        <BuilderContent courseDetails={courseDetails} />

        <BuilderEditor />
      </div>
    </div>
  );
}
