"use client";

import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PlayCircle,
  FileText,
} from "lucide-react";
import { Lesson } from "@/types/lesson";

interface Props {
  lesson: Lesson | null;
  completing: boolean;
  isCompleted: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onComplete: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function VideoPlayer({ url }: { url: string }) {
  return (
    <video
      src={url}
      controls
      className="w-full rounded-xl border border-border bg-black max-h-[480px]"
    />
  );
}

function DocumentViewer({ url }: { url: string }) {
  return (
    <iframe
      src={url}
      className="w-full h-[480px] rounded-xl border border-border"
    />
  );
}

export default function LessonViewer({
  lesson,
  completing,
  isCompleted,
  hasPrev,
  hasNext,
  onComplete,
  onPrev,
  onNext,
}: Props) {
  if (!lesson) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center max-w-xs">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <BookOpen size={20} className="text-foreground-muted" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Select a lesson
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Choose a lesson from the left panel to start learning.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Lesson content */}
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        {/* Lesson title */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            {lesson.type === "video" ? (
              <PlayCircle size={15} className="text-primary" />
            ) : lesson.type === "pdf" ? (
              <FileText size={15} className="text-primary" />
            ) : (
              <BookOpen size={15} className="text-primary" />
            )}
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              {lesson.type}
            </span>
          </div>
          <h1 className="text-lg font-bold text-foreground">{lesson.title}</h1>
        </div>

        {/* Content */}
        {lesson.type === "video" && lesson.file?.url && (
          <VideoPlayer url={lesson.file.url} />
        )}

        {lesson.type === "pdf" && lesson.file?.url && (
          <DocumentViewer url={lesson.file.url} />
        )}

        {lesson.type === "text" && (
          <div className="prose prose-sm max-w-none text-foreground-muted">
            <p>Text content coming soon.</p>
          </div>
        )}
      </div>

      {/* Footer nav */}
      <div className="shrink-0 border-t border-border bg-card px-8 py-4 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={13} />
          Previous
        </button>

        {isCompleted ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <CheckCircle size={14} />
            Completed
          </div>
        ) : (
          <button
            onClick={onComplete}
            disabled={completing}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {completing ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                Marking...
              </>
            ) : (
              <>
                <CheckCircle size={13} />
                Mark as Complete
              </>
            )}
          </button>
        )}

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={13} />
        </button>
      </div>
    </main>
  );
}
