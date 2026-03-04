import { Sparkles } from "lucide-react";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course & { progress?: number; reason?: string };
  enrolled?: boolean;
}

export default function CourseCard({
  course,
  enrolled = false,
}: CourseCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200 group cursor-pointer">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">
          {course.level}
        </span>
        {course.reason && (
          <div className="flex items-center gap-1 bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
            <Sparkles size={10} className="text-amber-600" />
            <span className="text-xs text-amber-600 font-medium">AI pick</span>
          </div>
        )}
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
          {course.description}
        </p>
      </div>

      {/* AI pick reason */}
      {course.reason && (
        <p className="text-xs text-amber-600 bg-accent/10 rounded-lg px-3 py-1.5">
          {course.reason}
        </p>
      )}

      {/* Progress — enrolled only */}
      {enrolled && course.progress !== undefined && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-muted">Progress</span>
            <span className="text-xs font-bold text-primary">
              {course.progress}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border-subtle">
        <span className="text-xs text-foreground-muted">
          {course.moduleIds.length} module
          {course.moduleIds.length !== 1 ? "s" : ""}
        </span>
        <button
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
            enrolled
              ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
              : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {enrolled ? "Continue" : "Enroll"}
        </button>
      </div>
    </div>
  );
}
