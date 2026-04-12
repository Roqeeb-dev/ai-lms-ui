"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Sparkles size={32} className="text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
            <Clock size={12} className="text-accent-foreground" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Coming Soon
            </span>
          </div>
          <h1 className="text-3xl font-black text-foreground leading-tight">
            We're building
            <br />
            <span className="text-primary">something great.</span>
          </h1>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-xs mx-auto">
            This feature is currently in development and will be available in a
            future update. Check back soon.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full max-w-xs">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-bold text-foreground">
            cogni<span className="text-primary">fy</span>
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
