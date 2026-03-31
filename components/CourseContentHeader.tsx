"use client";

import { ArrowLeft } from "lucide-react";

interface Props {
  courseTitle: string;
  completedCount: number;
  totalLessons: number;
  onBack: () => void;
}

export default function CourseContentHeader({
  courseTitle,
  completedCount,
  totalLessons,
  onBack,
}: Props) {
  const progress =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="shrink-0 border-b border-border bg-card px-4 md:px-6 py-3 md:py-0 md:h-14 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">Back</span>
        </button>
        <span className="text-border hidden sm:inline">|</span>
        <span className="text-sm font-semibold text-foreground truncate">
          {courseTitle}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-foreground-muted shrink-0">
          {completedCount}/{totalLessons} lessons
        </span>
        <div className="flex-1 md:w-32 md:flex-none h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-primary shrink-0">
          {progress}%
        </span>
      </div>
    </div>
  );
}
