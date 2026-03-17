"use client";

import { BookOpen, Users, LayoutGrid, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import type { Course } from "@/types/course";
import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import CourseCard from "@/components/CourseCard";
import CourseModal, { CourseFormData } from "@/components/CreateCourseModal";
import { mockCourses } from "@/lib/mockCourses";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";

export type InstructorCourse = Course & { totalStudents?: number };

type ModalState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "update"; course: Course };

const totalCourses = mockCourses.length;
const totalStudents = mockCourses.reduce(
  (acc, c) => acc + (c.totalStudents ?? 0),
  0,
);
const publishedCount = mockCourses.filter(
  (c) => c.status === "published",
).length;
const draftCount = mockCourses.filter((c) => c.status === "draft").length;

const stats = [
  {
    label: "Total Courses",
    value: totalCourses,
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Total Students",
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
    label: "Drafts",
    value: draftCount,
    icon: LayoutGrid,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

export default function InstructorClient() {
  const [modalState, setModalState] = useState<ModalState>({ open: false });
  const { createCourse, updateCourse } = useInstructorCourses();

  async function handleCreate(data: CourseFormData) {
    await createCourse(data);
  }

  async function handleUpdate(data: CourseFormData) {
    if (modalState.open && modalState.mode === "update") {
      await updateCourse(modalState.course.id, data);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader
        title="Instructor Dashboard"
        text="Manage your courses and track student engagement."
        onClick={() => setModalState({ open: true, mode: "create" })}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* My Courses */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="instructor"
              onEdit={() =>
                setModalState({ open: true, mode: "update", course })
              }
            />
          ))}
        </div>
      </div>

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
