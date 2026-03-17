"use client";

import { BookOpen, Users, LayoutGrid, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/types/course";
import StatCard from "@/components/StatCard";
import DashboardHeader from "@/components/DashboardHeader";
import CourseCard from "@/components/CourseCard";

type InstructorCourse = Course & { totalStudents?: number };

const mockCourses: InstructorCourse[] = [
  {
    id: "1",
    title: "Introduction to Python",
    description: "Learn Python from scratch with hands-on projects.",
    instructor: { _id: "t1", name: "Ada Lovelace", email: "ada@cognify.com" },
    thumbnail: { url: "", public_id: "" },
    status: "published",
    category: "Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
    totalStudents: 84,
  },
  {
    id: "2",
    title: "Business Communication",
    description: "Master professional communication skills.",
    instructor: { _id: "t1", name: "Ada Lovelace", email: "ada@cognify.com" },
    thumbnail: { url: "", public_id: "" },
    status: "published",
    category: "Business",
    createdAt: new Date(),
    updatedAt: new Date(),
    totalStudents: 52,
  },
  {
    id: "3",
    title: "Advanced Design Systems",
    description: "Build scalable design systems from the ground up.",
    instructor: { _id: "t1", name: "Ada Lovelace", email: "ada@cognify.com" },
    thumbnail: { url: "", public_id: "" },
    status: "draft",
    category: "Design",
    createdAt: new Date(),
    updatedAt: new Date(),
    totalStudents: 0,
  },
];

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
  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader
        title="Instructor Dashboard"
        text="Manage your courses and track student engagement."
        href="/dashboard/instructor/courses/create"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard stat={stat} />
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
            <CourseCard key={course.id} course={course} variant="instructor" />
          ))}
        </div>
      </div>
    </div>
  );
}
