import { Plus } from "lucide-react";

interface Props {
  title: string;
  text: string;
  onClick?: () => void;
}

export default function DashboardHeader({ title, text, onClick }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-foreground-muted">{text}</p>
      </div>
      {onClick && (
        <button
          onClick={onClick}
          className="flex items-center gap-2 self-start sm:self-auto bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          <Plus size={15} />
          Create Course
        </button>
      )}
    </div>
  );
}
