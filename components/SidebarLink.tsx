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
      className={`relative flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 group
        ${
          active
            ? "text-foreground bg-muted"
            : "text-foreground-muted hover:text-foreground hover:bg-muted/60"
        }`}
    >
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full bg-primary transition-all duration-200
          ${active ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
        `}
      />

      <Icon
        size={16}
        className={`shrink-0 transition-colors ${
          active
            ? "text-primary"
            : "text-foreground-muted group-hover:text-foreground"
        }`}
      />

      <span
        className={`transition-all duration-200 whitespace-nowrap overflow-hidden
          ${open ? "opacity-100 ml-0" : "opacity-0 -ml-2 w-0"}
        `}
      >
        {label}
      </span>
    </Link>
  );
}
