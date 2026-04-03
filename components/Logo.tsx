"use client";

import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export default function Logo({
  className = "",
  size = "md",
  variant = "full",
}: LogoProps) {
  const sizeConfig = {
    sm: { text: "text-base", icon: "text-sm", dot: "w-1.5 h-1.5" },
    md: { text: "text-lg", icon: "text-base", dot: "w-2 h-2" },
    lg: { text: "text-2xl", icon: "text-xl", dot: "w-2.5 h-2.5" },
  };
  const router = useRouter();

  const { text, icon, dot } = sizeConfig[size];

  if (variant === "icon") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span
          className={`${icon} font-black text-primary tracking-tight leading-none`}
        >
          C
        </span>
        <div
          className={`${dot} rounded-full bg-primary ml-0.5 mb-0.5 shrink-0`}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push("/")}
      className={`flex items-center gap-0 select-none ${className}`}
    >
      {/* Icon mark */}
      <div className="relative flex items-center justify-center mr-1.5">
        <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center shadow-sm">
          <span className="text-xs font-black text-primary-foreground leading-none">
            C
          </span>
        </div>
      </div>

      {/* Wordmark */}
      <span
        className={`${text} font-bold tracking-tight leading-none uppercase`}
      >
        <span className="text-foreground">cogni</span>
        <span className="text-primary">fy</span>
      </span>
    </div>
  );
}
