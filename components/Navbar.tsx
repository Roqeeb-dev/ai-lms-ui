"use client";

import Logo from "./Logo";
import Button from "./Button";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export const links = [
  { text: "Home", to: "" },
  { text: "Features", to: "features" },
  { text: "Testimonials", to: "testimonials" },
  { text: "Pricing", to: "pricing" },
  { text: "How it works", to: "how-it-works" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo size="md" />

        <nav className="hidden md:flex items-center gap-5">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.to}`}
              className="relative text-sm font-medium text-foreground-muted transition-colors duration-200 hover:text-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.text}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background-subtle hover:bg-muted transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              aria-label="Toggle theme"
            >
              {/* Sun */}
              <Sun
                size={16}
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  theme === "light"
                    ? "opacity-100 scale-100 rotate-0 translate-y-0"
                    : "opacity-0 scale-75 -rotate-45 translate-y-1"
                }`}
              />

              {/* Moon */}
              <Moon
                size={16}
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  theme === "dark"
                    ? "opacity-100 scale-100 rotate-0 translate-y-0"
                    : "opacity-0 scale-75 rotate-45 -translate-y-1"
                }`}
              />
            </button>
          )}

          <Button variant="secondary" text="Login" href="/login" />
          <Button variant="primary" text="Sign Up" href="/register" />
        </div>
      </div>
    </header>
  );
}
