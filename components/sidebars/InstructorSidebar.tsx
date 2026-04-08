"use client";

import {
  Home,
  BookOpen,
  Users,
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
  { href: "/dashboard/instructor", label: "Dashboard", icon: Home },
  {
    href: "/dashboard/instructor/courses",
    label: "My Courses",
    icon: BookOpen,
  },
  { href: "/dashboard/instructor/students", label: "Students", icon: Users },
  {
    href: "/dashboard/instructor/quizzes",
    label: "Quizzes",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/instructor/analytics",
    label: "Analytics",
    icon: BarChart2,
  },
];

const bottomLinks = [
  { href: "/dashboard/instructor/profile", label: "Profile", icon: User },
  { href: "/dashboard/instructor/settings", label: "Settings", icon: Settings },
];

export default function InstructorSidebar({
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

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border
          transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0 w-60" : "-translate-x-full w-60"}
          md:translate-x-0 md:relative md:inset-auto md:z-auto
          ${desktopPinned ? "md:w-60" : "md:w-[60px]"}
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
              <span className="text-primary font-bold text-base hidden md:block">
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
