"use client";

import { BookOpen, Info, Sparkles } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";

export default function StudentQuizClient() {
  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Quizzes"
        text="Test your understanding across your courses"
      />

      {/* Info card */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Info size={15} className="text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">
            Quizzes are attached to lessons
          </p>
          <p className="text-xs text-foreground-muted leading-relaxed">
            To take a quiz, open a course, navigate to a quiz lesson in the
            course outline, and it will launch automatically.
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <Sparkles size={22} className="text-foreground-muted" />
        </div>
        <div className="flex flex-col gap-1.5 max-w-xs">
          <h3 className="text-sm font-semibold text-foreground">
            No quizzes to display here
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Head over to your courses and open a lesson marked as a quiz to get
            started.
          </p>
        </div>
        <Link
          href="/dashboard/student/courses"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors duration-200"
        >
          <BookOpen size={14} />
          Go to My Courses
        </Link>
      </div>
    </main>
  );
}
