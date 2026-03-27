"use client";

import { PanelLeft, PanelLeftClose, Sun, Moon } from "lucide-react";
import UserMenu from "./UserMenu";
import { PublicUser } from "@/types/user";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export type TopbarUser = PublicUser;

interface DashboardTopbarProps {
  user: TopbarUser;
  pageTitle: string;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

export default function DashboardTopbar({
  user,
  pageTitle,
  onSidebarToggle,
  sidebarOpen,
}: DashboardTopbarProps) {
  const { theme, toggleTheme } = useThemeStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 gap-4">
      {/* Left */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <button
          onClick={onSidebarToggle}
          className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-all duration-200 shrink-0"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <PanelLeftClose size={17} /> : <PanelLeft size={17} />}
        </button>

        <div className="h-4 w-px bg-border mx-1 shrink-0" />

        <h1 className="text-sm font-semibold text-foreground truncate">
          {pageTitle}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {mounted && (
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background-subtle hover:bg-muted transition-all duration-300"
            aria-label="Toggle theme"
          >
            {/* Sun */}
            <Sun
              size={16}
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "light"
                  ? "opacity-100 scale-100 rotate-0 translate-y-0"
                  : "opacity-0 scale-75 -rotate-45 translate-y-1"
              }`}
            />

            <Moon
              size={16}
              className={`absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                theme === "dark"
                  ? "opacity-100 scale-100 rotate-0 translate-y-0"
                  : "opacity-0 scale-75 rotate-45 -translate-y-1"
              }`}
            />
          </button>
        )}

        <UserMenu user={user} />
      </div>
    </header>
  );
}
