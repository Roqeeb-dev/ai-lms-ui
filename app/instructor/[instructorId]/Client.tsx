"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { useEnrollment } from "@/hooks/useEnrollment";
import { BookOpen, Users, Star, ArrowLeft } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import Image from "next/image";

const placeholderInstructor = {
  name: "Instructor",
  bio: "This instructor hasn't added a bio yet.",
  headline: "Educator & Course Creator",
  profilePic: null as string | null,
};

export default function PublicInstructorClient() {
  const params = useParams<{ instructorId: string }>();
  const { allCourses, fetchingAllCourses, getInstructorCourses } = useCourse();
  const { enrollments } = useEnrollment();

  useEffect(() => {
    getInstructorCourses(params.instructorId);
  }, [params.instructorId]);

  const publishedCourses = allCourses.filter((c) => c.status === "published");
  const totalStudents = 0;
  const enrolledCourseIds = new Set(enrollments.map((e) => e.course.id));

  const initials = placeholderInstructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Back */}
      <Link
        href="/dashboard/student/browse"
        className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft size={13} />
        Back to Explore
      </Link>

      {/* Instructor header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl border border-border bg-card shadow-sm">
        {/* Avatar */}
        <div className="shrink-0">
          {placeholderInstructor.profilePic ? (
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border">
              <Image
                src={placeholderInstructor.profilePic}
                alt={placeholderInstructor.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold text-foreground">
              {placeholderInstructor.name}
            </h1>
            <p className="text-sm text-foreground-muted">
              {placeholderInstructor.headline}
            </p>
          </div>

          <p className="text-xs text-foreground-muted leading-relaxed max-w-xl">
            {placeholderInstructor.bio}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <BookOpen size={13} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">
                  {publishedCourses.length}
                </span>{" "}
                {publishedCourses.length === 1 ? "course" : "courses"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <Users size={13} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">
                  {totalStudents}
                </span>{" "}
                students
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <Star size={13} className="text-amber-500" />
              <span className="font-semibold text-foreground">New</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
            Courses by this instructor
          </h2>
          <span className="text-xs text-foreground-muted">
            {publishedCourses.length}{" "}
            {publishedCourses.length === 1 ? "course" : "courses"}
          </span>
        </div>

        {fetchingAllCourses ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-foreground-muted">Loading courses...</p>
          </div>
        ) : publishedCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 px-6 text-center">
            <span className="text-4xl opacity-30">📭</span>
            <p className="text-sm font-semibold text-foreground">
              No published courses yet
            </p>
            <p className="text-xs text-foreground-muted">
              This instructor hasn't published any courses yet. Check back
              later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {publishedCourses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                enrolled={enrolledCourseIds.has(c.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
