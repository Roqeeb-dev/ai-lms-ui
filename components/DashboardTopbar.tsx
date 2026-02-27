"use client";

import { Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";
import { Role } from "@/types/user";
import Link from "next/link";

export interface TopbarUser {
  fullname: string;
  email: string;
  role: Role;
  streak?: number;
  initials?: string;
}

interface DashboardTopbarProps {
  user: TopbarUser;
  pageTitle: string;
  notificationCount?: number;
  onSidebarToggle: () => void;
}

export default function DashboardTopbar({
  user,
  pageTitle,
  notificationCount = 0,
  onSidebarToggle,
}: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-background/90 backdrop-blur-md border-b border-border flex items-center px-4 gap-4">
      {/* Left */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-muted transition-all duration-200 shrink-0"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-sm font-semibold text-foreground truncate">
          {pageTitle}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Student streak */}
        {user.role === "student" &&
          user.streak !== undefined &&
          user.streak > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-lg px-3 py-1.5 mr-1">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-bold text-amber-600">
                {user.streak} day streak
              </span>
            </div>
          )}

        {/* Teacher — new classroom shortcut */}
        {user.role === "teacher" && (
          <Link
            href="/dashboard/teacher/classrooms/new"
            className="hidden sm:flex items-center gap-1.5 bg-secondary/10 border border-secondary/20 rounded-lg px-3 py-1.5 mr-1 text-xs font-semibold text-secondary hover:bg-secondary/20 transition-colors duration-200"
          >
            + New classroom
          </Link>
        )}

        <NotificationBell count={notificationCount} />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
