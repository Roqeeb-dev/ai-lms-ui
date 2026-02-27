"use client";

import {
  Home,
  Users,
  BookOpen,
  BarChart2,
  FileText,
  Settings,
  CreditCard,
} from "lucide-react";
import SidebarLink from "../SidebarLink";
import Logo from "@/components/Logo";

const links = [
  { href: "/dashboard/admin", label: "Home", icon: Home },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/admin/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/admin/billing", label: "Billing", icon: CreditCard },
];

const bottomLinks = [
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ open }: { open: boolean }) {
  return (
    <aside
      className={`shrink-0 h-full bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${open ? "w-60" : "w-16"}`}
    >
      {/* Logo */}
      <div
        className={`h-16 flex items-center border-b border-border px-4 shrink-0 ${open ? "justify-start" : "justify-center"}`}
      >
        {open ? (
          <Logo />
        ) : (
          <span className="text-primary font-extrabold text-lg">C</span>
        )}
      </div>

      {/* Main links */}
      <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
        {links.map((link) => (
          <SidebarLink key={link.href} {...link} open={open} />
        ))}
      </nav>

      {/* Bottom links */}
      <div className="p-3 border-t border-border flex flex-col gap-1">
        {bottomLinks.map((link) => (
          <SidebarLink key={link.href} {...link} open={open} />
        ))}
      </div>
    </aside>
  );
}
