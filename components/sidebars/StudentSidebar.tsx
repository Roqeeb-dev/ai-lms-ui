"use client";

import {
  Home,
  BookOpen,
  Compass,
  ClipboardList,
  BarChart2,
  User,
  Settings,
} from "lucide-react";
import SidebarLink from "../SidebarLink";
import Logo from "@/components/Logo";

interface SidebarProps {
  mobileOpen: boolean;
  desktopPinned: boolean;
  onMobileClose: () => void;
}

const links = [
  { href: "/dashboard/student", label: "Dashboard", icon: Home },
  { href: "/dashboard/student/courses", label: "My Courses", icon: BookOpen },
  {
    href: "/dashboard/student/browse",
    label: "Explore Courses",
    icon: Compass,
  },
  { href: "/dashboard/student/quizzes", label: "Quizzes", icon: ClipboardList },
  { href: "/dashboard/student/progress", label: "Progress", icon: BarChart2 },
];

const bottomLinks = [
  { href: "/dashboard/student/profile", label: "Profile", icon: User },
  { href: "/dashboard/student/settings", label: "Settings", icon: Settings },
];

export default function StudentSidebar({
  mobileOpen,
  desktopPinned,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0 w-56" : "-translate-x-full w-56"}
          md:translate-x-0
          md:relative md:inset-auto md:z-auto
          ${desktopPinned ? "md:w-56" : "md:w-[60px]"}
        `}
      >
        {/* Logo */}
        <div
          className={`h-14 flex items-center shrink-0 border-b border-border px-4 ${
            desktopPinned ? "justify-start" : "md:justify-center"
          }`}
        >
          {desktopPinned ? (
            <Logo />
          ) : (
            <>
              <span className="text-primary font-bold text-base md:block hidden">
                C
              </span>
              <div className="md:hidden">
                <Logo />
              </div>
            </>
          )}
        </div>

        {/* Main Nav */}
        <nav className="flex-1 flex flex-col gap-0.5 px-2 py-4 overflow-y-auto">
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              {...link}
              open={mobileOpen || desktopPinned}
            />
          ))}
        </nav>

        {/* Bottom Nav */}
        <div className="px-2 py-3 border-t border-border flex flex-col gap-0.5">
          {bottomLinks.map((link) => (
            <SidebarLink
              key={link.href}
              {...link}
              open={mobileOpen || desktopPinned}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
