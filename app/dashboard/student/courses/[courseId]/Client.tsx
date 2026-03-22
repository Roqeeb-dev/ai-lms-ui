"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { useModule } from "@/hooks/useModule";
import { useLesson } from "@/hooks/useLesson";
import { useEnrollment } from "@/hooks/useEnrollment";
import { Course } from "@/types/course";
import { Module } from "@/types/module";
import { Lesson } from "@/types/lesson";
import CourseContentHeader from "@/components/CourseContentHeader";
import CourseOutline from "@/components/CourseOutline";
import LessonViewer from "@/components/LessonViewer";

export type LessonMap = Record<string, Lesson[]>;

export default function Client() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();

  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonsMap, setLessonsMap] = useState<LessonMap>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const { getCourseDetails, fetchingCourseDetails } = useCourse();
  const {
    modules,
    fetchCourseModules,
    fetching: fetchingModules,
  } = useModule();
  const { fetchModuleLessons, markLessonComplete, completing } = useLesson();
  const { enrollments } = useEnrollment();

  // fetch course
  useEffect(() => {
    async function init() {
      const res = await getCourseDetails(params.courseId);
      if (!res) return;
      setCourseDetails(res.course);
    }
    init();
  }, [params.courseId]);

  // fetch modules
  useEffect(() => {
    async function initModules() {
      await fetchCourseModules(params.courseId);
    }
    initModules();
  }, [params.courseId]);

  // fetch all lessons for all modules once modules are loaded
  useEffect(() => {
    async function initLessons() {
      if (!modules.length) return;
      const results = await Promise.all(
        modules.map((mod) => fetchModuleLessons(mod.id)),
      );
      const map: LessonMap = {};
      modules.forEach((mod, idx) => {
        map[mod.id] = results[idx]?.lessons ?? [];
      });
      setLessonsMap(map);
    }
    initLessons();
  }, [modules]);

  // get completedLessons from enrollment
  useEffect(() => {
    const enrollment = enrollments.find((e) => e.course.id === params.courseId);
    if (enrollment) {
      setCompletedLessons([]); // backend doesn't return this on populated enrollment yet
    }
  }, [enrollments, params.courseId]);

  const allLessons = Object.values(lessonsMap).flat();
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;

  async function handleComplete() {
    if (!selectedLesson) return;
    const res = await markLessonComplete(selectedLesson.id);
    if (!res) return;
    setCompletedLessons(res.enrollment.completedLessons ?? []);
  }

  function handleSelectLesson(lesson: Lesson) {
    setSelectedLesson(lesson);
  }

  function handlePrev() {
    if (!selectedLesson) return;
    const idx = allLessons.findIndex((l) => l.id === selectedLesson.id);
    if (idx > 0) setSelectedLesson(allLessons[idx - 1]);
  }

  function handleNext() {
    if (!selectedLesson) return;
    const idx = allLessons.findIndex((l) => l.id === selectedLesson.id);
    if (idx < allLessons.length - 1) setSelectedLesson(allLessons[idx + 1]);
  }

  const isLoading = fetchingCourseDetails || fetchingModules;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-foreground-muted">
        Loading course...
      </div>
    );
  }

  if (!courseDetails) return null;

  return (
    <div className="flex flex-col h-full">
      <CourseContentHeader
        courseTitle={courseDetails.title}
        completedCount={completedCount}
        totalLessons={totalLessons}
        onBack={() => router.push("/dashboard/student/courses")}
      />
      <div className="flex flex-1 overflow-hidden">
        <CourseOutline
          modules={modules}
          lessonsMap={lessonsMap}
          selectedLesson={selectedLesson}
          completedLessons={completedLessons}
          onSelectLesson={handleSelectLesson}
        />
        <LessonViewer
          lesson={selectedLesson}
          completing={completing}
          isCompleted={
            selectedLesson
              ? completedLessons.includes(selectedLesson.id)
              : false
          }
          hasPrev={
            selectedLesson
              ? allLessons.findIndex((l) => l.id === selectedLesson.id) > 0
              : false
          }
          //   hasNext={
          //     selectedLesson
          //       ? allLessons.findIndex((l) => l.id === selectedLesson.id)
          //         allLessons.length - 1
          //       : false
          //   }
          //   onComplete={handleComplete}
          //   onPrev={handlePrev}
          //   onNext={handleNext}
        />
      </div>
    </div>
  );
}
