"use client";

import { LocalQuestion } from "@/app/dashboard/instructor/lessons/[lessonId]/quiz/create/CreateQuizClient";
import { CheckCircle } from "lucide-react";

interface CardProps {
  questions: LocalQuestion[];
}

export function QuizPreviewCard({ questions }: CardProps) {
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q, qIdx) => (
        <article
          key={q.localId}
          className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4"
        >
          <p className="text-sm font-semibold text-foreground">
            <span className="text-primary mr-2">{qIdx + 1}.</span>
            {q.question || (
              <span className="text-foreground-muted italic">
                No question text
              </span>
            )}
          </p>

          <div className="flex flex-col gap-1.5">
            {q.options.map((opt, optIdx) => {
              const isCorrect = q.correctAnswer === optIdx;
              return (
                <div
                  key={optIdx}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isCorrect
                      ? "bg-primary/10 border border-primary/30 text-foreground"
                      : "bg-muted/40 border border-transparent text-foreground-muted"
                  }`}
                >
                  <span
                    className={`text-xs font-bold shrink-0 ${
                      isCorrect ? "text-primary" : "text-foreground-muted"
                    }`}
                  >
                    {letters[optIdx]}
                  </span>
                  <span className="flex-1">
                    {opt || (
                      <span className="italic opacity-50">Empty option</span>
                    )}
                  </span>
                  {isCorrect && (
                    <CheckCircle size={13} className="text-primary shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </div>
  );
}
