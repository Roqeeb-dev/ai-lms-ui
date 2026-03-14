"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function VerifyClient() {
  const user = useUserStore((state) => state.user);
  const [resent, setResent] = useState(false);

  function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-6 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Mail className="text-yellow-800" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Check your inbox
        </h1>
        <p className="text-sm text-foreground-muted leading-relaxed">
          We sent a verification link to{" "}
          {user?.email ? (
            <span className="font-semibold text-foreground">{user.email}</span>
          ) : (
            "your email address"
          )}
          . Click the link to activate your account.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleResend}
          disabled={resent}
          className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:pointer-events-none"
        >
          {resent ? "Link sent ✓" : "Resend verification email"}
        </button>

        <p className="text-xs text-foreground-muted">
          Wrong email?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Go back and update it
          </Link>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-foreground-muted">already verified?</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Link
        href="/login"
        className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200"
      >
        Go to login
      </Link>
    </div>
  );
}
