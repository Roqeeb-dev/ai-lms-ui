import { BookOpen } from "lucide-react";

export default function BuilderEditor() {
  return (
    <main className="flex-1 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-center max-w-xs">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
          <BookOpen size={20} className="text-foreground-muted" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">
          Select a module or lesson
        </h3>
        <p className="text-xs text-foreground-muted leading-relaxed">
          Choose something from the left panel to start editing, or add a new
          module to get started.
        </p>
      </div>
    </main>
  );
}
