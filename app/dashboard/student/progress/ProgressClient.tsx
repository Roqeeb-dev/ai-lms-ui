"use client";

import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import {
  BookOpen,
  Users,
  LayoutGrid,
  Clock,
  Trophy,
  ClipboardList,
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";
import { format } from "date-fns";
import {
  AnalyticsEnrollment,
  StudentAnalytics,
} from "@/services/analyticsService";
import { QuizAttempt } from "@/services/quizService";

// ─── Sub-components ───────────────────────────────────────────────────────────

function CourseStatSection({
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

function QuizStatSection({
  attempts,
  bestScores,
}: {
  attempts: QuizAttempt[];
  bestScores: number[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-foreground">
        Quiz Performance
      </h2>

      {attempts.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You haven't attempted any quizzes yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {attempts.map((attempt, index) => (
          <div
            key={attempt.id ?? index}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ClipboardList size={15} className="text-primary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                Quiz Attempt #{index + 1}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(attempt.startedAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        ))}

        {bestScores.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-amber-500" />
              <span className="text-sm font-semibold text-foreground">
                Best Scores
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {bestScores.map((score, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600"
                >
                  {score}%
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StatCardSection({
  loading,
  data,
}: {
  loading: boolean;
  data: StudentAnalytics | null;
}) {
  const totalCoursesEnrolled = data?.enrollments.length ?? 0;
  const coursesCompleted =
    data?.enrollments.filter((e) => e.progress === 100).length ?? 0;
  const avgProgress = data
    ? Math.round(
        data.enrollments.reduce((sum, e) => sum + e.progress, 0) /
          (data.enrollments.length || 1),
      )
    : 0;

  const stats = [
    {
      label: "Total Courses Enrolled",
      value: loading ? "..." : totalCoursesEnrolled,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Courses Completed",
      value: loading ? "..." : coursesCompleted,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Average Progress",
      value: loading ? "..." : `${avgProgress}%`,
      icon: LayoutGrid,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
    },
    {
      label: "Total Hours Learned",
      value: "N/A",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressClient() {
  const { studentAnalytics, fetchStudentAnalytics } = useAnalytics();
  const { data, loading, error } = studentAnalytics;

  useEffect(() => {
    fetchStudentAnalytics();
  }, [fetchStudentAnalytics]);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Progress"
        text="View your progress across the app"
      />

      {error && (
        <p className="text-sm text-destructive">
          Failed to load analytics: {error}
        </p>
      )}

      <StatCardSection loading={loading} data={data} />

      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              {[...Array(3)].map((_, j) => (
                <div
                  key={j}
                  className="h-20 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {!loading && data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CourseStatSection enrollments={data.enrollments} />
          <QuizStatSection
            attempts={data.attempts}
            bestScores={data.bestScores}
          />
        </div>
      )}
    </div>
  );
}
