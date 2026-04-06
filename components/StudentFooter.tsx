"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOptimistic } from "react";
import Link from "next/link";

export function StudentFooter({
  instructorName,
  enrolled,
  onEnroll,
  loading,
  courseId,
  instructorId,
}: {
  instructorName: string;
  enrolled: boolean;
  onEnroll: () => Promise<void>;
  loading: boolean;
  courseId: string;
  instructorId: string;
}) {
  const router = useRouter();

  const [optimisticEnrolled, setOptimisticEnrolled] = useOptimistic(
    enrolled,
    (current, value: boolean) => value,
  );

  const handleEnroll = async () => {
    setOptimisticEnrolled(true);

    try {
      await onEnroll();
    } catch (err) {
      // rollback handled automatically
    }
  };

  const isEnrolled = optimisticEnrolled;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <Link
          href={`/instructor/${instructorId}`}
          className="text-xs text-foreground-muted hover:text-primary"
        >
          {instructorName}
        </Link>

        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isEnrolled
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-muted text-foreground-muted"
          }`}
        >
          {isEnrolled ? "Enrolled" : "Not enrolled"}
        </span>
      </div>

      <button
        onClick={
          isEnrolled
            ? () => router.push(`/dashboard/student/courses/${courseId}`)
            : handleEnroll
        }
        disabled={loading}
        className={`w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 active:brightness-95 active:shadow-sm disabled:opacity-70 disabled:cursor-not-allowed ${
          isEnrolled
            ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {isEnrolled ? (
          "Continue Learning"
        ) : loading ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            Enrolling...
          </>
        ) : (
          "Enroll Now"
        )}
      </button>
    </div>
  );
}
