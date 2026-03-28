"use client";

import { StudentAnalytics } from "@/services/analyticsService";
import { BookOpen, Users, LayoutGrid, Clock } from "lucide-react";
import StatCard from "./StatCard";

export function StatCardSection({
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
