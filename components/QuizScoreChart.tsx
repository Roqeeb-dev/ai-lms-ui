"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

interface Props {
  bestScores: number[];
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-card px-3 py-2 shadow-md">
      <span className="text-xs font-semibold text-foreground">
        Quiz {payload[0]?.payload?.label}
      </span>
      <span className="text-xs text-foreground-muted">
        Best score: {payload[0]?.value ?? 0}%
      </span>
    </div>
  );
}

function getBarColor(score: number) {
  if (score >= 80) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#f87171";
}

export default function QuizScoreChart({ bestScores }: Props) {
  if (!bestScores.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] gap-2">
        <span className="text-2xl opacity-20">🎯</span>
        <span className="text-xs text-foreground-muted">
          No quiz attempts yet
        </span>
      </div>
    );
  }

  const data = bestScores.map((score, idx) => ({
    label: idx + 1,
    score: Math.round(score),
  }));

  return (
    <div className="flex flex-col gap-3">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          barCategoryGap="35%"
          margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
        >
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `Q${v}`}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            width={32}
          />
          {/* Passing score reference line */}
          <ReferenceLine
            y={50}
            stroke="hsl(var(--border))"
            strokeDasharray="4 4"
            label={{
              value: "Pass",
              position: "insideTopRight",
              fontSize: 9,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "hsl(var(--muted))" }}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={getBarColor(entry.score)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Score legend */}
      <div className="flex items-center justify-center gap-4 pt-1 border-t border-border">
        {[
          { color: "#10b981", label: "80%+ great" },
          { color: "#f59e0b", label: "50–79% pass" },
          { color: "#f87171", label: "Below 50%" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: color }}
            />
            <span className="text-[10px] text-foreground-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
