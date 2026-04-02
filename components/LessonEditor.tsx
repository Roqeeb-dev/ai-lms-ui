"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  X,
  Bold,
  Italic,
  Heading2,
  Code,
  Minus,
  List,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface EditorProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (content: string) => void;
  onBack?: () => void;
  initialContent?: string;
}

type Tab = "editor" | "preview";

const TOOLBAR = [
  { icon: Bold, title: "Bold", before: "**", after: "**" },
  { icon: Italic, title: "Italic", before: "*", after: "*" },
  { icon: Heading2, title: "Heading", before: "## ", after: "" },
  { icon: Code, title: "Inline Code", before: "`", after: "`" },
  { icon: List, title: "List item", before: "- ", after: "" },
  { icon: Minus, title: "Divider", before: "\n---\n", after: "" },
];

export function LessonEditor({
  open,
  onClose,
  onCreate,
  onBack,
  initialContent = "",
}: EditorProps) {
  const [activeTab, setActiveTab] = useState<Tab>("editor");
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  if (!open) return null;

  const wrapSelection = (before: string, after: string) => {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);

    const newValue =
      content.slice(0, start) + before + selected + after + content.slice(end);

    setContent(newValue);

    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
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

        {/* Mobile tabs */}
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
            {/* Pane label */}
            <div className="hidden md:flex px-4 py-2.5 border-b border-border bg-background/50">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-muted">
                Editor
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-border bg-background/30 shrink-0">
              {TOOLBAR.map(({ icon: Icon, title, before, after }) => (
                <button
                  key={title}
                  type="button"
                  title={title}
                  onClick={() => wrapSelection(before, after)}
                  className="flex items-center justify-center w-7 h-7 rounded-md text-foreground-muted hover:text-foreground hover:bg-muted transition-all duration-150"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write lesson content in markdown...&#10;&#10;## Heading&#10;**bold**, *italic*, `code`"
              className="flex-1 resize-none p-4 text-sm font-mono bg-transparent text-foreground placeholder:text-foreground-muted/50 outline-none overflow-y-auto"
            />
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

            <div className="flex-1 overflow-y-auto p-4">
              {content.trim() ? (
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
                  {content}
                </ReactMarkdown>
              ) : (
                <p className="text-sm text-foreground-muted/50 italic">
                  Nothing to preview yet. Start writing on the editor side.
                </p>
              )}
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
            onClick={() => onCreate?.(content)}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-150"
          >
            Create Lesson
          </button>
        </footer>
      </div>
    </div>
  );
}
