"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CourseAnalytics } from "@/services/analyticsService";
import { Course } from "@/types/course";

interface Props {
  courses: Course[];
  analyticsMap: Map<string, CourseAnalytics>;
  analyticsLoading: boolean;
}

const BAR_COLORS = [
  "hsl(var(--primary))",
  "#10b981",
  "#38bdf8",
  "#f59e0b",
  "#a78bfa",
  "#f472b6",
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card px-3 py-2 shadow-md">
      <span className="text-xs font-semibold text-foreground">
        {payload[0]?.payload?.name}
      </span>
      <span className="text-xs text-foreground-muted">
        {payload[0]?.value ?? 0}{" "}
        {payload[0]?.value === 1 ? "student" : "students"}
      </span>
    </div>
  );
}

export default function StudentBarChart({
  courses,
  analyticsMap,
  analyticsLoading,
}: Props) {
  const data = courses.map((c) => ({
    name: c.title.length > 12 ? c.title.slice(0, 12) + "…" : c.title,
    students: analyticsLoading
      ? 0
      : (analyticsMap.get(c.id)?.totalStudents ?? 0),
  }));

  const maxStudents = Math.max(...data.map((d) => d.students), 1);

  if (analyticsLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <span className="text-xs text-foreground-muted animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  // Zero state
  if (data.every((d) => d.students === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] gap-2">
        <span className="text-2xl opacity-20">👥</span>
        <span className="text-xs text-foreground-muted">
          No students enrolled yet
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          barCategoryGap="40%"
          margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, maxStudents + 1]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={20}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "hsl(var(--muted))" }}
          />
          <Bar dataKey="students" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {data.map((_, idx) => (
              <Cell
                key={idx}
                fill={BAR_COLORS[idx % BAR_COLORS.length]}
                fillOpacity={0.9}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 border-t border-border">
        {data.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: BAR_COLORS[idx % BAR_COLORS.length] }}
            />
            <span className="text-[10px] text-foreground-muted leading-none">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
