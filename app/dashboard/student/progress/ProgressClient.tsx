"use client";

import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import { BookOpen, Users, LayoutGrid, Clock } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

export default function ProgressClient() {
  const { studentAnalytics, fetchStudentAnalytics } = useAnalytics();
  const { data, loading, error } = studentAnalytics;

  useEffect(() => {
    fetchStudentAnalytics();
  }, [fetchStudentAnalytics]);

  // ── Derived values ──────────────────────────────────────────────────────────
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}
