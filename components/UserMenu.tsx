"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut, ChevronDown, User2 } from "lucide-react";
import { TopbarUser } from "./DashboardTopbar";
import Link from "next/link";
import Dialog from "./Dialog";
import { useUser } from "@/hooks/useUser";

export default function UserMenu({ user }: { user: TopbarUser }) {
  const [open, setOpen] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logoutUser, loggingOut } = useUser();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileHref = `/dashboard/${user.role}/profile`;
  const settingsHref = `/dashboard/${user.role}/settings`;

  async function handleLogout() {
    try {
      await logoutUser();
      setIsDialogShown(false);
      router.replace("/login");
    } catch {
      // error toast already handled in the hook
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-muted transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground shrink-0">
          {initials}
        </div>
        <div className="hidden md:flex flex-col items-start leading-none gap-0.5">
          <span className="text-sm font-semibold text-foreground">
            {user.name}
          </span>
          <span className="text-xs text-foreground-muted capitalize">
            {user.role}
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`hidden md:block text-foreground-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-card shadow-md py-1 z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-border-subtle">
            <p className="text-sm font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-foreground-muted truncate">
              {user.email}
            </p>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              href={profileHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
            >
              <User2 size={14} className="text-foreground-muted" /> Profile
            </Link>
            <Link
              href={settingsHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
            >
              <Settings size={14} className="text-foreground-muted" /> Settings
            </Link>
          </div>

          <div className="border-t border-border-subtle py-1">
            <button
              onClick={() => {
                setIsDialogShown(true);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors duration-150 w-full text-left"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>
      )}

      <Dialog
        type="confirm"
        open={isDialogShown}
        onClose={() => !loggingOut && setIsDialogShown(false)}
        title="Log out"
        message="Are you sure you want to log out?"
        confirmText="Yes, Log out"
        cancelText="Cancel"
        onConfirm={handleLogout}
        loading={loggingOut}
      />
    </div>
  );
}
