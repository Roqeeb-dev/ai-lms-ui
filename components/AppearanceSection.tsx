"use client";

import SectionCard from "./SectionCard";
import { Sun, Moon, Check } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function AppearanceSection() {
  const { theme, setTheme } = useThemeStore();

  return (
    <SectionCard
      title="Appearance"
      description="Choose how Cognify looks for you."
    >
      <div className="grid grid-cols-2 gap-3">
        {(["light", "dark"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
              theme === t
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary/40"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                t === "light"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {t === "light" ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm font-semibold text-foreground capitalize">
                {t} mode
              </span>
              <span className="text-xs text-foreground-muted">
                {t === "light"
                  ? "Default, warm and clear"
                  : "Easy on the eyes at night"}
              </span>
            </div>
            {theme === t && (
              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                <Check size={12} /> Active
              </span>
            )}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
