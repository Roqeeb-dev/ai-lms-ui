"use client";

import { Menu } from "lucide-react";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";
import { PublicUser } from "@/types/user";

export type TopbarUser = PublicUser;

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
    <header className="sticky top-0 z-40 w-full h-14 bg-background/90 backdrop-blur-md border-b border-border flex items-center px-4 gap-4">
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
        <NotificationBell count={notificationCount} />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
