"use client";

import { useState, useEffect, useMemo } from "react";
import { useEnrollment } from "@/hooks/useEnrollment";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { Search, Users, BookOpen } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import LoadingScreen from "@/components/LoadingPage";
import { Course } from "@/types/course";
import { EnrollmentWithStudent } from "@/types/enrollment";

interface StudentsClientProps {
  initialCourses: Course[];
  initialStudents: EnrollmentWithStudent[];
  initialSelectedCourseId: string;
}

export default function StudentsClient({
  initialCourses,
  initialStudents,
  initialSelectedCourseId,
}: StudentsClientProps) {
  const { courses, fetching: fetchingCourses } =
    useInstructorCourses(initialCourses);
  const { courseStudents, fetchingStudents, fetchCourseStudents } =
    useEnrollment();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialSelectedCourseId,
  );
  const [search, setSearch] = useState("");
  const [lastFetchedId, setLastFetchedId] = useState<string | null>(
    initialStudents.length > 0 ? initialSelectedCourseId : null,
  );
  const [isRefreshingStudents, setIsRefreshingStudents] = useState(false);

  // Use initial data if available, otherwise use state
  const currentCourses = courses.length > 0 ? courses : initialCourses;
  const currentStudents =
    courseStudents.length > 0 ? courseStudents : initialStudents;

  // ✅ Set initial course safely (no unnecessary updates)
  useEffect(() => {
    if (!currentCourses.length) return;

    setSelectedCourseId((prev) => prev || currentCourses[0].id);
  }, [currentCourses]);

  // ✅ Fetch students only when needed
  useEffect(() => {
    if (!selectedCourseId) return;
    if (lastFetchedId === selectedCourseId) return;

    fetchCourseStudents(selectedCourseId);
    setLastFetchedId(selectedCourseId);
  }, [selectedCourseId, fetchCourseStudents, lastFetchedId]);

  async function handleRefreshStudents() {
    if (!selectedCourseId) return;
    setIsRefreshingStudents(true);

    try {
      await fetchCourseStudents(selectedCourseId);
    } finally {
      setIsRefreshingStudents(false);
    }
  }

  // 🔍 Filter students
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return currentStudents.filter((e) => {
      return (
        e.user.name.toLowerCase().includes(q) ||
        e.user.email.toLowerCase().includes(q)
      );
    });
  }, [currentStudents, search]);

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const statusConfig: Record<string, { label: string; class: string }> = {
    active: {
      label: "Active",
      class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    completed: {
      label: "Completed",
      class: "bg-primary/10 text-primary border-primary/20",
    },
    dropped: {
      label: "Dropped",
      class: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader
        title="Students"
        text="View and manage students enrolled in your courses."
      />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2">
          <select
            value={selectedCourseId}
            onChange={(e) => {
              const newId = e.target.value;

              // ✅ prevent unnecessary updates
              if (newId === selectedCourseId) return;

              setSelectedCourseId(newId);
              setSearch("");
            }}
            disabled={fetchingCourses}
            className="sm:w-64 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 disabled:opacity-50"
          >
            {fetchingCourses ? (
              <option>Loading courses...</option>
            ) : currentCourses.length === 0 ? (
              <option>No courses yet</option>
            ) : (
              currentCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            onClick={handleRefreshStudents}
            disabled={
              !selectedCourseId || fetchingStudents || isRefreshingStudents
            }
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition-all duration-200 hover:bg-muted disabled:opacity-50"
          >
            {isRefreshingStudents ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-input pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          />
        </div>
      </div>

      {/* Student count */}
      {!fetchingStudents && selectedCourseId && (
        <div className="flex items-center gap-2 -mt-2">
          <Users size={13} className="text-foreground-muted" />
          <p className="text-xs text-foreground-muted">
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "student" : "students"}
            {search && (
              <span>
                {" "}
                matching{" "}
                <span className="font-semibold text-foreground">
                  "{search}"
                </span>
              </span>
            )}
          </p>
        </div>
      )}

      {!selectedCourseId ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 px-6 text-center">
          <BookOpen size={24} className="text-foreground-muted opacity-40" />
          <p className="text-sm font-semibold text-foreground">
            No courses yet
          </p>
          <p className="text-xs text-foreground-muted">
            Create and publish a course to start seeing your students here.
          </p>
        </div>
      ) : fetchingStudents ? (
        <LoadingScreen />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 px-6 text-center">
          <Users size={24} className="text-foreground-muted opacity-40" />
          <p className="text-sm font-semibold text-foreground">
            {search ? `No students matching "${search}"` : "No students yet"}
          </p>
          <p className="text-xs text-foreground-muted">
            {search
              ? "Try a different search term."
              : "Students will appear here once they enroll in this course."}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs font-semibold text-primary hover:underline underline-offset-4"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[2fr_2fr_1fr_auto] gap-4 px-5 py-3 border-b border-border bg-muted/50">
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
              Student
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted hidden sm:block">
              Email
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted hidden sm:block">
              Enrolled
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
              Status
            </span>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {filtered.map((enrollment) => {
              const status =
                statusConfig[enrollment.status] ?? statusConfig.active;

              return (
                <div
                  key={enrollment.id}
                  className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[2fr_2fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {initials(enrollment.user.name)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-foreground truncate">
                        {enrollment.user.name}
                      </span>
                      <span className="text-xs text-foreground-muted sm:hidden truncate">
                        {enrollment.user.email}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm text-foreground-muted truncate hidden sm:block">
                    {enrollment.user.email}
                  </span>

                  <span className="text-xs text-foreground-muted hidden sm:block">
                    {new Date(enrollment.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </span>

                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${status.class}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
