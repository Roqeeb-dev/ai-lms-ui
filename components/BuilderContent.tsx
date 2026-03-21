import { Course } from "@/types/course";
import { Layers, BookOpen } from "lucide-react";

interface Props {
  courseDetails: Course;
}

export default function BuilderContent({ courseDetails }: Props) {
  return (
    <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-1">
          Course Content
        </h2>
        <p className="text-xs text-foreground-muted line-clamp-2">
          {courseDetails.description}
        </p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-2">
        {/* Placeholder for modules list */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-foreground-muted py-6 justify-center">
            <Layers size={14} />
            <span>No modules yet</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <BookOpen size={13} />
          Add Module
        </button>
      </div>
    </aside>
  );
}
