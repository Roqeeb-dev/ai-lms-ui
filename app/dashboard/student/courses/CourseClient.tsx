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
    teacherId: "t1",
    level: "beginner",
    moduleIds: ["m1", "m2", "m3"],
    createdAt: new Date(),
    progress: 72,
  },
  {
    id: "2",
    title: "Business Communication",
    description: "Master professional communication skills.",
    teacherId: "t2",
    level: "beginner",
    moduleIds: ["m4", "m5"],
    createdAt: new Date(),
    progress: 45,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Core principles of user interface and experience design.",
    teacherId: "t3",
    level: "intermediate",
    moduleIds: ["m6", "m7", "m8"],
    createdAt: new Date(),
    progress: 30,
  },
];

const recommendedCourses: RecommendedCourse[] = [
  {
    id: "4",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA.",
    teacherId: "t4",
    level: "intermediate",
    moduleIds: ["m9", "m10"],
    createdAt: new Date(),
    reason: "Matches your Python path",
  },
  {
    id: "5",
    title: "Product Management 101",
    description: "Learn how to build and ship great products.",
    teacherId: "t5",
    level: "beginner",
    moduleIds: ["m11"],
    createdAt: new Date(),
    reason: "Popular in your focus area",
  },
  {
    id: "6",
    title: "Figma for Beginners",
    description: "Design interfaces with Figma from the ground up.",
    teacherId: "t3",
    level: "beginner",
    moduleIds: ["m12", "m13"],
    createdAt: new Date(),
    reason: "Next step from UI/UX basics",
  },
];

const browseCourses: Course[] = [
  {
    id: "7",
    title: "Machine Learning Basics",
    description: "An intro to ML concepts and tools.",
    teacherId: "t6",
    level: "intermediate",
    moduleIds: ["m14"],
    createdAt: new Date(),
  },
  {
    id: "8",
    title: "Financial Literacy",
    description: "Understand money, investing, and financial planning.",
    teacherId: "t7",
    level: "beginner",
    moduleIds: ["m15"],
    createdAt: new Date(),
  },
  {
    id: "9",
    title: "Motion Design",
    description: "Create compelling animations and motion graphics.",
    teacherId: "t3",
    level: "intermediate",
    moduleIds: ["m16"],
    createdAt: new Date(),
  },
  {
    id: "10",
    title: "Spanish for Beginners",
    description: "Start speaking Spanish with confidence.",
    teacherId: "t8",
    level: "beginner",
    moduleIds: ["m17", "m18"],
    createdAt: new Date(),
  },
  {
    id: "11",
    title: "Biology Fundamentals",
    description: "Core concepts in biology for beginners.",
    teacherId: "t9",
    level: "beginner",
    moduleIds: ["m19"],
    createdAt: new Date(),
  },
  {
    id: "12",
    title: "React & Next.js",
    description: "Build modern web apps with React and Next.js.",
    teacherId: "t1",
    level: "advanced",
    moduleIds: ["m20", "m21", "m22"],
    createdAt: new Date(),
  },
];

export default function CourseClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBrowse =
    activeCategory === "All"
      ? browseCourses
      : browseCourses.filter((c) => c.level === activeCategory.toLowerCase());

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          My Courses
        </h1>
        <p className="text-sm text-foreground-muted">
          Track your progress and discover what to learn next.
        </p>
      </div>

      {/* Enrolled */}
      <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Browse All
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
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
