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

export default function InstructorSidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`shrink-0 h-full bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out ${
        open ? "w-56" : "w-[60px]"
      }`}
    >
      {/* Logo */}
      <div
        className={`h-14 flex items-center shrink-0 border-b border-border px-4 ${
          open ? "justify-start" : "justify-center"
        }`}
      >
        {open ? (
          <Logo />
        ) : (
          <span className="text-primary font-bold text-base">C</span>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-2 py-4 overflow-y-auto">
        {links.map((link) => (
          <SidebarLink key={link.href} {...link} open={open} />
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="px-2 py-3 border-t border-border flex flex-col gap-0.5">
        {bottomLinks.map((link) => (
          <SidebarLink key={link.href} {...link} open={open} />
        ))}
      </div>
    </aside>
  );
}
