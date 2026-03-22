"use client";

import { CourseThumbnail } from "./CourseThumbnail";
import { InstructorFooter } from "./InstructorFooter";
import { StudentFooter } from "./StudentFooter";
import { CourseStatusBadge } from "./CourseStatusBadge";
import { CourseProgress } from "./CourseProgress";
import type { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from "./Dialog";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { useEnrollment } from "@/hooks/useEnrollment";

interface StudentCardProps {
  variant?: "student";
  course: Course & { progress?: number; reason?: string };
  enrolled?: boolean;
  onEdit?: never;
}

interface InstructorCardProps {
  variant: "instructor";
  course: Course & { totalStudents?: number };
  enrolled?: never;
  onDelete?: () => void;
  onToggle?: () => void;
}

type CourseCardProps = StudentCardProps | InstructorCardProps;

export default function CourseCard({
  variant = "student",
  course,
  ...props
}: CourseCardProps) {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const { deleting, deleteCourse } = useInstructorCourses();
  const isInstructor = variant === "instructor";
  const enrolled =
    !isInstructor && "enrolled" in props ? (props.enrolled ?? false) : false;
  const progress =
    !isInstructor && "progress" in course ? course.progress : undefined;
  const reason =
    !isInstructor && "reason" in course ? course.reason : undefined;
  const totalStudents =
    isInstructor && "totalStudents" in course ? (course.totalStudents ?? 0) : 0;
  const onDelete = isInstructor
    ? (props as InstructorCardProps).onDelete
    : undefined;
  const onToggle = isInstructor
    ? (props as InstructorCardProps).onToggle
    : undefined;

  const router = useRouter();
  const { enrolling, enroll, refetchEnrollments } = useEnrollment();

  function handleEdit() {
    router.push(`/dashboard/instructor/course-builder/${course.id}`);
  }

  async function handleDelete() {
    if (deleting) return;
    await deleteCourse(course.id);
    setIsDialogShown(false);
    onDelete?.();
  }

  async function handleEnroll(courseId: string) {
    const res = await enroll(courseId);
    if (!res) return;
    await refetchEnrollments();
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200 group cursor-pointer overflow-hidden">
      <CourseThumbnail url={course.thumbnail?.url} title={course.title} />

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            {course.category ?? "—"}
          </span>
          <div className="flex items-center gap-1.5">
            <CourseStatusBadge
              status={course.status}
              isInstructor={isInstructor}
              reason={reason}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
            {course.title}
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {!isInstructor && reason && (
          <p className="text-xs text-amber-600 bg-accent/10 rounded-lg px-3 py-1.5">
            {reason}
          </p>
        )}

        {!isInstructor && enrolled && progress !== undefined && (
          <CourseProgress progress={progress} />
        )}

        <div className="flex items-center justify-between mt-auto">
          {isInstructor ? (
            <InstructorFooter
              totalStudents={totalStudents}
              onEdit={handleEdit}
              onDelete={() => setIsDialogShown(true)}
              onToggle={onToggle}
            />
          ) : (
            <StudentFooter
              instructorName={course.instructor?.name ?? "Instructor"}
              enrolled={enrolled}
              onEnroll={() => handleEnroll(course.id)}
              loading={enrolling}
              courseId={course.id}
            />
          )}
        </div>
      </div>

      <Dialog
        open={isDialogShown}
        type="confirm"
        onClose={() => setIsDialogShown(false)}
        title="Delete Confirmation"
        onConfirm={handleDelete}
        message="Are you sure you want to delete this item?"
        confirmText="Yes, Delete it"
        cancelText="No, Keep it"
      />
    </div>
  );
}
