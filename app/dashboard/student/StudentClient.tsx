"use client";

import { useUserStore } from "@/store/useUserStore";
import { BookOpen, Sparkles, BarChart2, Clock } from "lucide-react";
import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";

const statCards = [
  {
    label: "Courses Enrolled",
    value: 4,
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "AI Tutor Sessions",
    value: 12,
    icon: Sparkles,
    color: "text-amber-600",
    bg: "bg-accent/10",
  },
  {
    label: "Avg. Progress",
    value: 68,
    icon: BarChart2,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    label: "Hours Learned",
    value: 24,
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const recentCourses = [
  { title: "Introduction to Python", progress: 72, category: "Technology" },
  { title: "Business Communication", progress: 45, category: "Business" },
  { title: "UI/UX Design Fundamentals", progress: 30, category: "Design" },
];

export default function StudentClient() {
  const user = useUserStore((state) => state.user);

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-foreground-muted">No user session found.</p>
      </div>
    );

  const firstName = user.name.split(" ")[0] ?? "User";

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader
        title={`Welcome back,${firstName}`}
        text="Here's what's happening with your learning today."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Continue learning + AI tutor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Continue learning */}
        <div className="lg:col-span-2 flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
              Continue Learning
            </h2>
            <a
              href="/dashboard/student/courses"
              className="text-xs text-primary hover:underline underline-offset-4"
            >
              View all
            </a>
          </div>
          <div className="flex flex-col gap-4">
            {recentCourses.map((course) => (
              <div key={course.title} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">
                      {course.title}
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {course.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {course.progress}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutor CTA */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary p-6 shadow-sm overflow-hidden">
          {/* Background texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-accent opacity-20 blur-2xl" />

          <div className="relative flex flex-col gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <Sparkles size={17} className="text-white" />
            </div>
            <h2 className="text-base font-bold text-white mt-2">AI Tutor</h2>
            <p className="text-xs text-white/70 leading-relaxed">
              Stuck on something? Ask your AI tutor anything and get instant,
              clear explanations.
            </p>
          </div>

          <a
            href="/dashboard/student/ai-tutor"
            className="relative mt-6 inline-flex items-center justify-center rounded-lg bg-white text-primary px-3 py-2 text-sm font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
          >
            Ask a question →
          </a>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Browse new courses", href: "/dashboard/student/courses" },
            {
              label: "Resume last session",
              href: "/dashboard/student/courses",
            },
            { label: "Talk to AI Tutor", href: "/dashboard/student/ai-tutor" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all duration-200"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
