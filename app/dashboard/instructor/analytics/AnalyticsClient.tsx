"use client";

import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import DonutChart from "@/components/DonutChart";
import StudentBarChart from "@/components/StudentBarChart";
import {
  BookOpen,
  Users,
  LayoutGrid,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { Course } from "@/types/course";
import {
  getCourseAnalytics,
  CourseAnalytics,
} from "@/services/analyticsService";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingPage";

interface AnalyticsClientProps {
  initialCourses: Course[];
  initialAnalyticsMap: Map<string, CourseAnalytics>;
}

export default function AnalyticsClient({
  initialCourses,
  initialAnalyticsMap,
}: AnalyticsClientProps) {
  const { courses, fetching } = useInstructorCourses(initialCourses);
  const [analyticsMap, setAnalyticsMap] = useState<
    Map<string, CourseAnalytics>
  >(() => new Map(initialAnalyticsMap));
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const drafts = courses.filter((c) => c.status === "draft").length;
  const publishedCourses = courses.filter(
    (c) => c.status === "published",
  ).length;

  useEffect(() => {
    if (courses.length === 0) return;
    if (analyticsMap.size === courses.length) return;

    const fetchAll = async () => {
      setAnalyticsLoading(true);
      try {
        const results = await Promise.allSettled(
          courses.map((c) => getCourseAnalytics(c.id)),
        );
        const map = new Map<string, CourseAnalytics>(analyticsMap);
        results.forEach((result, idx) => {
          if (result.status === "fulfilled") {
            map.set(courses[idx].id, result.value);
          }
        });
        setAnalyticsMap(map);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAll();
  }, [courses, analyticsMap]);

  const totalStudents = Array.from(analyticsMap.values()).reduce(
    (sum, a) => sum + a.totalStudents,
    0,
  );

  const avgCompletionRate =
    analyticsMap.size > 0
      ? Math.round(
          Array.from(analyticsMap.values()).reduce(
            (sum, a) => sum + a.avgProgress,
            0,
          ) / analyticsMap.size,
        )
      : null;

  const stats = [
    {
      label: `Total Course${courses.length === 1 ? "" : "s"}`,
      value: courses.length,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Students",
      value: analyticsLoading ? "—" : totalStudents,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: `Draft${drafts === 1 ? "" : "s"}`,
      value: drafts,
      icon: Clock,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
    },
    {
      label: `Published`,
      value: publishedCourses,
      icon: CheckCircle,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Analytics"
        text="Get a bird's eye view of your courses."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Course breakdown */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
            Course Breakdown
          </h2>
          <Link
            href="/dashboard/instructor/courses"
            className="text-xs text-primary font-semibold hover:underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        {fetching ? (
          <LoadingScreen />
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-12 px-6 text-center">
            <span className="text-3xl opacity-30">📊</span>
            <p className="text-sm font-semibold text-foreground">
              No courses yet
            </p>
            <p className="text-xs text-foreground-muted">
              Create your first course to start seeing analytics here.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-border bg-muted/50">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
                Course
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted hidden sm:block">
                Students
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
                Status
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted hidden sm:block">
                Created
              </span>
            </div>

            {/* Table rows */}
            <div className="flex flex-col divide-y divide-border">
              {courses.map((course) => {
                const analytics = analyticsMap.get(course.id);
                const studentCount = analyticsLoading
                  ? "—"
                  : (analytics?.totalStudents ?? "—");

                return (
                  <div
                    key={course.id}
                    className="grid grid-cols-[2fr_1fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors"
                  >
                    {/* Course */}
                    <div className="flex items-center gap-3 min-w-0">
                      {course.thumbnail?.url ? (
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={course.thumbnail.url}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <BookOpen
                            size={14}
                            className="text-foreground-muted"
                          />
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-foreground truncate">
                          {course.title}
                        </span>
                        <span className="text-xs text-foreground-muted truncate hidden sm:block">
                          {course.description}
                        </span>
                      </div>
                    </div>

                    {/* Students */}
                    <div className="hidden sm:flex items-center gap-1.5 text-sm text-foreground-muted">
                      <Users size={12} />
                      <span>{studentCount}</span>
                    </div>

                    {/* Status */}
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border w-fit ${
                        course.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-muted text-foreground-muted border-border"
                      }`}
                    >
                      {course.status === "published" ? "Published" : "Draft"}
                    </span>

                    {/* Created */}
                    <span className="text-xs text-foreground-muted hidden sm:block">
                      {new Date(course.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Charts + Summary */}
      {courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Donut — Publishing Ratio */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Publishing Ratio
              </h2>
            </div>
            <DonutChart published={publishedCourses} drafts={drafts} />
            <div className="flex items-center justify-center gap-5 pt-1 border-t border-border">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-foreground-muted">
                  {publishedCourses} published
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-xs text-foreground-muted">
                  {drafts} draft{drafts !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Bar — Students per course */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Students per Course
              </h2>
            </div>
            <StudentBarChart
              courses={courses}
              analyticsMap={analyticsMap}
              analyticsLoading={analyticsLoading}
            />
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <LayoutGrid size={15} className="text-primary" />
              <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
                Summary
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {[
                { label: "Total courses", value: courses.length },
                { label: "Published", value: publishedCourses },
                { label: "Drafts", value: drafts },
                {
                  label: "Total students",
                  value: analyticsLoading ? "—" : totalStudents,
                },
                {
                  label: "Avg. completion rate",
                  value: analyticsLoading
                    ? "—"
                    : avgCompletionRate !== null
                      ? `${avgCompletionRate}%`
                      : "—",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-xs text-foreground-muted">{label}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
