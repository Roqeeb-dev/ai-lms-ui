"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { useModule } from "@/hooks/useModule";
import { useLesson } from "@/hooks/useLesson";
import { Course } from "@/types/course";
import BuilderHeader from "@/components/BuilderHeader";
import BuilderContent from "@/components/BuilderContent";
import BuilderEditor from "@/components/BuilderEditor";
import { Lesson } from "@/types/lesson";

export type SelectionType =
  | { type: "new-module" }
  | { type: "module"; selectedId: string }
  | { type: "new-lesson"; moduleId: string }
  | { type: "lesson"; selectedId: string }
  | { type: null };

export default function BuilderClient() {
  const params = useParams<{ courseId: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [selectedItem, setSelectedItem] = useState<SelectionType>({
    type: null,
  });

  const { fetchingCourseDetails, getCourseDetails } = useCourse();

  const {
    modules,
    fetching: fetchingModules,
    fetchCourseModules,
    addModule,
    editModule,
    removeModule,
  } = useModule();

  const { fetchModuleLessons, addLesson, editLesson, removeLesson } =
    useLesson();

  async function fetchLessons(moduleId: string) {
    if (lessonsMap[moduleId]) return;
    const res = await fetchModuleLessons(moduleId);
    if (!res) return;
    setLessonsMap((prev) => ({ ...prev, [moduleId]: res.lessons }));
  }

  useEffect(() => {
    async function fetchCourse() {
      const res = await getCourseDetails(params.courseId);
      if (!res) return;
      setCourseDetails(res.course);
    }
    fetchCourse();
  }, [params.courseId]);

  useEffect(() => {
    async function fetchModules() {
      await fetchCourseModules(params.courseId);
    }
    fetchModules();
  }, [params.courseId]);

  if (fetchingCourseDetails || fetchingModules) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-foreground-muted">
        Loading...
      </div>
    );
  }

  if (!courseDetails) return null;

  return (
    <div className="flex flex-col h-full">
      <BuilderHeader courseDetails={courseDetails} />

      <div className="flex flex-1 overflow-hidden">
        <BuilderContent
          courseDetails={courseDetails}
          courseModules={modules}
          lessonsMap={lessonsMap}
          onModuleSelect={(moduleId) => {
            fetchLessons(moduleId);
            setSelectedItem({ type: "module", selectedId: moduleId });
          }}
          onAddModule={() => setSelectedItem({ type: "new-module" })}
          onAddLesson={(moduleId) =>
            setSelectedItem({ type: "new-lesson", moduleId })
          }
        />
        <BuilderEditor
          selection={selectedItem}
          courseId={params.courseId}
          modules={modules}
          lessonsMap={lessonsMap}
          onAddModule={addModule}
          onEditModule={editModule}
          onDeleteModule={removeModule}
          onAddLesson={addLesson}
          onEditLesson={editLesson}
          onDeleteLesson={removeLesson}
          onSuccess={() => setSelectedItem({ type: null })}
        />
      </div>
    </div>
  );
}
