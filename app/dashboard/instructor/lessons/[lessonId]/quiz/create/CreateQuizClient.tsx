"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { useForm } from "@/hooks/useForm";
import {
  Plus,
  Trash2,
  Sparkles,
  Save,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { CreateQuizPayload } from "@/services/quizService";
import { Question } from "@/types/quiz";
import QuizPreviewModal from "@/components/QuizPreviewModal";
import { useGenerateQuiz } from "@/hooks/useAi";

export type LocalQuestion = Omit<Question, "_id"> & { localId: string };

const emptyQuestion = (): LocalQuestion => ({
  localId: crypto.randomUUID(),
  question: "",
  options: ["", "", "", ""],
  correctAnswer: 0,
});

const inputClass =
  "w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200";

const labelClass =
  "text-xs font-semibold uppercase tracking-widest text-foreground-muted";

export default function CreateQuizClient() {
  const params = useParams<{ lessonId: string }>();
  const router = useRouter();
  const { createQuizAsInstructor, creating } = useQuiz();
  const { generating, generateNewQuiz } = useGenerateQuiz();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [questions, setQuestions] = useState<LocalQuestion[]>([
    emptyQuestion(),
    emptyQuestion(),
    emptyQuestion(),
    emptyQuestion(),
    emptyQuestion(),
  ]);

  const { values, update } = useForm<{
    passingScore: number;
    shuffleQuestions: boolean;
  }>({
    passingScore: 70,
    shuffleQuestions: false,
  });

  function updateQuestion(
    localId: string,
    field: keyof LocalQuestion,
    value: any,
  ) {
    setQuestions((prev) =>
      prev.map((q) => (q.localId === localId ? { ...q, [field]: value } : q)),
    );
  }

  function updateOption(localId: string, optionIdx: number, value: string) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.localId === localId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIdx ? value : opt,
              ),
            }
          : q,
      ),
    );
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  }

  function removeQuestion(localId: string) {
    if (questions.length <= 5) return;
    setQuestions((prev) => prev.filter((q) => q.localId !== localId));
  }

  async function handleSubmit() {
    const incomplete = questions.some(
      (q) =>
        !q.question.trim() ||
        q.options.some((o) => !o.trim()) ||
        q.correctAnswer === undefined,
    );
    if (incomplete) return;

    const payload: CreateQuizPayload = {
      questions: questions.map(({ localId, ...q }) => q),
      passingScore: values.passingScore,
      shuffleQuestions: values.shuffleQuestions,
    };

    try {
      await createQuizAsInstructor(params.lessonId, payload);
      router.back();
    } catch {
      // toast handled in hook
    }
  }

  async function handleGenerateAIQuiz() {
    const res = await generateNewQuiz(params.lessonId);
    if (!res?.data?.questions) return;

    const generated: LocalQuestion[] = res.data.questions.map((q: any) => ({
      localId: crypto.randomUUID(),
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
    }));

    setQuestions(generated);
  }

  return (
    <div className="max-w-6xl mx-auto px-3 py-2 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={13} />
          Back
        </button>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Create Quiz
            </h1>
            <p className="text-sm text-foreground-muted">
              Add at least 5 questions. Each question has 4 options with one
              correct answer.
            </p>
          </div>

          <button
            onClick={handleGenerateAIQuiz}
            disabled={generating}
            className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 text-xs font-semibold hover:bg-amber-500/20 transition-colors active:scale-95 active:brightness-95 active:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Generate with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quiz settings */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Quiz Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Passing Score (%)</label>
            <input
              type="number"
              min={1}
              max={100}
              value={values.passingScore}
              onChange={(e) => update("passingScore", Number(e.target.value))}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5 justify-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={values.shuffleQuestions}
                  onChange={(e) => update("shuffleQuestions", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 rounded-full bg-muted peer-checked:bg-primary transition-colors duration-200" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-foreground">Shuffle Questions</span>
            </label>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
            Questions
          </h2>
          <span className="text-xs text-foreground-muted">
            {questions.length} question{questions.length !== 1 ? "s" : ""}
            {questions.length < 5 && (
              <span className="text-destructive ml-1">(minimum 5)</span>
            )}
          </span>
        </div>

        {questions.map((q, qIdx) => (
          <div
            key={q.localId}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Question {qIdx + 1}
              </span>
              <button
                onClick={() => removeQuestion(q.localId)}
                disabled={questions.length <= 5}
                className="p-1.5 rounded-lg text-foreground-muted hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title={
                  questions.length <= 5
                    ? "Minimum 5 questions required"
                    : "Remove question"
                }
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Question</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(q.localId, "question", e.target.value)
                }
                placeholder="e.g. What is the main purpose of..."
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                Options — select the correct answer
              </label>
              <div className="flex flex-col gap-2">
                {q.options.map((opt, optIdx) => (
                  <label
                    key={optIdx}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-150 ${
                      q.correctAnswer === optIdx
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-border bg-background"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestion(q.localId, "correctAnswer", optIdx)
                      }
                      className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        q.correctAnswer === optIdx
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {q.correctAnswer === optIdx && (
                        <CheckCircle
                          size={10}
                          className="text-primary-foreground"
                        />
                      )}
                    </button>
                    <span
                      className={`text-xs font-bold shrink-0 ${
                        q.correctAnswer === optIdx
                          ? "text-primary"
                          : "text-foreground-muted"
                      }`}
                    >
                      {["A", "B", "C", "D"][optIdx]}
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        updateOption(q.localId, optIdx, e.target.value)
                      }
                      placeholder={`Option ${["A", "B", "C", "D"][optIdx]}`}
                      className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border text-xs font-semibold text-foreground-muted hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={13} />
          Add Question
        </button>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        <button
          onClick={() => router.back()}
          disabled={creating}
          className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={creating || questions.length < 5}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? (
            <>
              <div className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Save size={13} />
              Open Preview
            </>
          )}
        </button>
      </div>

      <QuizPreviewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        questions={questions}
        passingScore={values.passingScore}
        shuffleQuestions={values.shuffleQuestions}
      />
    </div>
  );
}
