"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function StudentFooter({
  instructorName,
  enrolled,
  onEnroll,
  loading,
  courseId,
}: {
  instructorName: string;
  enrolled: boolean;
  onEnroll: () => void;
  loading: boolean;
  courseId: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-foreground-muted">{instructorName}</span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            enrolled
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-muted text-foreground-muted"
          }`}
        >
          {enrolled ? "Enrolled" : "Not enrolled"}
        </span>
      </div>
      <button
        onClick={
          enrolled
            ? () => router.push(`/dashboard/student/courses/${courseId}`)
            : onEnroll
        }
        disabled={loading}
        className={`w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed ${
          enrolled
            ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {loading ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            Enrolling...
          </>
        ) : enrolled ? (
          "Continue Learning"
        ) : (
          "Enroll Now"
        )}
      </button>
    </div>
  );
}
