"use client";

import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";

export interface EditorProps {
  open: boolean;
  onClose: () => void;
  onCreate?: () => void;
  onBack?: () => void;
}

type Tab = "editor" | "preview";

export function LessonEditor({ open, onClose, onCreate, onBack }: EditorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("editor");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal panel */}
      <div className="relative flex flex-col w-full h-full md:h-auto md:max-w-5xl md:max-h-[90vh] md:rounded-2xl border-0 md:border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 px-4 md:px-6 py-4 border-b border-border shrink-0">
          <button
            onClick={onBack ?? onClose}
            className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-150"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back to Course Builder</span>
            <span className="sm:hidden">Back</span>
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

        <div className="flex md:hidden border-b border-border shrink-0">
          {(["editor", "preview"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors duration-150 ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Editor + Preview */}
        <section className="flex-1 min-h-0 overflow-hidden flex flex-col md:grid md:grid-cols-2 md:divide-x divide-border">
          {/* Editor pane */}
          <div
            className={`flex-col overflow-hidden flex-1 md:flex ${
              activeTab === "editor" ? "flex" : "hidden"
            }`}
          >
            <div className="hidden md:flex px-4 py-2.5 border-b border-border bg-background/50">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
                Editor
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-foreground-muted">
              Markdown editor
            </div>
          </div>

          {/* Preview pane */}
          <div
            className={`flex-col overflow-hidden flex-1 md:flex ${
              activeTab === "preview" ? "flex" : "hidden"
            }`}
          >
            <div className="hidden md:flex px-4 py-2.5 border-b border-border bg-background/50">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
                Preview
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-foreground-muted">
              Preview section
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 px-4 md:px-6 py-4 border-t border-border bg-background/50 shrink-0">
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
