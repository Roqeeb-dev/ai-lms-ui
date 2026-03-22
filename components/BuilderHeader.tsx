"use client";

import { Course } from "@/types/course";
import { ArrowLeft } from "lucide-react";

interface Props {
  courseDetails: Course;
}
import { useRouter } from "next/navigation";

export default function BuilderHeader({ courseDetails }: Props) {
  const router = useRouter();
  return (
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
  );
}
