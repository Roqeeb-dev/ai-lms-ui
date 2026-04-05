"use client";
import { useState } from "react";
import { Lesson } from "@/types/lesson";
import { Module } from "@/types/module";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Layers,
  PlayCircle,
  FileText,
  AlignLeft,
  Sparkles,
} from "lucide-react";

function LessonTypeIcon({ type }: { type: Lesson["type"] }) {
  if (type === "video")
    return <PlayCircle size={11} className="text-foreground-muted shrink-0" />;
  if (type === "pdf")
    return <FileText size={11} className="text-foreground-muted shrink-0" />;
  if (type === "quiz")
    return <Sparkles size={11} className="text-amber-500 shrink-0" />;
  return <AlignLeft size={11} className="text-foreground-muted shrink-0" />;
}

function LessonItem({ lesson }: { lesson: Lesson }) {
  const router = useRouter();

  return (
    <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted text-left transition-colors group">
      <LessonTypeIcon type={lesson.type} />
      <span className="text-xs text-foreground truncate flex-1">
        {lesson.title}
      </span>
      <div className="flex items-center gap-1.5 ml-auto shrink-0">
        {lesson.type !== "quiz" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/dashboard/instructor/lessons/${lesson.id}/quiz/create`,
              );
            }}
            title="Create quiz for this lesson"
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-amber-600 bg-amber-500/10 hover:bg-amber-500/20 transition-all duration-150"
          >
            <Sparkles size={10} />
            <span className="hidden sm:inline text-[10px] font-medium">
              Quiz
            </span>
          </button>
        )}
        <span className="text-xs text-foreground-muted">{lesson.order}</span>
      </div>
    </div>
  );
}

export function ModuleItem({
  mod,
  lessons,
  onSelect,
  onAddLesson,
}: {
  mod: Module;
  lessons: Lesson[];
  onAddLesson: (moduleId: string) => void;
  onSelect: (moduleId: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleModuleClick() {
    const expanding = !isExpanded;
    setIsExpanded(expanding);
    if (expanding) onSelect(mod.id);
  }

  return (
    <article className="rounded-lg border border-border bg-background overflow-hidden">
      <button
        onClick={handleModuleClick}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-muted transition-colors"
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
          {mod.order}
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-border px-3 py-2 flex flex-col gap-1">
          <p className="text-xs text-foreground-muted leading-relaxed mb-1">
            {mod.description}
          </p>

          {lessons.length === 0 ? (
            <div className="flex items-center gap-1.5 text-xs text-foreground-muted py-2 justify-center">
              <Layers size={12} />
              <span>No lessons yet</span>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5 mb-1">
              {lessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}

          <button
            onClick={() => onAddLesson(mod.id)}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-md border border-dashed border-border text-foreground-muted hover:border-primary hover:text-primary transition-colors"
          >
            <Plus size={12} />
            Add Lesson
          </button>
        </div>
      )}
    </article>
  );
}
