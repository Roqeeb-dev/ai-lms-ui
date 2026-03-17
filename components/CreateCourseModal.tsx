"use client";

import { useEffect, useRef, useState } from "react";
import { X, Loader2, UploadCloud } from "lucide-react";
import type { Course } from "@/types/course";
import { CreateCoursePayload } from "@/services/courseService";
import { useForm } from "@/hooks/useForm";

interface CourseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData) => Promise<void>;
  defaultValues?: Partial<Course>;
  mode?: "create" | "update";
}

export type CourseFormData = CreateCoursePayload;

export type ModalState =
  | { mode: "create"; state: "creating" }
  | { mode: "update"; state: "updating" };

const EMPTY_FORM: CourseFormData = {
  title: "",
  description: "",
  thumbnail: null,
  status: "draft",
};

export default function CourseModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
  mode = "create",
}: CourseModalProps) {
  const { values, update, setAll } = useForm<CourseFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const state: ModalState =
    mode === "update"
      ? { mode: "update", state: "updating" }
      : { mode: "create", state: "creating" };

  useEffect(() => {
    if (open && state.mode === "update" && defaultValues) {
      setAll({
        title: defaultValues.title ?? "",
        description: defaultValues.description ?? "",
        thumbnail: null,
        status: defaultValues.status ?? "draft",
      });
      setPreview(defaultValues.thumbnail?.url ?? null);
    }

    if (!open) {
      setAll(EMPTY_FORM);
      setPreview(null);
      setError(null);
    }
  }, [open]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    update("thumbnail", file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(values);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-background shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-sm font-bold text-foreground tracking-tight">
              {state.mode === "update" ? "Update Course" : "Create New Course"}
            </h2>
            <p className="text-xs text-foreground-muted">
              {state.mode === "update"
                ? "Edit the details below and save your changes."
                : "Fill in the details below to get your course started."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 px-6 py-5 overflow-y-auto"
        >
          {/* Thumbnail */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Thumbnail
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative w-full h-36 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center group ${
                preview
                  ? "border-primary/30"
                  : "border-border hover:border-primary/50 bg-muted/40"
              }`}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <p className="text-xs font-semibold text-white">
                      Click to change
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-foreground-muted group-hover:text-foreground transition-colors duration-200">
                  <UploadCloud size={20} />
                  <p className="text-xs font-medium">
                    Click to upload thumbnail
                  </p>
                  <p className="text-xs opacity-60">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g. Introduction to Python"
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Description
            </label>
            <textarea
              placeholder="Briefly describe what students will learn..."
              value={values.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200 resize-none"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Status
            </label>
            <div className="grid grid-cols-2 rounded-lg border border-border bg-card p-1 gap-1">
              {(["draft", "published"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update("status", s)}
                  className={`py-1.5 rounded-md text-xs font-semibold capitalize transition-all duration-200 ${
                    values.status === s
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading
                ? state.state === "updating"
                  ? "Saving..."
                  : "Creating..."
                : state.state === "updating"
                  ? "Save Changes"
                  : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
