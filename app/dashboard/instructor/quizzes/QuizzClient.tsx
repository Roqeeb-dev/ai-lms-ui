"use client";

import { BookOpen, PlusCircle, Info } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";

export default function QuizClient() {
  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Quizzes"
        text="View and manage quizzes across your courses and lessons"
      />

      {/* Info card */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Info size={15} className="text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">
            Quizzes are created per lesson
          </p>
          <p className="text-xs text-foreground-muted leading-relaxed">
            To create or manage a quiz, go to your course builder, select a
            lesson, and add a quiz directly to it. Each quiz is tied to a
            specific lesson in your course.
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <BookOpen size={22} className="text-foreground-muted" />
        </div>
        <div className="flex flex-col gap-1.5 max-w-xs">
          <h3 className="text-sm font-semibold text-foreground">
            No quizzes to display here
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Head over to your courses, open a lesson, and create a quiz from the
            course builder.
          </p>
        </div>
        <Link
          href="/dashboard/instructor/courses"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors duration-200"
        >
          <PlusCircle size={14} />
          Go to My Courses
        </Link>
      </div>
    </main>
  );
}
