"use client";

import Link from "next/link";
import { Sun, Moon, X } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { links } from "./Navbar";

interface DropdownProps {
  open: boolean;
  onClose: () => void;
}

export function NavDropdown({ open, onClose }: DropdownProps) {
  const { theme, toggleTheme } = useThemeStore();

  if (!open) return null;

  return (
    <>
      <div className="fixed top-16 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.to}`}
                onClick={onClose}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground-muted hover:text-primary hover:bg-primary/5 transition-all duration-150"
              >
                {link.text}
              </a>
            ))}
          </nav>

          <div className="h-px bg-border" />

          <div className="flex items-center justify-between px-3 py-1">
            <span className="text-sm font-medium text-foreground-muted">
              {theme === "light" ? "Light mode" : "Dark mode"}
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex items-center w-14 h-8 rounded-full px-1 bg-muted/70 border border-border/60 transition-all duration-300 hover:bg-muted"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-background shadow-sm flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {theme === "light" ? (
                  <Sun size={12} className="text-yellow-500" />
                ) : (
                  <Moon size={12} className="text-blue-400" />
                )}
              </div>
              <div className="flex justify-between w-full px-1.5 text-foreground-muted">
                <Sun size={12} className="opacity-60" />
                <Moon size={12} className="opacity-60" />
              </div>
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* CTA buttons */}
          <div className="flex flex-col gap-2 pb-1">
            <Link
              href="/login"
              onClick={onClose}
              className="w-full text-center py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors duration-150"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              className="w-full text-center py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors duration-150"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
