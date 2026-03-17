"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Mail, Check } from "lucide-react";
import Link from "next/link";
import { auth } from "@/services/authService";

export default function VerifyClient() {
  const user = useUserStore((state) => state.user);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token.trim()) return;
    setLoading(true);
    setError("");

    try {
      await auth.verifyEmail({ token });
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.message || "Invalid token. Please check your email and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!user?.email) return;
    setLoading(true);
    setError("");
    try {
      await auth.resetVerification({ email: user.email });
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to resend. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-input px-4 py-3 lg:py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200 tracking-widest text-center font-mono";

  if (success) {
    return (
      <div className="w-full max-w-md px-5 pt-10 pb-8 lg:p-6 flex flex-col gap-6 text-center">
        <div className="w-16 h-16 lg:w-14 lg:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
          <Check className="text-primary" size={24} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl lg:text-xl font-bold text-foreground tracking-tight">
            Account verified!
          </h1>
          <p className="text-sm text-foreground-muted leading-relaxed">
            Your email has been successfully verified. You can now log in to
            your account.
          </p>
        </div>
        <Link
          href="/login"
          className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 lg:py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm text-center"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md px-5 pt-10 pb-8 lg:p-6 flex flex-col gap-8 lg:gap-6 text-center">
      {/* Icon */}
      <div className="w-16 h-16 lg:w-14 lg:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Mail className="text-primary" size={24} />
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl lg:text-xl font-bold text-foreground tracking-tight">
          Check your inbox
        </h1>
        <p className="text-sm text-foreground-muted leading-relaxed">
          We sent a verification code to{" "}
          {user?.email ? (
            <span className="font-semibold text-foreground">{user.email}</span>
          ) : (
            "your email address"
          )}
          . Enter it below to activate your account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-3">
        <input
          type="text"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setError("");
          }}
          placeholder="Enter verification code"
          className={inputClass}
          maxLength={64}
          required
        />
        {error && (
          <p className="text-xs text-destructive font-medium">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !token.trim()}
          className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 lg:py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:pointer-events-none"
        >
          {loading ? "Verifying..." : "Verify email"}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-foreground-muted">
          didn't receive it?
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col gap-3 lg:gap-2">
        <button
          type="button"
          onClick={handleResend}
          disabled={loading || resent}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 lg:py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none"
        >
          {resent ? "Code sent ✓" : "Resend verification code"}
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
    </div>
  );
}
