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
            aria-label="Toggle theme"
            className="relative flex items-center w-14 h-8 rounded-full px-1 bg-muted/70 backdrop-blur-md border border-border/60 transition-all duration-300 ease-out hover:bg-muted"
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-background shadow-sm flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
            >
              {theme === "light" ? (
                <Sun size={12} className="text-yellow-500" />
              ) : (
                <Moon size={12} className="text-blue-400" />
              )}
            </div>

            <div className="flex justify-between w-full px-1.5 text-foreground-muted">
              <Sun size={12} className="opacity-60" />
              <Moon size={12} className="opacity-60" />
            </div>
          </button>
        )}

        <UserMenu user={user} />
      </div>
    </header>
  );
}
