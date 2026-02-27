"use client";

import { Home, School, Users, BookOpen, Settings, User } from "lucide-react";
import SidebarLink from "../SidebarLink";
import Logo from "@/components/Logo";

const links = [
  { href: "/dashboard/teacher", label: "Home", icon: Home },
  { href: "/dashboard/teacher/classrooms", label: "Classrooms", icon: School },
  { href: "/dashboard/teacher/students", label: "Students", icon: Users },
  { href: "/dashboard/teacher/courses", label: "Courses", icon: BookOpen },
];

const bottomLinks = [
  { href: "/dashboard/teacher/profile", label: "Profile", icon: User },
  { href: "/dashboard/teacher/settings", label: "Settings", icon: Settings },
];

export default function TeacherSidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`shrink-0 h-full bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${open ? "w-60" : "w-16"}`}
    >
      <div
        className={`h-16 flex items-center border-b border-border px-4 shrink-0 ${open ? "justify-start" : "justify-center"}`}
      >
        {open ? (
          <Logo />
        ) : (
          <span className="text-primary font-extrabold text-lg">C</span>
        )}
      </div>
      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        {links.map((link) => (
          <SidebarLink key={link.href} {...link} open={open} />
        ))}
      </nav>
      <div className="p-3 border-t border-border flex flex-col gap-1">
        {bottomLinks.map((link) => (
          <SidebarLink key={link.href} {...link} open={open} />
        ))}
      </div>
    </aside>
  );
}
