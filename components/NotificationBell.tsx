import { Bell } from "lucide-react";

export default function NotificationBell({ count }: { count: number }) {
  return (
    <button className="relative p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-all duration-200">
      <Bell size={18} />
      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
      )}
    </button>
  );
}
