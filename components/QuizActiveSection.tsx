"use client";

import { Loader2, CheckCircle, ChevronRight } from "lucide-react";
import { Question, Quiz } from "@/types/quiz";

export interface ActiveProps {
  currentIndex: number;
  quiz: Quiz;
  question: Question;
  submitting: boolean;
  isLastQuestion: boolean;
  selectedOption: number | null;
  handleSelectOption: (idx: number) => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

export function QuizActiveSection({
  currentIndex,
  quiz,
  question,
  submitting,
  isLastQuestion,
  selectedOption,
  handleSelectOption,
  handleNext,
  handleSubmit,
}: ActiveProps) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-foreground-muted">
            <span>
              Question {currentIndex + 1} of {quiz.questions.length}
            </span>
            <span className="font-semibold text-primary">
              {Math.round(((currentIndex + 1) / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <p className="text-base font-semibold text-foreground leading-relaxed">
            {question.question}
          </p>

          <div className="flex flex-col gap-2.5">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all duration-150 ${
                  selectedOption === idx
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border bg-background hover:border-primary/40 text-foreground"
                }`}
              >
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                    selectedOption === idx
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground-muted"
                  }`}
                >
                  {["A", "B", "C", "D"][idx]}
                </span>
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={isLastQuestion ? handleSubmit : handleNext}
            disabled={selectedOption === null || submitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Submitting...
              </>
            ) : isLastQuestion ? (
              <>
                <CheckCircle size={14} />
                Submit Quiz
              </>
            ) : (
              <>
                Next
                <ChevronRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
