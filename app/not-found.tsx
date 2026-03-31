"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-primary/8 blur-3xl animate-pulse"
        style={{ animationDuration: "6s", animationDelay: "1s" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-2xl animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "2s" }}
      />

      <span
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center text-[20vw] font-black text-foreground/[0.03] leading-none tracking-tighter"
        aria-hidden
      >
        404
      </span>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-md w-full">
        {/* Icon badge */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 shadow-sm">
          <BookOpen size={28} className="text-primary" />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-foreground-muted leading-relaxed mt-1">
            Looks like this lesson doesn't exist — or was moved. Let's get you
            back on track.
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-border" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <Home size={15} />
            Go Home
          </Link>
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-all duration-200"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>

        {/* Helpful links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2">
          {[
            { label: "Browse Courses", href: "/dashboard/student/browse" },
            { label: "My Learning", href: "/dashboard/student/courses" },
            { label: "Dashboard", href: "/dashboard" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs text-foreground-muted hover:text-primary underline-offset-4 hover:underline transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
