"use client";

import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import { BookOpen, Users, LayoutGrid } from "lucide-react";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";

export default function AnalyticsClient() {
  const { courses } = useInstructorCourses();
  const drafts = courses.filter((c) => c.status === "draft").length ?? 0;
  const publishedCourses =
    courses.filter((c) => c.status === "published").length ?? 0;

  const stats = [
    {
      label: `Total Course${courses.length === 1 ? "" : "s"}`,
      value: courses.length ?? 0,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: `Total Students`,
      value: 0,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: `Draft${drafts === 1 ? "" : "s"}`,
      value: drafts,
      icon: LayoutGrid,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
    },
    {
      label: `Published Course${publishedCourses === 1 ? "" : "s"}`,
      value: publishedCourses,
      icon: LayoutGrid,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Analytics"
        text="Get a bird's eye view of your courses"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.bg} stat={stat} />
        ))}
      </div>

      {/* Courses breakdown */}
    </main>
  );
}
