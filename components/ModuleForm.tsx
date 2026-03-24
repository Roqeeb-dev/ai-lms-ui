"use client";

import { useEffect } from "react";
import { useForm } from "@/hooks/useForm";
import { Module } from "@/types/module";
import {
  CreateCourseModulePayload,
  UpdateModulePayload,
} from "@/services/moduleService";
import { BookOpen, Trash2, Save, Loader2 } from "lucide-react";

interface Props {
  courseId: string;
  module?: Module;
  onCreate: (courseId: string, data: CreateCourseModulePayload) => Promise<any>;
  onUpdate: (moduleId: string, data: UpdateModulePayload) => Promise<any>;
  onDelete?: () => void;
  onSuccess?: () => void;
  loading?: boolean;
  deleting?: boolean;
}

export default function ModuleForm({
  courseId,
  module,
  onCreate,
  onUpdate,
  onDelete,
  onSuccess,
  loading,
  deleting,
}: Props) {
  const isEditing = !!module;

  const { values, update, reset, setAll } = useForm<CreateCourseModulePayload>({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (module) {
      setAll({ title: module.title, description: module.description });
    } else {
      reset();
    }
  }, [module?.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEditing) {
      await onUpdate(module!.id, values);
    } else {
      await onCreate(courseId, values);
    }
    onSuccess?.();
    if (!isEditing) reset();
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-background border border-border rounded-xl p-5 md:p-6 shadow-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <BookOpen size={16} className="text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {isEditing ? "Edit Module" : "New Module"}
          </h2>
          <p className="text-xs text-foreground-muted">
            {isEditing
              ? "Update the module details below"
              : "Fill in the details to create a new module"}
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
            placeholder="e.g. Introduction to Chess"
            required
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-medium text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What will students learn in this module?"
            required
            rows={4}
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          />
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex items-center justify-between pt-3 border-t border-border">
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={14} />
              {deleting ? "Deleting..." : "Delete Module"}
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
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
                : "Create Module"}
          </button>
        </div>
      </form>
    </div>
  );
}
