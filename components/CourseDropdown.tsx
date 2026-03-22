import { Trash2, Pencil, ToggleRight } from "lucide-react";

interface DropdownProps {
  onDelete: () => void;
  onEdit: () => void;
  onToggle: () => void;
}

export default function CourseDropdown({
  onDelete,
  onEdit,
  onToggle,
}: DropdownProps) {
  const dropdownLinks = [
    { text: "Manage Course", action: onEdit, icon: Pencil, danger: false },
    {
      text: "Toggle Status",
      action: onToggle,
      icon: ToggleRight,
      danger: false,
    },
    { text: "Delete Course", action: onDelete, icon: Trash2, danger: true },
  ];

  return (
    <div className="absolute right-0 bottom-10 z-10 w-48 rounded-lg border border-border bg-card shadow-lg py-1.5">
      {dropdownLinks.map((link, idx) => (
        <button
          key={idx}
          onClick={link.action}
          className={`w-full flex items-center gap-3 px-4 py-3 md:py-2 text-sm hover:bg-muted transition-colors ${
            link.danger ? "text-destructive" : "text-foreground"
          }`}
        >
          <link.icon size={15} />
          {link.text}
        </button>
      ))}
    </div>
  );
}
