"use client";

import { useEffect, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { LessonEditor } from "./LessonEditor";
import { Lesson, LessonType } from "@/types/lesson";
import { useRouter } from "next/navigation";
import {
  CreateLessonPayload,
  UpdateLessonPayload,
} from "@/services/lessonService";
import {
  PlayCircle,
  FileText,
  AlignLeft,
  Trash2,
  Save,
  Upload,
  Loader2,
  PencilLine,
  Sparkles,
} from "lucide-react";

interface Props {
  moduleId: string;
  lesson?: Lesson;
  onCreate: (moduleId: string, data: CreateLessonPayload) => Promise<any>;
  onUpdate: (lessonId: string, data: UpdateLessonPayload) => Promise<any>;
  onDelete?: () => void;
  onSuccess?: () => void;
  loading?: boolean;
  deleting?: boolean;
}

const lessonTypes: {
  value: LessonType;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "video", label: "Video", icon: <PlayCircle size={13} /> },
  { value: "pdf", label: "Document", icon: <FileText size={13} /> },
  { value: "text", label: "Text", icon: <AlignLeft size={13} /> },
  { value: "quiz", label: "Quiz", icon: <Sparkles size={13} /> },
];

export default function LessonForm({
  moduleId,
  lesson,
  onCreate,
  onUpdate,
  onDelete,
  onSuccess,
  loading,
  deleting,
}: Props) {
  const isEditing = !!lesson;
  const router = useRouter();

  const { values, update, reset, setAll } = useForm<{
    title: string;
    type: LessonType;
    file: File | null;
    content: string;
  }>({
    title: "",
    type: "video",
    file: null,
    content: "",
  });
  const [isLessonEditorShown, setIsLessonEditorShown] = useState(false);

  useEffect(() => {
    if (lesson) {
      setAll({
        title: lesson.title,
        type: lesson.type,
        file: null,
        content: lesson.content ?? "",
      });
    } else {
      reset();
    }
  }, [lesson?.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEditing) {
      await onUpdate(lesson!.id, {
        title: values.title,
        type: values.type,
        ...(values.file && { file: values.file }),
        ...(values.type === "text" && { content: values.content }),
      });
      onSuccess?.();
    } else {
      const res = await onCreate(moduleId, {
        title: values.title,
        type: values.type,
        ...(values.type !== "text" &&
          values.type !== "quiz" && { file: values.file! }),
        ...(values.type === "text" && { content: values.content }),
      });

      onSuccess?.();
      reset();

      if (values.type === "quiz" && res?.lesson?.id) {
        router.push(
          `/dashboard/instructor/lessons/${res.lesson.id}/quiz/create`,
        );
      }
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-background border border-border rounded-xl p-5 md:p-6 shadow-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <PlayCircle size={16} className="text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {isEditing ? "Edit Lesson" : "New Lesson"}
          </h2>
          <p className="text-xs text-foreground-muted">
            {isEditing
              ? "Update the lesson details below"
              : "Fill in the details to create a new lesson"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. How the knight moves"
            required
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground">
            Type <span className="text-destructive">*</span>
          </label>
          <div className="grid sm:grid-cols-2 grid-cols-4 gap-2">
            {lessonTypes.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => update("type", t.value)}
                className={`flex items-center justify-center gap-1 py-2 rounded-lg border text-xs ${
                  values.type === t.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upload */}
        {values.type !== "text" && values.type !== "quiz" && (
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              {values.type === "video" ? "Video File" : "Document File"}
            </label>

            <label className="w-full flex flex-col items-center justify-center gap-2 px-3 py-6 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 cursor-pointer">
              <Upload size={18} />
              <span className="text-xs text-foreground-muted">
                {values.file ? values.file.name : "Click to upload file"}
              </span>
              <input
                type="file"
                accept={values.type === "video" ? "video/*" : ".pdf,.doc,.docx"}
                required={!isEditing}
                onChange={(e) => update("file", e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Text editor trigger */}
        {values.type === "text" && (
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">
              Lesson Content <span className="text-destructive">*</span>
            </label>
            <button
              type="button"
              onClick={() => setIsLessonEditorShown(true)}
              className="w-full flex items-center gap-3 px-4 py-6 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors duration-200 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                <PencilLine size={15} className="text-primary" />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {values.content.trim()
                    ? "Edit Lesson Content"
                    : "Open Text Editor"}{" "}
                </span>
                <span className="text-xs text-foreground-muted">
                  {values.content.trim()
                    ? `${values.content.slice(0, 60)}${values.content.length > 60 ? "…" : ""}`
                    : "Write and format your lesson content"}
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="md:col-span-2 flex justify-between items-center pt-3 border-t border-border">
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs px-3 py-2 text-destructive hover:bg-destructive/10 rounded-md"
            >
              <Trash2 size={14} />
              {deleting ? "Deleting..." : "Delete Lesson"}
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={
              loading ||
              (!isEditing &&
                values.type !== "text" &&
                values.type !== "quiz" &&
                !values.file) ||
              (values.type === "text" && !values.content.trim())
            }
            className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-md bg-primary text-primary-foreground"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {loading
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Lesson"}
          </button>
        </div>
      </form>

      <LessonEditor
        open={isLessonEditorShown}
        onClose={() => setIsLessonEditorShown(false)}
        onBack={() => setIsLessonEditorShown(false)}
        initialContent={values.content}
        onCreate={(content) => {
          update("content", content);
          setIsLessonEditorShown(false);
        }}
      />
    </div>
  );
}
