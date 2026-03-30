"use client";

import { useState, useEffect, useMemo } from "react";
import { BookOpen, Sparkles, BarChart2 } from "lucide-react";
import { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import { useEnrollment } from "@/hooks/useEnrollment";
import { useCourse } from "@/hooks/useCourse";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";

type RecommendedCourse = Course & { reason?: string };

const categories = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Science",
  "Languages",
];

const recommendedCourses: RecommendedCourse[] = [
  {
    id: "mock-1",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA.",
    instructor: { _id: "t4", name: "Grace Hopper", email: "grace@cognify.com" },
    thumbnail: { url: "", public_id: "" },
    status: "published",
    category: "Technology",
    createdAt: new Date(),
    updatedAt: new Date(),
    reason: "Matches your learning path",
  },
  {
    id: "mock-2",
    title: "Product Management 101",
    description: "Learn how to build and ship great products.",
    instructor: { _id: "t5", name: "Alan Turing", email: "alan@cognify.com" },
    thumbnail: { url: "", public_id: "" },
    status: "published",
    category: "Business",
    createdAt: new Date(),
    updatedAt: new Date(),
    reason: "Popular in your focus area",
  },
];

export default function CourseClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { enrollments, fetching: fetchingEnrollments } = useEnrollment({
    publishedOnly: true,
  });
  const { allCourses, fetchingAllCourses, getAllCourses } = useCourse();

  useEffect(() => {
    getAllCourses();
  }, []);

  const enrolledCourseIds = new Set(enrollments.map((e) => e.course.id));

  const filteredBrowse = useMemo(() => {
    return allCourses.filter((c) => {
      const matchesCategory =
        activeCategory === "All" || c.category === activeCategory;
      const notEnrolled = !enrolledCourseIds.has(c.id);
      return matchesCategory && notEnrolled;
    });
  }, [allCourses, activeCategory, enrolledCourseIds]);

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
            <span>{enrollments.length} courses</span>
          </div>
        </div>

        {fetchingEnrollments ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-12 px-6 text-center">
            <span className="text-3xl opacity-30">📚</span>
            <p className="text-sm font-semibold text-foreground">
              No enrolled courses yet
            </p>
            <p className="text-xs text-foreground-muted">
              Browse available courses below and enroll to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.map((enrollment) => (
              <CourseCard
                key={enrollment.id}
                course={{ ...enrollment.course, progress: 0 }}
                enrolled
              />
            ))}
          </div>
        )}
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

        {fetchingAllCourses ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredBrowse.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-12 px-6 text-center">
            <span className="text-3xl opacity-30">🔍</span>
            <p className="text-sm font-semibold text-foreground">
              No courses found
            </p>
            <p className="text-xs text-foreground-muted">
              Try a different category or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrowse.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
