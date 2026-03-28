"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { CourseStatSection } from "@/components/CourseStatSection";
import { QuizStatSection } from "@/components/QuizStatSection";
import { StatCardSection } from "@/components/StatCardSection";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

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
