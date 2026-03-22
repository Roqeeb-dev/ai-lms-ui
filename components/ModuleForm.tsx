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
    <div className="w-full max-w-lg flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen size={15} className="text-primary" />
          </div>
          <h2 className="text-sm font-bold text-foreground">
            {isEditing ? "Edit Module" : "New Module"}
          </h2>
        </div>
        <p className="text-xs text-foreground-muted pl-10">
          {isEditing
            ? "Update the module details below"
            : "Fill in the details to create a new module"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="e.g. Introduction to Chess"
            required
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            value={values.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What will students learn in this module?"
            required
            rows={4}
            className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {isEditing && onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              <Trash2 size={13} />
              {deleting ? "Deleting..." : "Delete Module"}
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} />
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
