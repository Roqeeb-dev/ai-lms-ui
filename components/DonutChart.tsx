"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  published: number;
  drafts: number;
}

export default function DonutChart({ published, drafts }: Props) {
  const data = [
    { name: "Published", value: published },
    { name: "Draft", value: drafts },
  ];
  const total = published + drafts;

  return (
    <div className="relative w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={78}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            <Cell fill="#10b981" />
            <Cell fill="#38bdf8" />
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "10px",
              fontSize: "12px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value) => [value, ""]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-foreground">{total}</span>
        <span className="text-xs text-foreground-muted">
          {total === 1 ? "course" : "courses"}
        </span>
      </div>
    </div>
  );
}
