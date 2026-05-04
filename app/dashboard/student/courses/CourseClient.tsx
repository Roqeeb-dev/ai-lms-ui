"use client";

import { useMemo, useState } from "react";
import { BookOpen, BarChart2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { useEnrollment } from "@/hooks/useEnrollment";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";
import { Course } from "@/types/course";
import { EnrollmentWithCourse } from "@/types/enrollment";
import { getCoursesEnrollment } from "@/services/enrollmentService";

interface CourseClientProps {
  initialEnrollments: EnrollmentWithCourse[];
  initialCourses: Course[];
  initialProgressMap: Record<string, number>;
}

export default function CourseClient({
  initialEnrollments,
  initialCourses,
  initialProgressMap,
}: CourseClientProps) {
  const { enroll, enrolling } = useEnrollment({ publishedOnly: true });

  const [enrollments, setEnrollments] =
    useState<EnrollmentWithCourse[]>(initialEnrollments);
  const [allCourses] = useState<Course[]>(
    initialCourses.filter((course) => course.status === "published"),
  );
  const [progressMap] = useState<Record<string, number>>(initialProgressMap);

  async function handleEnroll(courseId: string) {
    const res = await enroll(courseId);
    if (!res) return;
    const updated = await getCoursesEnrollment();
    setEnrollments(updated.enrollments);
  }

  const fetchingEnrollments = enrolling;
  const fetchingAllCourses = false;
  const enrolledCourseIds = new Set(enrollments.map((e) => e.course.id));

  const filteredBrowse = useMemo(() => {
    return allCourses.filter((c) => !enrolledCourseIds.has(c.id));
  }, [allCourses, enrolledCourseIds]);

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
                course={{
                  ...enrollment.course,
                  progress: progressMap[enrollment.course.id] ?? 0,
                }}
                enrolled
              />
            ))}
          </div>
        )}
      </div>

      {/* Browse */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Browse All
        </h2>

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
              Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrowse.map((c) => (
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
    </div>
  );
}
