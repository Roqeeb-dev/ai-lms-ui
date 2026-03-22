"use client";
import { useState } from "react";
import { Lesson } from "@/types/lesson";
import { Module } from "@/types/module";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Layers,
  PlayCircle,
  FileText,
  AlignLeft,
} from "lucide-react";

function LessonTypeIcon({ type }: { type: Lesson["type"] }) {
  if (type === "video")
    return <PlayCircle size={11} className="text-foreground-muted shrink-0" />;
  if (type === "document")
    return <FileText size={11} className="text-foreground-muted shrink-0" />;
  return <AlignLeft size={11} className="text-foreground-muted shrink-0" />;
}

export function ModuleItem({
  mod,
  lessons,
  onSelect,
}: {
  mod: Module;
  lessons: Lesson[];
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
            <div className="flex flex-col gap-1 mb-1">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted text-left transition-colors"
                >
                  <LessonTypeIcon type={lesson.type} />
                  <span className="text-xs text-foreground truncate">
                    {lesson.title}
                  </span>
                  <span className="text-xs text-foreground-muted ml-auto shrink-0">
                    {lesson.order}
                  </span>
                </button>
              ))}
            </div>
          )}

          <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-md border border-dashed border-border text-foreground-muted hover:border-primary hover:text-primary transition-colors">
            <Plus size={12} />
            Add Lesson
          </button>
        </div>
      )}
    </article>
  );
}
