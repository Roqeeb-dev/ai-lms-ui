import { Course } from "@/types/course";
import { Module } from "@/types/module";
import { Lesson } from "@/types/lesson";
import { ModuleItem } from "./ModuleItem";
import { Layers, BookOpen } from "lucide-react";

interface Props {
  courseDetails: Course;
  courseModules: Module[];
  lessonsMap: Record<string, Lesson[]>;
  onModuleSelect: (moduleId: string) => void;
  onAddModule: () => void;
  onAddLesson: (moduleId: string) => void;
}

export default function BuilderContent({
  courseDetails,
  courseModules,
  lessonsMap,
  onModuleSelect,
  onAddModule,
  onAddLesson,
}: Props) {
  return (
    <aside className="w-full px-2 md:w-72 shrink-0 border-r border-border bg-card flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-1">
          Course Content
        </h2>
        <p className="text-xs text-foreground-muted line-clamp-2">
          {courseDetails.description}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {courseModules.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 text-xs text-foreground-muted h-full">
            <Layers size={20} className="opacity-40" />
            <span>No modules yet</span>
            <p className="text-center text-xs opacity-60 leading-relaxed">
              Add your first module to start building your course
            </p>
          </div>
        ) : (
          courseModules.map((mod) => (
            <ModuleItem
              key={mod.id}
              mod={mod}
              lessons={lessonsMap[mod.id] ?? []}
              onSelect={onModuleSelect}
              onAddLesson={() => onAddLesson(mod.id)}
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-border shrink-0">
        <button
          onClick={onAddModule}
          className="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <BookOpen size={13} />
          Add Module
        </button>
      </div>
    </aside>
  );
}
