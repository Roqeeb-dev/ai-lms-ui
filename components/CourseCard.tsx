import { Sparkles, Users, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/types/course";

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
  onEdit?: () => void;
}

type CourseCardProps = StudentCardProps | InstructorCardProps;

export default function CourseCard({
  variant = "student",
  course,
  ...props
}: CourseCardProps) {
  const isInstructor = variant === "instructor";
  const enrolled =
    !isInstructor && "enrolled" in props ? props.enrolled : false;
  const progress =
    !isInstructor && "progress" in course ? course.progress : undefined;
  const reason =
    !isInstructor && "reason" in course ? course.reason : undefined;
  const totalStudents =
    isInstructor && "totalStudents" in course
      ? course.totalStudents
      : undefined;
  const onEdit = isInstructor && "onEdit" in props ? props.onEdit : undefined;

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200 group cursor-pointer overflow-hidden">
      {/* Thumbnail */}
      {course.thumbnail?.url ? (
        <div className="relative w-full h-36">
          <Image
            src={course.thumbnail.url}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full h-36 bg-muted flex items-center justify-center">
          <span className="text-3xl opacity-20">📚</span>
        </div>
      )}

      <div className="flex flex-col gap-3 p-4">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            {course.category ?? "—"}
          </span>
          <div className="flex items-center gap-1.5">
            {isInstructor ? (
              <span
                className={`text-xs font-semibold rounded-full px-2 py-0.5 border ${
                  course.status === "published"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-muted text-foreground-muted border-border"
                }`}
              >
                {course.status === "published" ? "Published" : "Draft"}
              </span>
            ) : (
              <>
                {course.status === "draft" && (
                  <span className="text-xs font-semibold bg-muted text-foreground-muted border border-border rounded-full px-2 py-0.5">
                    Draft
                  </span>
                )}
                {reason && (
                  <div className="flex items-center gap-1 bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
                    <Sparkles size={10} className="text-amber-600" />
                    <span className="text-xs text-amber-600 font-medium">
                      AI pick
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
            {course.title}
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* AI pick reason — student only */}
        {!isInstructor && reason && (
          <p className="text-xs text-amber-600 bg-accent/10 rounded-lg px-3 py-1.5">
            {reason}
          </p>
        )}

        {/* Progress — student enrolled only */}
        {!isInstructor && enrolled && progress !== undefined && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-muted">Progress</span>
              <span className="text-xs font-bold text-primary">
                {progress}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border-subtle">
          {isInstructor ? (
            <>
              <div className="flex items-center gap-1 text-xs text-foreground-muted">
                <Users size={12} />
                <span>{totalStudents ?? 0} students</span>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit();
                    }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted text-foreground-muted hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center gap-1"
                  >
                    <Pencil size={11} />
                    Edit
                  </button>
                )}
                <Link
                  href={`/dashboard/instructor/courses/${course.id}`}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  Manage
                </Link>
              </div>
            </>
          ) : (
            <>
              <span className="text-xs text-foreground-muted">
                {course.instructor.name}
              </span>
              <button
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200 ${
                  enrolled
                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {enrolled ? "Continue" : "Enroll"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
