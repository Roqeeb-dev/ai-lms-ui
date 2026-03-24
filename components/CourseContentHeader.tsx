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
    <div className="h-14 shrink-0 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </button>
        <span className="text-border">|</span>
        <span className="text-sm font-semibold text-foreground truncate max-w-xs">
          {courseTitle}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-foreground-muted">
          {completedCount}/{totalLessons} lessons
        </span>
        <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-primary">{progress}%</span>
      </div>
    </div>
  );
}
