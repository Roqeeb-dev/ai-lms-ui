"use client";

import { Quiz } from "@/types/quiz";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  ClipboardList,
  Trophy,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export interface QuizIntroProps {
  onBack: () => void;
  fetchingByLesson: boolean;
  starting: boolean;
  quiz: Quiz | null;
  handleStart: () => void;
}

export function QuizIntro({
  onBack,
  fetchingByLesson,
  starting,
  quiz,
  handleStart,
}: QuizIntroProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg flex flex-col gap-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={13} />
          Back to course
        </button>

        <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="relative flex flex-col gap-3 bg-primary px-8 py-8 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="pointer-events-none absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-white opacity-5 blur-2xl" />

            <div className="relative w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="relative flex flex-col gap-1">
              <p className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">
                Knowledge Check
              </p>
              <h1 className="text-2xl font-bold text-white leading-snug">
                Ready to test yourself?
              </h1>
              <p className="text-sm text-white/70 leading-relaxed mt-0.5">
                Answer every question carefully — you can only move forward, no
                going back.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-6 p-6">
            {fetchingByLesson ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-foreground-muted">
                <Loader2 size={15} className="animate-spin" />
                Loading quiz details...
              </div>
            ) : quiz ? (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: ClipboardList,
                      label: "Questions",
                      value: quiz.questions.length,
                      color: "text-primary",
                      bg: "bg-primary/10",
                    },
                    {
                      icon: Trophy,
                      label: "Passing Score",
                      value: `${quiz.passingScore}%`,
                      color: "text-amber-500",
                      bg: "bg-amber-500/10",
                    },
                    {
                      icon: ShieldCheck,
                      label: "Max Attempts",
                      value: quiz.maxAttempts,
                      color: "text-secondary",
                      bg: "bg-secondary/10",
                    },
                  ].map(({ icon: Icon, label, value, color, bg }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}
                      >
                        <Icon size={14} className={color} />
                      </div>
                      <span className="text-lg font-bold text-foreground leading-none">
                        {value}
                      </span>
                      <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-1">
                    Before you begin
                  </p>
                  {[
                    "Each question has one correct answer",
                    "You cannot go back to a previous question",
                    `Score at least ${quiz.passingScore}% to pass`,
                    "Take your time, there's no time limit",
                  ].map((rule) => (
                    <div key={rule} className="flex items-start gap-2">
                      <AlertCircle
                        size={12}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <span className="text-xs text-foreground-muted leading-relaxed">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-foreground-muted italic text-center py-6">
                No quiz found for this lesson.
              </p>
            )}

            <button
              onClick={handleStart}
              disabled={!quiz || starting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {starting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Start Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
