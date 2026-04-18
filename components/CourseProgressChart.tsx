"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { AnalyticsEnrollment } from "@/services/analyticsService";

interface Props {
  enrollments: AnalyticsEnrollment[];
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card px-3 py-2 shadow-md">
      <span className="text-xs font-semibold text-foreground">
        {payload[0]?.payload?.name}
      </span>
      <span className="text-xs text-foreground-muted">
        {payload[0]?.value ?? 0}% complete
      </span>
    </div>
  );
}

function getBarColor(progress: number) {
  if (progress === 100) return "#10b981";
  if (progress >= 50) return "hsl(var(--primary))";
  return "#38bdf8";
}

export default function CourseProgressChart({ enrollments }: Props) {
  if (enrollments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] gap-2">
        <span className="text-2xl opacity-20">📈</span>
        <span className="text-xs text-foreground-muted">No courses yet</span>
      </div>
    );
  }

  const data = enrollments.map((e) => ({
    name:
      e.courseTitle.length > 14
        ? e.courseTitle.slice(0, 14) + "…"
        : e.courseTitle,
    fullName: e.courseTitle,
    progress: Math.round(e.progress),
  }));

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 52)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 36, left: 0, bottom: 0 }}
        barCategoryGap="30%"
      >
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Bar dataKey="progress" radius={[0, 6, 6, 0]} maxBarSize={20}>
          <LabelList
            dataKey="progress"
            position="right"
            formatter={(v) => `${v}%`}
            style={{
              fontSize: 10,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          {data.map((entry, idx) => (
            <Cell key={idx} fill={getBarColor(entry.progress)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
