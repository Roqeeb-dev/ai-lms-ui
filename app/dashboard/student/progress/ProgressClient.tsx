"use client";

import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import { BookOpen, Users, LayoutGrid } from "lucide-react";

export default function ProgressClient() {
  const stats = [
    {
      label: `Total Courses Enrolled`,
      value: 0,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: `Courses Completed`,
      value: 0,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Average Progress",
      value: 0,
      icon: LayoutGrid,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
    },
    {
      label: `Total Hours learned`,
      value: 0,
      icon: LayoutGrid,
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}
