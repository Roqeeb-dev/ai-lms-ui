"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { useCourse } from "@/hooks/useCourse";
import { useEnrollment } from "@/hooks/useEnrollment";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";

export default function BrowseClient() {
  const [search, setSearch] = useState("");
  const { allCourses, fetchingAllCourses, getAllCourses } = useCourse({
    publishedOnly: true,
  });
  const {
    enrollments,
    fetching: fetchingEnrollments,
    enroll,
    enrolling,
    refetchEnrollments,
  } = useEnrollment({ publishedOnly: true });

  async function handleEnroll(courseId: string) {
    const res = await enroll(courseId);
    if (!res) return;
    await refetchEnrollments();
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  const enrolledCourseIds = new Set(enrollments.map((e) => e.course.id));

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [allCourses, search]);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Explore Courses
        </h1>
        <p className="text-sm text-foreground-muted">
          Discover new skills and find your next course.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted"
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-input pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
        />
      </div>

      {/* Results count */}
      {!fetchingAllCourses && (
        <div className="flex items-center gap-2 -mt-2">
          <BookOpen size={13} className="text-foreground-muted" />
          <p className="text-xs text-foreground-muted">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "course" : "courses"}
            {search && (
              <span>
                {" "}
                · matching{" "}
                <span className="font-semibold text-foreground">
                  "{search}"
                </span>
              </span>
            )}
          </p>
        </div>
      )}

      {/* Course grid */}
      {fetchingAllCourses ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 px-6 text-center">
          <span className="text-4xl opacity-30">🔍</span>
          <p className="text-sm font-semibold text-foreground">
            {search
              ? `No courses matching "${search}"`
              : "No courses available"}
          </p>
          <p className="text-xs text-foreground-muted">
            {search
              ? "Try a different search term or clear the filters."
              : "Check back later for new courses."}
          </p>
          {search && (
            <button
              onClick={() => {
                setSearch("");
              }}
              className="text-xs font-semibold text-primary hover:underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              enrolled={enrolledCourseIds.has(c.id)}
              onEnroll={handleEnroll}
              enrolling={enrolling}
            />
          ))}
        </div>
      )}
    </div>
  );
}
