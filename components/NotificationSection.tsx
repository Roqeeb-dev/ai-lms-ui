"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";

export default function NotificationsSection() {
  const [prefs, setPrefs] = useState({
    courseUpdates: true,
    aiTutorReplies: true,
    weeklyDigest: false,
    promotions: false,
  });

  function Toggle({
    enabled,
    onChange,
    label,
    description,
  }: {
    enabled: boolean;
    onChange: (v: boolean) => void;
    label: string;
    description?: string;
  }) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {description && (
            <span className="text-xs text-foreground-muted">{description}</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange(!enabled)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 ${enabled ? "bg-primary" : "bg-muted border border-border"}`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${enabled ? "left-5" : "left-0.5"}`}
          />
        </button>
      </div>
    );
  }

  const items = [
    {
      key: "courseUpdates",
      label: "Course updates",
      description: "New lessons and announcements from your courses",
    },
    {
      key: "aiTutorReplies",
      label: "AI Tutor replies",
      description: "Responses and follow-ups from your AI tutor",
    },
    {
      key: "weeklyDigest",
      label: "Weekly digest",
      description: "A summary of your learning activity each week",
    },
    {
      key: "promotions",
      label: "Promotions & offers",
      description: "New courses, discounts, and platform news",
    },
  ] as const;

  return (
    <SectionCard
      title="Notifications"
      description="Choose what you want to be notified about."
    >
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Toggle
            key={item.key}
            label={item.label}
            description={item.description}
            enabled={prefs[item.key]}
            onChange={(v) => setPrefs((prev) => ({ ...prev, [item.key]: v }))}
          />
        ))}
      </div>
    </SectionCard>
  );
}
