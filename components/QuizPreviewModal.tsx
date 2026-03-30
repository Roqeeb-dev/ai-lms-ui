"use client";

import { Save, X } from "lucide-react";
import { QuizPreviewCard } from "./QuizPreviewCard";
import { LocalQuestion } from "@/app/dashboard/instructor/lessons/[lessonId]/quiz/create/CreateQuizClient";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  questions: LocalQuestion[];
  passingScore: number;
  shuffleQuestions: boolean;
}

export default function QuizPreviewModal({
  open,
  onClose,
  onSubmit,
  passingScore,
  shuffleQuestions,
  questions,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-bold text-foreground">Quiz Preview</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex items-center gap-4 px-6 py-3 bg-muted/40 border-b border-border text-xs text-foreground-muted shrink-0">
          <span>
            Passing Score:{" "}
            <span className="font-semibold text-foreground">
              {passingScore}%
            </span>
          </span>
          <span className="text-border">•</span>
          <span>
            Shuffle:{" "}
            <span className="font-semibold text-foreground">
              {shuffleQuestions ? "Yes" : "No"}
            </span>
          </span>
          <span className="text-border">•</span>
          <span>
            <span className="font-semibold text-foreground">
              {questions.length}
            </span>{" "}
            questions
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <QuizPreviewCard questions={questions} />
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            <Save size={13} />
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
