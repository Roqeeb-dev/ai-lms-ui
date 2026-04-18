"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { AnalyticsEnrollment } from "@/services/analyticsService";

interface Props {
  enrollments: AnalyticsEnrollment[];
}

const STATUS_CONFIG = {
  completed: { label: "Completed", color: "#10b981" },
  active: { label: "In Progress", color: "hsl(var(--primary))" },
  inactive: { label: "Not Started", color: "hsl(var(--muted-foreground))" },
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card px-3 py-2 shadow-md">
      <span className="text-xs font-semibold text-foreground">
        {payload[0]?.name}
      </span>
      <span className="text-xs text-foreground-muted">
        {payload[0]?.value} {payload[0]?.value === 1 ? "course" : "courses"}
      </span>
    </div>
  );
}

export default function EnrollmentStatusChart({ enrollments }: Props) {
  const counts = enrollments.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(STATUS_CONFIG)
    .map(([key, config]) => ({
      name: config.label,
      value: counts[key] ?? 0,
      color: config.color,
    }))
    .filter((d) => d.value > 0);

  const total = enrollments.length;

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[180px] gap-2">
        <span className="text-2xl opacity-20">📚</span>
        <span className="text-xs text-foreground-muted">
          No enrollments yet
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={74}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-foreground">{total}</span>
          <span className="text-xs text-foreground-muted">
            {total === 1 ? "course" : "courses"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-1 border-t border-border">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: entry.color }}
            />
            <span className="text-[10px] text-foreground-muted">
              {entry.value} {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
