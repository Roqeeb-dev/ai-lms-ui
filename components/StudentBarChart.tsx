"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CourseAnalytics } from "@/services/analyticsService";
import { Course } from "@/types/course";

interface Props {
  courses: Course[];
  analyticsMap: Map<string, CourseAnalytics>;
  analyticsLoading: boolean;
}

export default function StudentBarChart({
  courses,
  analyticsMap,
  analyticsLoading,
}: Props) {
  const data = courses.map((c) => ({
    name: c.title.length > 14 ? c.title.slice(0, 14) + "…" : c.title,
    students: analyticsLoading
      ? 0
      : (analyticsMap.get(c.id)?.totalStudents ?? 0),
  }));

  if (analyticsLoading) {
    return (
      <div className="flex items-center justify-center h-[180px]">
        <span className="text-xs text-foreground-muted animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barCategoryGap="35%">
        <CartesianGrid
          vertical={false}
          stroke="hsl(var(--border))"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="name"
          tick={{
            fontSize: 11,
            fill: "hsl(var(--foreground-muted, var(--muted-foreground)))",
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{
            fontSize: 11,
            fill: "hsl(var(--foreground-muted, var(--muted-foreground)))",
          }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))", radius: 6 }}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "10px",
            fontSize: "12px",
            color: "hsl(var(--foreground))",
          }}
          formatter={(value) => [value ?? 0, "Students"]}
        />
        <Bar
          dataKey="students"
          fill="hsl(var(--primary))"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
