"use client";

import { Course } from "@/types/course";
import { Module } from "@/types/module";
import {
  Layers,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useState } from "react";

interface Props {
  courseDetails: Course;
  courseModules: Module[];
}

function ModuleItem({ mod }: { mod: Module }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="rounded-lg border border-border bg-background overflow-hidden">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
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
          <p className="text-xs text-foreground-muted leading-relaxed">
            {mod.description}
          </p>
          {/* Lessons will go here */}
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted py-2 justify-center">
            <Layers size={12} />
            <span>No lessons yet</span>
          </div>
          <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-md border border-dashed border-border text-foreground-muted hover:border-primary hover:text-primary transition-colors">
            <Plus size={12} />
            Add Lesson
          </button>
        </div>
      )}
    </article>
  );
}

export default function BuilderContent({
  courseDetails,
  courseModules,
}: Props) {
  return (
    <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-1">
          Course Content
        </h2>
        <p className="text-xs text-foreground-muted line-clamp-2">
          {courseDetails.description}
        </p>
      </div>

      {/* Module list or empty state */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {courseModules.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 text-xs text-foreground-muted h-full">
            <Layers size={20} className="opacity-40" />
            <span>No modules yet</span>
            <p className="text-center text-xs opacity-60 leading-relaxed">
              Add your first module to start building your course
            </p>
          </div>
        ) : (
          courseModules.map((mod) => <ModuleItem key={mod.id} mod={mod} />)
        )}
      </div>

      {/* Add module button */}
      <div className="p-3 border-t border-border shrink-0">
        <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <BookOpen size={13} />
          Add Module
        </button>
      </div>
    </aside>
  );
}
