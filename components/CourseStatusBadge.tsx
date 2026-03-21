import { Sparkles } from "lucide-react";

export function CourseStatusBadge({
  status,
  isInstructor,
  reason,
}: {
  status: string;
  isInstructor: boolean;
  reason?: string;
}) {
  if (isInstructor) {
    return (
      <span
        className={`text-xs font-semibold rounded-full px-2 py-0.5 border ${
          status === "published"
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            : "bg-muted text-foreground-muted border-border"
        }`}
      >
        {status === "published" ? "Published" : "Draft"}
      </span>
    );
  }

  return (
    <>
      {status === "draft" && (
        <span className="text-xs font-semibold bg-muted text-foreground-muted border border-border rounded-full px-2 py-0.5">
          Draft
        </span>
      )}
      {reason && (
        <div className="flex items-center gap-1 bg-accent/10 border border-accent/20 rounded-full px-2 py-0.5">
          <Sparkles size={10} className="text-amber-600" />
          <span className="text-xs text-amber-600 font-medium">AI pick</span>
        </div>
      )}
    </>
  );
}
