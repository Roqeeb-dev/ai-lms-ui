"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";
import UserMenu from "./UserMenu";
import { PublicUser } from "@/types/user";

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
        <UserMenu user={user} />
      </div>
    </header>
  );
}
