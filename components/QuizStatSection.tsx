"use client";

import { ClipboardList, Trophy } from "lucide-react";
import { QuizAttempt } from "@/services/quizService";
import { format } from "date-fns";

export function QuizStatSection({
  attempts,
  bestScores,
}: {
  attempts: QuizAttempt[];
  bestScores: number[];
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-foreground">
        Quiz Performance
      </h2>

      {attempts.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You haven't attempted any quizzes yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {attempts.map((attempt, index) => (
          <div
            key={attempt.id ?? index}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ClipboardList size={15} className="text-primary" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                Quiz Attempt #{index + 1}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(attempt.startedAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        ))}

        {bestScores.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-amber-500" />
              <span className="text-sm font-semibold text-foreground">
                Best Scores
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {bestScores.map((score, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600"
                >
                  {score}%
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
