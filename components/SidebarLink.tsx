"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  open: boolean;
}

export default function SidebarLink({
  href,
  label,
  icon: Icon,
  open,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      title={!open ? label : undefined}
      className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group
        ${
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground-muted hover:text-foreground hover:bg-muted"
        }`}
    >
      <Icon
        size={16}
        className={`shrink-0 transition-colors ${
          active
            ? "text-primary-foreground"
            : "text-foreground-muted group-hover:text-foreground"
        }`}
      />

      <span
        className={`transition-all duration-200 whitespace-nowrap overflow-hidden ${
          open ? "opacity-100 w-auto" : "opacity-0 w-0"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
