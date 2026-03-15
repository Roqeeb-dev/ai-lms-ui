"use client";

import { useState } from "react";
import { BookOpen, Sparkles, BarChart2 } from "lucide-react";
import { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";

type EnrolledCourse = Course & { progress?: number };
type RecommendedCourse = Course & { reason?: string };

const categories = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Science",
  "Languages",
];

const enrolledCourses: EnrolledCourse[] = [
  {
    id: "1",
    title: "Introduction to Python",
    description: "Learn Python from scratch with hands-on projects.",
    instructor: "t1",
    status: "published",
    level: "beginner",
    moduleIds: ["m1", "m2", "m3"],
    createdAt: new Date(),
    updatedAt: new Date(),
    progress: 72,
  },
  {
    id: "2",
    title: "Business Communication",
    description: "Master professional communication skills.",
    instructor: "t2",
    status: "published",
    level: "beginner",
    moduleIds: ["m4", "m5"],
    createdAt: new Date(),
    updatedAt: new Date(),
    progress: 45,
  },
];

const recommendedCourses: RecommendedCourse[] = [
  {
    id: "4",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA.",
    instructor: "t4",
    status: "published",
    level: "intermediate",
    moduleIds: ["m9", "m10"],
    createdAt: new Date(),
    updatedAt: new Date(),
    reason: "Matches your Python path",
  },
  {
    id: "5",
    title: "Product Management 101",
    description: "Learn how to build and ship great products.",
    instructor: "t5",
    status: "published",
    level: "beginner",
    moduleIds: ["m11"],
    createdAt: new Date(),
    updatedAt: new Date(),
    reason: "Popular in your focus area",
  },
];

const browseCourses: Course[] = [
  {
    id: "7",
    title: "Machine Learning Basics",
    description: "An intro to ML concepts and tools.",
    instructor: "t6",
    status: "published",
    level: "intermediate",
    moduleIds: ["m14"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Financial Literacy",
    description: "Understand money, investing, and financial planning.",
    instructor: "t7",
    status: "published",
    level: "beginner",
    moduleIds: ["m15"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function CourseClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBrowse =
    activeCategory === "All"
      ? browseCourses
      : browseCourses.filter((c) => c.level === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          My Courses
        </h1>
        <p className="text-sm text-foreground-muted">
          Track your progress and discover what to learn next.
        </p>
      </div>

      {/* Enrolled */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-primary" />
            <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
              Enrolled
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
            <BarChart2 size={13} />
            <span>{enrolledCourses.length} courses</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledCourses.map((c) => (
            <CourseCard key={c.id} course={c} enrolled />
          ))}
        </div>
      </div>

      {/* AI Recommended */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-amber-600" />
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
            Recommended for You
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>

      {/* Browse */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Browse All
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground-muted border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBrowse.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
