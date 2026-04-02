"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCourse } from "@/hooks/useCourse";
import { useEnrollment } from "@/hooks/useEnrollment";
import { useUser } from "@/hooks/useUser";
import { BookOpen, Users, Star, ArrowLeft } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";
import Link from "next/link";
import Image from "next/image";
import { Course } from "@/types/course";

const placeholderInstructor = {
  name: "Instructor",
  bio: "This instructor hasn't added a bio yet.",
  headline: "Educator & Course Creator",
};

interface PublicInstructor {
  name: string;
  bio: string;
  profilePic?: { url: string; public_id: string } | null;
}

export default function PublicInstructorClient() {
  const params = useParams<{ instructorId: string }>();

  const { gettingCourses, getInstructorCourses } = useCourse();
  const { enrollments } = useEnrollment({ publishedOnly: true });
  const { getPublicUserProfile } = useUser();

  const [publicInstructor, setPublicInstructor] =
    useState<PublicInstructor | null>(null);
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!params?.instructorId) return;

    async function fetchCourses() {
      try {
        const res = await getInstructorCourses(params.instructorId);
        const published = (res?.courses ?? []).filter(
          (c: Course) => c.status === "published",
        );
        setInstructorCourses(published);
      } catch (err) {
        console.error("Failed to fetch instructor courses", err);
      }
    }

    async function fetchInstructor() {
      try {
        const res = await getPublicUserProfile(params.instructorId);
        setPublicInstructor(res.data);
      } catch (err) {
        console.error("Failed to fetch instructor", err);
      }
    }

    fetchCourses();
    fetchInstructor();
  }, [params?.instructorId]);

  const enrolledCourseIds = new Set(enrollments.map((e) => e.course.id));

  const instructor = {
    name: publicInstructor?.name || placeholderInstructor.name,
    bio: publicInstructor?.bio || placeholderInstructor.bio,
    headline: placeholderInstructor.headline,
    profilePic: publicInstructor?.profilePic?.url ?? null,
  };

  const initials = instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const showAvatar = !!instructor.profilePic && !imgError;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
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
          {showAvatar ? (
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-border">
              <Image
                src={instructor.profilePic!}
                alt={instructor.name}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
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
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {instructor.name}
            </h1>
            <p className="text-sm text-foreground-muted">
              {instructor.headline}
            </p>
          </div>

          <p className="text-xs text-foreground-muted leading-relaxed max-w-xl">
            {instructor.bio}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <BookOpen size={13} className="text-primary" />
              <span>
                <span className="font-semibold text-foreground">
                  {instructorCourses.length}
                </span>{" "}
                {instructorCourses.length === 1 ? "course" : "courses"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <Users size={13} className="text-primary" />
              <span className="text-foreground">0 students</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <Star size={13} className="text-amber-500" />
              <span className="font-semibold text-foreground">New</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted">
          Courses by this instructor
        </h2>

        {gettingCourses ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : instructorCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <span className="text-3xl opacity-30">📚</span>
            <p className="text-sm font-semibold text-foreground">
              No published courses yet
            </p>
            <p className="text-xs text-foreground-muted">
              This instructor hasn't published any courses yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {instructorCourses.map((c) => (
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
