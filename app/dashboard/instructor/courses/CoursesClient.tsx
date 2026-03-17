"use client";

import { useState, useMemo } from "react";
import { Plus, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import DashboardHeader from "@/components/DashboardHeader";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";

type FilterStatus = "all" | "published" | "draft";

const filterOptions: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
];

export default function CoursesClient() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const { courses, fetching } = useInstructorCourses();

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = activeFilter === "all" || c.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [courses, search, activeFilter]);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <DashboardHeader
        title="My Courses"
        text="Manage, update, and track all your created courses."
      />

      <Link
        href="/dashboard/instructor"
        className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors w-fit -mt-2"
      >
        <ArrowLeft size={13} />
        Back to Dashboard
      </Link>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted"
          />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-input pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                activeFilter === opt.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {!fetching && (
        <p className="text-xs text-foreground-muted -mt-2">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "course" : "courses"}
          {activeFilter !== "all" && (
            <span>
              {" "}
              · filtered by{" "}
              <span className="font-semibold text-foreground">
                {activeFilter}
              </span>
            </span>
          )}
        </p>
      )}

      {fetching ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-sm text-foreground-muted">Loading courses...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} variant="instructor" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card py-16 px-6 text-center">
          <span className="text-4xl opacity-30">📭</span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">
              {search ? `No courses matching "${search}"` : "No courses yet"}
            </p>
            <p className="text-xs text-foreground-muted">
              {search
                ? "Try a different search term or clear the filter."
                : "Get started by creating your first course."}
            </p>
          </div>

          {!search && (
            <Link
              href="/dashboard/instructor/courses/create"
              className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              <Plus size={15} />
              Create your first course
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
