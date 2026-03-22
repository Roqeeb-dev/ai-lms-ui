"use client";

import { BookOpen } from "lucide-react";
import ModuleForm from "./ModuleForm";
import LessonForm from "./LessonForm";
import { SelectionType } from "@/app/dashboard/instructor/course-builder/[courseId]/BuilderClient";
import { Module } from "@/types/module";
import { Lesson } from "@/types/lesson";
import {
  CreateCourseModulePayload,
  UpdateModulePayload,
} from "@/services/moduleService";
import {
  CreateLessonPayload,
  UpdateLessonPayload,
} from "@/services/lessonService";

interface Props {
  selection: SelectionType;
  courseId: string;
  modules: Module[];
  lessonsMap: Record<string, Lesson[]>;
  // module handlers
  onAddModule: (
    courseId: string,
    data: CreateCourseModulePayload,
  ) => Promise<any>;
  onEditModule: (moduleId: string, data: UpdateModulePayload) => Promise<any>;
  onDeleteModule: (moduleId: string) => Promise<any>;
  // lesson handlers
  onAddLesson: (moduleId: string, data: CreateLessonPayload) => Promise<any>;
  onEditLesson: (lessonId: string, data: UpdateLessonPayload) => Promise<any>;
  onDeleteLesson: (lessonId: string) => Promise<any>;
  // loading states
  creatingModule?: boolean;
  updatingModule?: boolean;
  deletingModule?: boolean;
  creatingLesson?: boolean;
  updatingLesson?: boolean;
  deletingLesson?: boolean;
  // reset selection
  onSuccess?: () => void;
}

export default function BuilderEditor({
  selection,
  courseId,
  modules,
  lessonsMap,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  creatingModule,
  updatingModule,
  deletingModule,
  creatingLesson,
  updatingLesson,
  deletingLesson,
  onSuccess,
}: Props) {
  if (!selection.type) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center max-w-xs">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <BookOpen size={20} className="text-foreground-muted" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Select a module or lesson
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Choose something from the left panel to start editing, or add a new
            module to get started.
          </p>
        </div>
      </main>
    );
  }

  const selectedModule =
    selection.type === "module"
      ? modules.find((m) => m.id === selection.selectedId)
      : undefined;

  const selectedLesson =
    selection.type === "lesson"
      ? Object.values(lessonsMap)
          .flat()
          .find((l) => l.id === selection.selectedId)
      : undefined;

  return (
    <main className="flex-1 flex items-center justify-center bg-background p-8">
      {selection.type === "module" || selection.type === "new-module" ? (
        <ModuleForm
          courseId={courseId}
          module={selectedModule}
          onSubmit={
            selection.type === "new-module" ? onAddModule : onEditModule
          }
          onDelete={
            selectedModule ? () => onDeleteModule(selectedModule.id) : undefined
          }
          onSuccess={onSuccess}
          loading={
            selection.type === "new-module" ? creatingModule : updatingModule
          }
          deleting={deletingModule}
        />
      ) : (
        <LessonForm
          moduleId={
            selection.type === "new-lesson"
              ? selection.moduleId
              : selection.selectedId
          }
          lesson={selectedLesson}
          //   onSubmit={
          //     selection.type === "new-lesson" ? onAddLesson : onEditLesson
          //   }
          onDelete={
            selectedLesson ? () => onDeleteLesson(selectedLesson.id) : undefined
          }
          onSuccess={onSuccess}
          loading={
            selection.type === "new-lesson" ? creatingLesson : updatingLesson
          }
          deleting={deletingLesson}
        />
      )}
    </main>
  );
}
