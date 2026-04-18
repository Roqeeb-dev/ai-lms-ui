"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { CourseStatSection } from "@/components/CourseStatSection";
import { QuizStatSection } from "@/components/QuizStatSection";
import { StatCardSection } from "@/components/StatCardSection";
import EnrollmentStatusChart from "@/components/EnrollmentStatusChart";
import CourseProgressChart from "@/components/CourseProgressChart";
import QuizScoreChart from "@/components/QuizScoreChart";
import { useAnalytics } from "@/hooks/useAnalytics";
import { BookOpen, TrendingUp, ClipboardList } from "lucide-react";
import { useEffect } from "react";

function ChartCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-primary" />
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[280px] rounded-2xl bg-muted animate-pulse" />
      ))}
    </div>
  );
}

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

      {/* Charts */}
      {loading ? (
        <ChartSkeleton />
      ) : (
        data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ChartCard title="Enrollment Status" icon={BookOpen}>
              <EnrollmentStatusChart enrollments={data.enrollments} />
            </ChartCard>

            <ChartCard title="Course Progress" icon={TrendingUp}>
              <CourseProgressChart enrollments={data.enrollments} />
            </ChartCard>

            <ChartCard title="Quiz Best Scores" icon={ClipboardList}>
              <QuizScoreChart bestScores={data.bestScores} />
            </ChartCard>
          </div>
        )
      )}

      {/* Detailed breakdown */}
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
