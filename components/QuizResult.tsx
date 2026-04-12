"use client";

import type { QuizResult as QuizResultType } from "@/app/dashboard/student/courses/[courseId]/quiz/[quizId]/QuizViewerClient";
import {
  Trophy,
  XCircle,
  ArrowLeft,
  Clock,
  CheckCircle,
  Target,
  ClipboardList,
  CalendarDays,
} from "lucide-react";

export interface QuizResultProps {
  result: QuizResultType;
  courseId: string;
  onBackToCourse: (courseId: string) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function formatTime(time: string | Date): string {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function QuizResult({
  result,
  courseId,
  onBackToCourse,
}: QuizResultProps) {
  const percentage = Math.floor(result.percentage);
  const wrong = result.totalQuestions - result.score;
  const passed = result.passed;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg flex flex-col gap-4">
        {/* Header card */}
        <div
          className={`flex flex-col items-center gap-4 rounded-2xl border p-8 text-center ${
            passed
              ? "border-emerald-500/20 bg-emerald-500/5"
              : "border-destructive/20 bg-destructive/5"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              passed ? "bg-emerald-500/10" : "bg-destructive/10"
            }`}
          >
            {passed ? (
              <Trophy size={30} className="text-emerald-500" />
            ) : (
              <XCircle size={30} className="text-destructive" />
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold text-foreground">
              {passed ? "You passed!" : "You didn't pass"}
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-xs mx-auto">
              {passed
                ? "Great work — you've demonstrated a solid understanding of this topic."
                : `You needed ${result.passingScore}% to pass. Review the lesson and try again.`}
            </p>
          </div>

          {/* Big percentage display */}
          <div className="flex flex-col items-center gap-1">
            <span
              className={`text-5xl font-black ${passed ? "text-emerald-500" : "text-destructive"}`}
            >
              {percentage}%
            </span>
            <span className="text-xs text-foreground-muted uppercase tracking-widest">
              Final Score
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full flex flex-col gap-1.5">
            <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  passed ? "bg-emerald-500" : "bg-destructive"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-foreground-muted">
              <span>0%</span>
              <span className="text-primary font-semibold">
                Passing: {result.passingScore}%
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: CheckCircle,
              label: "Correct answers",
              value: `${result.score} / ${result.totalQuestions}`,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              icon: XCircle,
              label: "Wrong answers",
              value: `${wrong} / ${result.totalQuestions}`,
              color: "text-destructive",
              bg: "bg-destructive/10",
            },
            {
              icon: Clock,
              label: "Time taken",
              value: formatDuration(result.duration),
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              icon: Target,
              label: "Passing score",
              value: `${result.passingScore}%`,
              color: "text-secondary",
              bg: "bg-secondary/10",
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div
                className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={15} className={color} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-foreground">
                  {value}
                </span>
                <span className="text-[10px] text-foreground-muted uppercase tracking-widest leading-tight">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3.5">
          <div className="flex items-center gap-2">
            <CalendarDays size={13} className="text-foreground-muted" />
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
                Started
              </span>
              <span className="text-xs font-semibold text-foreground">
                {formatTime(result.startedAt)}
              </span>
            </div>
          </div>
          <div className="h-px flex-1 mx-4 border-t border-dashed border-border" />
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
                Submitted
              </span>
              <span className="text-xs font-semibold text-foreground">
                {formatTime(result.submittedAt)}
              </span>
            </div>
            <ClipboardList size={13} className="text-foreground-muted" />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => onBackToCourse(courseId)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
        >
          <ArrowLeft size={14} />
          Back to Course
        </button>
      </div>
    </main>
  );
}
