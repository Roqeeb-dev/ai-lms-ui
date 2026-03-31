"use client";

import { ArrowLeft, X } from "lucide-react";

export interface EditorProps {
  open: boolean;
  onClose: () => void;
  onCreate?: () => void;
  onSwitch?: () => void;
  onBack?: () => void;
}

export function LessonEditor({
  open,
  onClose,
  onCreate,
  onSwitch,
  onBack,
}: EditorProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal panel */}
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border shrink-0">
          <button
            onClick={onBack ?? onClose}
            className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-150"
          >
            <ArrowLeft size={15} />
            <span>Back to Course Builder</span>
          </button>

          <div className="flex flex-col items-center gap-0.5 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
              Lesson ID
            </p>
            <p className="text-sm font-bold text-foreground leading-tight">
              Lesson Title
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-all duration-150"
            aria-label="Close editor"
          >
            <X size={15} />
          </button>
        </header>

        {/* Editor + Preview */}
        <section className="grid grid-cols-2 divide-x divide-border flex-1 min-h-0 overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-background/50">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
                Editor
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-foreground-muted">
              Markdown editor
            </div>
          </div>

          <div className="flex flex-col overflow-hidden">
            <div className="px-4 py-2.5 border-b border-border bg-background/50">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
                Preview
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-foreground-muted">
              Preview section
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-background/50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground-muted hover:text-foreground hover:border-foreground/30 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-150"
          >
            Create Lesson
          </button>
        </footer>
      </div>
    </div>
  );
}
