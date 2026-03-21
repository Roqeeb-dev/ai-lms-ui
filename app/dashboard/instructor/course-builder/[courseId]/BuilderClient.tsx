"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCourse } from "@/hooks/useCourse";
import { Course } from "@/types/course";
import { ArrowLeft, BookOpen, Layers } from "lucide-react";

export default function BuilderClient() {
  const params = useParams<{ courseId: string }>();
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const { fetchingCourseDetails, getCourseDetails } = useCourse();
  const router = useRouter();

  useEffect(() => {
    async function fetchCourse() {
      const res = await getCourseDetails(params.courseId);
      if (!res) return;
      setCourseDetails(res.course);
    }
    fetchCourse();
  }, [params.courseId]);

  if (fetchingCourseDetails) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-foreground-muted">
        Loading course...
      </div>
    );
  }

  if (!courseDetails) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="h-14 shrink-0 border-b border-border bg-card flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/instructor/courses")}
            className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Courses
          </button>
          <span className="text-border">|</span>
          <span className="text-sm font-semibold text-foreground truncate max-w-xs">
            {courseDetails.title}
          </span>
        </div>
        <span
          className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border ${
            courseDetails.status === "published"
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              : "bg-muted text-foreground-muted border-border"
          }`}
        >
          {courseDetails.status === "published" ? "Published" : "Draft"}
        </span>
      </div>

      {/* Builder body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-1">
              Course Content
            </h2>
            <p className="text-xs text-foreground-muted line-clamp-2">
              {courseDetails.description}
            </p>
          </div>

          <div className="flex-1 p-4 flex flex-col gap-2">
            {/* Placeholder for modules list */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-foreground-muted py-6 justify-center">
                <Layers size={14} />
                <span>No modules yet</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <BookOpen size={13} />
              Add Module
            </button>
          </div>
        </aside>

        {/* Right panel */}
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
              <BookOpen size={20} className="text-foreground-muted" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              Select a module or lesson
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Choose something from the left panel to start editing, or add a
              new module to get started.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
