"use client";

import ReactMarkdown from "react-markdown";
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
import { getPdfViewUrl } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  lesson: Lesson | null;
  courseId: string;
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
    <div className="w-full rounded-2xl overflow-hidden border border-border bg-black shadow-lg">
      <video
        src={url}
        controls
        className="w-full max-h-[500px] object-contain"
      />
    </div>
  );
}

function DocumentViewer({ url }: { url: string }) {
  const viewUrl = getPdfViewUrl(url);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-border shadow-sm">
      <iframe src={viewUrl} className="w-full h-[600px]" title="PDF Viewer" />
    </div>
  );
}

export default function LessonViewer({
  lesson,
  courseId,
  completing,
  isCompleted,
  hasPrev,
  hasNext,
  onComplete,
  onPrev,
  onNext,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    if (lesson?.type === "quiz") {
      router.push(
        `/dashboard/student/courses/${courseId}/quiz/${lesson.quizId}`,
      );
      console.log(lesson);
    }
  }, [lesson?.type, lesson?.id]);

  if (!lesson) {
    return (
      <div className="w-full max-w-5xl mx-auto px-8 py-20 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <BookOpen size={22} className="text-foreground-muted" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          Select a lesson to start learning
        </h3>
        <p className="text-sm text-foreground-muted leading-relaxed max-w-sm">
          Choose a lesson from the course outline below to begin.
        </p>
      </div>
    );
  }

  if (lesson?.type === "quiz") return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-3 md:px-8 py-3 md:py-8 flex flex-col gap-6">
      {/* Lesson meta */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {lesson.type === "video" ? (
            <PlayCircle size={14} className="text-primary" />
          ) : lesson.type === "pdf" ? (
            <FileText size={14} className="text-primary" />
          ) : (
            <BookOpen size={14} className="text-primary" />
          )}
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            {lesson.type}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{lesson.title}</h1>
      </div>

      {/* Content */}
      {lesson.type === "video" && lesson.file?.url && (
        <VideoPlayer url={lesson.file.url} />
      )}
      {lesson.type === "pdf" && lesson.file?.url && (
        <DocumentViewer url={lesson.file.url} />
      )}
      {lesson.type === "text" && (
        <div className="w-full rounded-2xl border border-border bg-card p-6 md:p-8">
          {lesson.content ? (
            <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-foreground mb-4 mt-6 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-foreground mb-3 mt-5 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-foreground mb-2 mt-4 first:mt-0">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm text-foreground leading-relaxed mb-3">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-foreground">{children}</em>
                  ),
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-muted text-foreground border border-border">
                      {children}
                    </code>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-sm text-foreground space-y-1 mb-3 pl-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-sm text-foreground space-y-1 mb-3 pl-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground">{children}</li>
                  ),
                  hr: () => <hr className="border-border my-4" />,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/40 pl-4 italic text-foreground-muted my-3">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-foreground-muted italic">
              This lesson has no content yet.
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-2 text-xs font-semibold px-3 md:px-4 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {isCompleted ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-500/10 px-3 md:px-4 py-2 rounded-lg">
            <CheckCircle size={15} />
            <span className="hidden sm:inline">Completed</span>
          </div>
        ) : (
          <button
            onClick={onComplete}
            disabled={completing}
            className="flex items-center gap-2 text-xs font-semibold px-3 md:px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {completing ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span className="hidden sm:inline">Marking...</span>
              </>
            ) : (
              <>
                <CheckCircle size={13} />
                <span className="hidden sm:inline">Mark as Complete</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 text-xs font-semibold px-3 md:px-4 py-2.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
