"use client";

export interface QuizIntroProps {
  onBack: () => void;
  fetchingByLesson: boolean;
  starting: boolean;
  quiz: Quiz;
  handleStart: () => void;
}

import { Quiz } from "@/types/quiz";
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  ClipboardList,
  Trophy,
  Timer,
} from "lucide-react";

export function QuizIntro({
  onBack,
  fetchingByLesson,
  starting,
  quiz,
  handleStart,
}: QuizIntroProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={13} />
          Back to course
        </button>

        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Sparkles size={22} className="text-amber-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
              Quiz
            </p>
            <h1 className="text-xl font-bold text-foreground">
              Ready to test your knowledge?
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Answer all questions carefully. You can only move forward. there's
              no going back.
            </p>
          </div>

          {fetchingByLesson ? (
            <div className="flex items-center gap-2 text-sm text-foreground-muted">
              <Loader2 size={14} className="animate-spin" />
              Loading quiz...
            </div>
          ) : quiz ? (
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: ClipboardList,
                  label: "Questions",
                  value: quiz.questions.length,
                },
                {
                  icon: Trophy,
                  label: "Passing Score",
                  value: `${quiz.passingScore}%`,
                },
                {
                  icon: Timer,
                  label: "Max Attempts",
                  value: quiz.maxAttempts,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background p-3 text-center"
                >
                  <Icon size={15} className="text-primary" />
                  <span className="text-base font-bold text-foreground">
                    {value}
                  </span>
                  <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground-muted italic">
              No quiz found for this lesson.
            </p>
          )}

          <button
            onClick={handleStart}
            disabled={!quiz || starting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    </main>
  );
}
