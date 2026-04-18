"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { useModule } from "@/hooks/useModule";
import { useLesson } from "@/hooks/useLesson";
import { useEnrollment } from "@/hooks/useEnrollment";
import { Course } from "@/types/course";
import { Lesson } from "@/types/lesson";
import CourseContentHeader from "@/components/CourseContentHeader";
import CourseOutline from "@/components/CourseOutline";
import LessonViewer from "@/components/LessonViewer";
import LoadingScreen from "@/components/LoadingPage";

export type LessonMap = Record<string, Lesson[]>;
export type LessonTab = "lesson" | "discussion";

export default function Client() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();

  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonsMap, setLessonsMap] = useState<LessonMap>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<LessonTab>("lesson");

  const { getCourseDetails, fetchingCourseDetails, getCourseProgress } =
    useCourse();
  const {
    modules,
    fetchCourseModules,
    fetching: fetchingModules,
  } = useModule();
  const { fetchModuleLessons, markLessonComplete, completing } = useLesson();

  useEffect(() => {
    async function init() {
      const res = await getCourseDetails(params.courseId);
      if (!res) return;
      setCourseDetails(res.course);
    }
    init();
  }, [params.courseId]);

  useEffect(() => {
    async function initModules() {
      await fetchCourseModules(params.courseId);
    }
    initModules();
  }, [params.courseId]);

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

  useEffect(() => {
    async function initProgress() {
      try {
        const res = await getCourseProgress(params.courseId);
        if (res?.progress?.completedLessons) {
          setCompletedLessons(res.progress.completedLessons.map((l) => l.id));
        }
      } catch {}
    }
    initProgress();
  }, [params.courseId]);

  const allLessons = Object.values(lessonsMap).flat();
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;

  const hasAttempted =
    selectedLesson?.type === "quiz" && selectedLesson?.quizId
      ? (() => {
          try {
            const attempted: string[] = JSON.parse(
              localStorage.getItem("attemptedQuizIds") || "[]",
            );
            return attempted.includes(selectedLesson.quizId);
          } catch {
            return false;
          }
        })()
      : false;

  async function handleComplete() {
    if (!selectedLesson) return;
    const res = await markLessonComplete(selectedLesson.id);
    if (!res) return;
    setCompletedLessons(res.enrollment.completedLessons ?? []);
  }

  function handleSelectLesson(lesson: Lesson) {
    setSelectedLesson(lesson);
    setActiveTab("lesson");
  }

  function handlePrev() {
    if (!selectedLesson) return;
    const idx = allLessons.findIndex((l) => l.id === selectedLesson.id);
    if (idx > 0) {
      setSelectedLesson(allLessons[idx - 1]);
      setActiveTab("lesson");
    }
  }

  function handleNext() {
    if (!selectedLesson) return;
    const idx = allLessons.findIndex((l) => l.id === selectedLesson.id);
    if (idx < allLessons.length - 1) {
      setSelectedLesson(allLessons[idx + 1]);
      setActiveTab("lesson");
    }
  }

  const isLoading = fetchingCourseDetails || fetchingModules;

  if (isLoading) {
    return <LoadingScreen text="Loading course" />;
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

      <div className="flex-1 overflow-y-auto">
        <LessonViewer
          lesson={selectedLesson}
          courseId={courseDetails.id}
          activeTab={activeTab}
          onTabChange={setActiveTab}
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
          hasNext={
            selectedLesson
              ? allLessons.findIndex((l) => l.id === selectedLesson.id) <
                allLessons.length - 1
              : false
          }
          onComplete={handleComplete}
          onPrev={handlePrev}
          onNext={handleNext}
          hasAttempted={hasAttempted}
        />

        <CourseOutline
          modules={modules}
          lessonsMap={lessonsMap}
          selectedLesson={selectedLesson}
          completedLessons={completedLessons}
          onSelectLesson={handleSelectLesson}
        />
      </div>
    </div>
  );
}
