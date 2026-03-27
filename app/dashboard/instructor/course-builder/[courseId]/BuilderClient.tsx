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
import {
  CreateCourseModulePayload,
  UpdateModulePayload,
} from "@/services/moduleService";
import {
  CreateLessonPayload,
  UpdateLessonPayload,
} from "@/services/lessonService";

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
  const [loading, setLoading] = useState(false);

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

  async function handleAddModule(
    courseId: string,
    data: CreateCourseModulePayload,
  ) {
    setLoading(true);
    try {
      await addModule(courseId, data);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditModule(moduleId: string, data: UpdateModulePayload) {
    setLoading(true);
    try {
      await editModule(moduleId, data);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveModule(moduleId: string) {
    setLoading(true);
    try {
      await removeModule(moduleId);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLesson(moduleId: string, data: CreateLessonPayload) {
    setLoading(true);
    try {
      const res = await addLesson(moduleId, data);
      if (!res) return;
      setLessonsMap((prev) => ({
        ...prev,
        [moduleId]: [...(prev[moduleId] ?? []), res.lesson],
      }));
    } finally {
      setLoading(false);
    }
  }

  async function handleEditLesson(lessonId: string, data: UpdateLessonPayload) {
    setLoading(true);
    try {
      await editLesson(lessonId, data);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveLesson(lessonId: string) {
    setLoading(true);
    try {
      await removeLesson(lessonId);
    } finally {
      setLoading(false);
    }
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

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
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
          loading={loading}
          onAddModule={handleAddModule}
          onEditModule={handleEditModule}
          onDeleteModule={handleRemoveModule}
          onAddLesson={handleAddLesson}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleRemoveLesson}
          onSuccess={() => setSelectedItem({ type: null })}
        />
      </div>
    </div>
  );
}
