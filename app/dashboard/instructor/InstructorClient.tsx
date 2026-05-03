"use client";

import { BookOpen, Users, LayoutGrid, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Course } from "@/types/course";
import {
  CourseAnalytics,
  getCourseAnalytics,
} from "@/services/analyticsService";
import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import CourseCard from "@/components/CourseCard";
import CourseModal, { CourseFormData } from "@/components/CreateCourseModal";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { useRouter } from "next/navigation";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";

export type ModalState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "update"; course: Course };

export default function InstructorClient({
  initialCourses,
  initialAnalyticsMap,
}: {
  initialCourses: Course[];
  initialAnalyticsMap: Map<string, CourseAnalytics>;
}) {
  const router = useRouter();

  // ✅ hydrate courses from SSR
  const { courses, fetching, createCourse, updateCourse } =
    useInstructorCourses(initialCourses);

  // ✅ hydrate analytics from SSR
  const [analyticsMap, setAnalyticsMap] =
    useState<Map<string, CourseAnalytics>>(initialAnalyticsMap);

  const [modalState, setModalState] = useState<ModalState>({ open: false });

  // ✅ only fetch analytics if not already provided
  useEffect(() => {
    if (analyticsMap.size > 0) return;
    if (courses.length === 0) return;

    const fetchAll = async () => {
      const results = await Promise.allSettled(
        courses.map((c) => getCourseAnalytics(c.id)),
      );

      const map = new Map<string, CourseAnalytics>();

      results.forEach((result, idx) => {
        if (result.status === "fulfilled") {
          map.set(courses[idx].id, result.value);
        }
      });

      setAnalyticsMap(map);
    };

    fetchAll();
  }, [courses, analyticsMap]);

  // 📊 computed stats
  const totalCourses = courses.length;

  const totalStudents = Array.from(analyticsMap.values()).reduce(
    (sum, a) => sum + a.totalStudents,
    0,
  );

  const publishedCount = courses.filter((c) => c.status === "published").length;

  const draftCount = courses.filter((c) => c.status === "draft").length;

  const stats = [
    {
      label: `Total Course${totalCourses === 1 ? "" : "s"}`,
      value: totalCourses,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: `Total Student${totalStudents === 1 ? "" : "s"}`,
      value: totalStudents,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: LayoutGrid,
      color: "text-sky-600",
      bg: "bg-sky-500/10",
    },
    {
      label: `Draft${draftCount === 1 ? "" : "s"}`,
      value: draftCount,
      icon: LayoutGrid,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
  ];

  // 🧠 actions
  async function handleCreate(data: CourseFormData) {
    const res = await createCourse(data);
    if (!res) return;
    router.push(`/dashboard/instructor/course-builder/${res.course.id}`);
  }

  async function handleUpdate(data: CourseFormData) {
    if (modalState.open && modalState.mode === "update") {
      await updateCourse(modalState.course.id, data);
    }
  }

  async function toggleCourse(courseId: string) {
    const courseToToggle = courses.find((c) => c.id === courseId);
    if (!courseToToggle) return;

    await updateCourse(courseId, {
      status: courseToToggle.status === "published" ? "draft" : "published",
    });
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Instructor Dashboard"
        text="Manage your courses and track student engagement."
        onClick={() => setModalState({ open: true, mode: "create" })}
      />

      {/* 📊 Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* 📚 Courses */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
            My Courses
          </h2>

          <Link
            href="/dashboard/instructor/courses"
            className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline underline-offset-4"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {fetching ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 px-6 text-center">
            <span className="text-4xl opacity-30">📭</span>
            <p className="text-sm font-semibold text-foreground">
              No courses yet
            </p>
            <p className="text-xs text-foreground-muted">
              Get started by creating your first course.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                variant="instructor"
                onToggle={() => toggleCourse(course.id)}
                totalStudents={analyticsMap.get(course.id)?.totalStudents ?? 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🧩 Modal */}
      <CourseModal
        open={modalState.open}
        onClose={() => setModalState({ open: false })}
        mode={modalState.open ? modalState.mode : "create"}
        defaultValues={
          modalState.open && modalState.mode === "update"
            ? modalState.course
            : undefined
        }
        onSubmit={
          modalState.open && modalState.mode === "update"
            ? handleUpdate
            : handleCreate
        }
      />
    </div>
  );
}
