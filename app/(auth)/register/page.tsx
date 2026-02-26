"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

type Role = "student" | "teacher";

const stats = [
  { value: "10,000+", label: "Active learners" },
  { value: "94%", label: "Completion rate" },
  { value: "4.9/5", label: "Average rating" },
];

const quotes = [
  {
    text: "I retained more from one Cognify course than a full semester of lectures.",
    author: "James W., Cloud Architect",
  },
  {
    text: "The AI tutor explains things in ways my professors never could.",
    author: "Amara O., Medical Student",
  },
  {
    text: "Completion rates went from 61% to 94% in two months.",
    author: "Marcus R., L&D Manager",
  },
];

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [quoteIndex] = useState(() =>
    Math.floor(Math.random() * quotes.length),
  );
  const quote = quotes[quoteIndex];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left: Brand panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between bg-primary px-14 py-12 relative overflow-hidden">
        {/* Dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff33 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radial glow */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #F5A623 0%, transparent 65%)",
          }}
        />

        {/* Logo */}
        <div className="relative">
          <Logo />
        </div>

        {/* Center content */}
        <div className="relative flex flex-col gap-10">
          {/* Quote */}
          <div className="flex flex-col gap-4">
            <div className="w-8 h-0.5 bg-accent" />
            <p className="text-2xl font-semibold text-white leading-snug">
              "{quote.text}"
            </p>
            <p className="text-sm text-white/70">{quote.author}</p>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-extrabold text-white">
                  {s.value}
                </span>
                <span className="text-xs text-white/60">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="relative text-xs text-white/40">
          © {new Date().getFullYear()} Cognify. Free to start, built to last.
        </p>
      </div>

      {/* ── Right: Form panel ─────────────────────────────────────────── */}
      <div className="flex flex-col justify-center items-center bg-background px-6 py-12">
        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <Logo />
          </div>

          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold text-foreground">
              Create your account
            </h1>
            <p className="text-sm text-foreground-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Google OAuth */}
          <div className="flex flex-col gap-4">
            <button className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-foreground-muted">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Role toggle */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                I am a
              </label>
              <div className="grid grid-cols-2 rounded-lg border border-border bg-card p-1 gap-1">
                {(["student", "teacher"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                      role === r
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {r === "student" ? "Student" : "Teacher"}
                  </button>
                ))}
              </div>
            </div>

            {/* Full name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Ada Lovelace"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                Email
              </label>
              <input
                type="email"
                placeholder="ada@cognify.com"
                className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-foreground-muted uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm mt-1"
            >
              Create account
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-foreground-muted text-center leading-relaxed">
            By signing up you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
