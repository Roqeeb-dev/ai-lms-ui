"use client";

import { useEffect } from "react";
import { useForm } from "@/hooks/useForm";
import { Lesson, LessonType } from "@/types/lesson";
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
} from "lucide-react";

interface Props {
  moduleId: string;
  lesson?: Lesson;
  onSubmit: (
    moduleOrLessonId: string,
    data: CreateLessonPayload | UpdateLessonPayload,
  ) => Promise<any>;
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
  { value: "document", label: "Document", icon: <FileText size={13} /> },
  { value: "text", label: "Text", icon: <AlignLeft size={13} /> },
];

export default function LessonForm({
  moduleId,
  lesson,
  onSubmit,
  onDelete,
  onSuccess,
  loading,
  deleting,
}: Props) {
  const isEditing = !!lesson;

  const { values, update, reset, setAll } = useForm<{
    title: string;
    type: LessonType;
    file: File | null;
  }>({
    title: "",
    type: "video",
    file: null,
  });

  useEffect(() => {
    if (lesson) {
      setAll({ title: lesson.title, type: lesson.type, file: null });
    } else {
      reset();
    }
  }, [lesson?.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = isEditing
      ? ({
          title: values.title,
          type: values.type,
          ...(values.file && { file: values.file }),
        } as UpdateLessonPayload)
      : ({
          title: values.title,
          type: values.type,
          file: values.file!,
        } as CreateLessonPayload);

    await onSubmit(isEditing ? lesson!.id : moduleId, payload);
    onSuccess?.();
    if (!isEditing) reset();
  }

  return (
    <div className="w-full max-w-lg flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <PlayCircle size={15} className="text-primary" />
          </div>
          <h2 className="text-sm font-bold text-foreground">
            {isEditing ? "Edit Lesson" : "New Lesson"}
          </h2>
        </div>
        <p className="text-xs text-foreground-muted pl-10">
          {isEditing
            ? "Update the lesson details below"
            : "Fill in the details to create a new lesson"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. How the knight moves"
            required
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>

        {/* Lesson type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Type <span className="text-destructive">*</span>
          </label>
          <div className="flex items-center gap-2">
            {lessonTypes.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => update("type", t.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                  values.type === t.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-foreground-muted hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* File upload — video and document only */}
        {values.type !== "text" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              {values.type === "video" ? "Video File" : "Document File"}
              {!isEditing && <span className="text-destructive"> *</span>}
            </label>
            <label className="w-full flex flex-col items-center justify-center gap-2 px-3 py-6 rounded-lg border border-dashed border-border bg-background hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
              <Upload size={18} className="text-foreground-muted" />
              <span className="text-xs text-foreground-muted text-center">
                {values.file
                  ? values.file.name
                  : isEditing
                    ? "Upload a new file to replace the current one"
                    : `Click to upload a ${values.type} file`}
              </span>
              <input
                type="file"
                accept={values.type === "video" ? "video/*" : ".pdf,.doc,.docx"}
                required={!isEditing}
                onChange={(e) => update("file", e.target.files?.[0] ?? null)}
                className="hidden"
              />
            </label>
            {isEditing && lesson.file?.url && (
              <a
                href={lesson.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                View current file
              </a>
            )}
          </div>
        )}

        {/* Text type placeholder */}
        {values.type === "text" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground">
              Content <span className="text-destructive">*</span>
            </label>
            <div className="w-full px-3 py-4 rounded-lg border border-dashed border-border bg-background text-xs text-foreground-muted text-center">
              Text editor coming soon
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              <Trash2 size={13} />
              {deleting ? "Deleting..." : "Delete Lesson"}
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={
              loading || (!isEditing && values.type !== "text" && !values.file)
            }
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save size={13} />
            {loading
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
}
