"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  PlayCircle,
  FileText,
  AlignLeft,
} from "lucide-react";
import { Module } from "@/types/module";
import { Lesson } from "@/types/lesson";
import { LessonMap } from "@/app/dashboard/student/courses/[courseId]/Client";

interface Props {
  modules: Module[];
  lessonsMap: LessonMap;
  selectedLesson: Lesson | null;
  completedLessons: string[];
  onSelectLesson: (lesson: Lesson) => void;
}

function LessonTypeIcon({ type }: { type: Lesson["type"] }) {
  if (type === "video")
    return <PlayCircle size={11} className="shrink-0 text-foreground-muted" />;
  if (type === "pdf")
    return <FileText size={11} className="shrink-0 text-foreground-muted" />;
  return <AlignLeft size={11} className="shrink-0 text-foreground-muted" />;
}

function ModuleItem({
  mod,
  lessons,
  selectedLesson,
  completedLessons,
  onSelectLesson,
}: {
  mod: Module;
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  completedLessons: string[];
  onSelectLesson: (lesson: Lesson) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const completedInModule = lessons.filter((l) =>
    completedLessons.includes(l.id),
  ).length;

  return (
    <article className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          {isExpanded ? (
            <ChevronDown size={13} className="text-foreground-muted shrink-0" />
          ) : (
            <ChevronRight
              size={13}
              className="text-foreground-muted shrink-0"
            />
          )}
          <span className="text-xs font-semibold text-foreground truncate">
            {mod.title}
          </span>
        </div>
        <span className="text-xs text-foreground-muted shrink-0 ml-2">
          {completedInModule}/{lessons.length} completed
        </span>
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-t border-border">
          {lessons.map((lesson) => {
            const isSelected = selectedLesson?.id === lesson.id;
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson)}
                className={`flex items-center gap-2.5 px-4 py-3 text-left transition-colors ${
                  isSelected ? "bg-primary/10" : "hover:bg-muted bg-background"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle
                    size={13}
                    className="text-emerald-500 shrink-0"
                  />
                ) : (
                  <Circle
                    size={13}
                    className="text-foreground-muted shrink-0"
                  />
                )}
                <LessonTypeIcon type={lesson.type} />
                <span
                  className={`text-xs truncate ${
                    isSelected
                      ? "font-semibold text-primary"
                      : "text-foreground"
                  }`}
                >
                  {lesson.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
}

export default function CourseOutline({
  modules,
  lessonsMap,
  selectedLesson,
  completedLessons,
  onSelectLesson,
}: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-12 flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
        Course Content
      </h2>
      <div className="flex flex-col gap-3">
        {modules.map((mod) => (
          <ModuleItem
            key={mod.id}
            mod={mod}
            lessons={lessonsMap[mod.id] ?? []}
            selectedLesson={selectedLesson}
            completedLessons={completedLessons}
            onSelectLesson={onSelectLesson}
          />
        ))}
      </div>
    </div>
  );
}
