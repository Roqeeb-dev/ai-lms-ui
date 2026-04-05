"use client";

import type { QuizResult as QuizResultType } from "@/app/dashboard/student/courses/[courseId]/quiz/[lessonId]/QuizViewerClient";
import { Trophy, XCircle, ArrowLeft } from "lucide-react";

export interface QuizResultProps {
  result: QuizResultType;
  courseId: string;
  onBackToCourse: (courseId: string) => void;
}

export function QuizResult({
  result,
  courseId,
  onBackToCourse,
}: QuizResultProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
              result.passed ? "bg-emerald-500/10" : "bg-destructive/10"
            }`}
          >
            {result.passed ? (
              <Trophy size={28} className="text-emerald-500" />
            ) : (
              <XCircle size={28} className="text-destructive" />
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl font-bold text-foreground">
              {result.passed
                ? "Well done! You passed."
                : "Not quite. You didn't pass."}
            </h1>
            <p className="text-sm text-foreground-muted">
              {result.passed
                ? "Great work — you've demonstrated a solid understanding of this topic."
                : "Review the lesson and give it another shot when you're ready."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Score", value: `${result.score}` },
              { label: "Percentage", value: `${result.percentage}%` },
              { label: "Duration", value: `${result.duration}s` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-background p-3"
              >
                <span className="text-lg font-bold text-foreground">
                  {value}
                </span>
                <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onBackToCourse(courseId)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Course
          </button>
        </div>
      </div>
    </main>
  );
}
