"use client";

import { AnalyticsEnrollment } from "@/services/analyticsService";
import { format } from "date-fns";

export function CourseStatSection({
  enrollments,
}: {
  enrollments: AnalyticsEnrollment[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-foreground">
        Enrolled Courses
      </h2>

      {enrollments.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You haven't enrolled in any courses yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">
                  {enrollment.courseTitle}
                </span>
                {enrollment.createdAt && (
                  <span className="text-xs text-muted-foreground">
                    Enrolled{" "}
                    {format(new Date(enrollment.createdAt), "MMM d, yyyy")}
                  </span>
                )}
              </div>
              <span
                className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                  enrollment.progress === 100
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {enrollment.progress === 100 ? "Completed" : "In Progress"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    enrollment.progress === 100
                      ? "bg-emerald-500"
                      : "bg-primary"
                  }`}
                  style={{ width: `${enrollment.progress ?? 0}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground shrink-0">
                {enrollment.progress ?? 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
