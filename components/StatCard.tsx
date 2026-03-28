import { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface StatProps {
  stat: Stat;
}

export default function StatCard({ stat }: StatProps) {
  return (
    <div
      key={stat.label}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
    >
      <div
        className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}
      >
        <stat.icon size={15} className={stat.color} />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-bold text-foreground">{stat.value}</span>
        <span className="text-xs text-foreground-muted">{stat.label}</span>
      </div>
    </div>
  );
}
