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
              aria-label="Toggle theme"
              className="relative flex items-center w-14 h-8 rounded-full px-1 bg-muted/70 backdrop-blur-md border border-border/60 transition-all duration-300 ease-out hover:bg-muted"
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-background shadow-sm flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
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
          )}

          <Button variant="secondary" text="Login" href="/login" />
          <Button variant="primary" text="Sign Up" href="/register" />
        </div>
      </div>
    </header>
  );
}
