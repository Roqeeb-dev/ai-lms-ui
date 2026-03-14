"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "@/services/authService";
import { LoadingDots } from "@/components/LoadingDots";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await auth.forgotPassword({ email });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-6">
      {submitted ? (
        <div className="flex flex-col gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Check your inbox
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed">
              We sent a password reset link to{" "}
              <span className="text-foreground font-medium">{email}</span>. It
              may take a minute to arrive.
            </p>
          </div>
          <p className="text-xs text-foreground-muted">
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Try again
            </button>
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Forgot your password?
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Enter your email and we'll send you a link to reset it.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
                Email
              </label>
              <input
                type="email"
                placeholder="ada@cognify.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold
                         hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              {loading ? <LoadingDots text="Sending" /> : "Send reset link"}
            </button>
          </form>

          {/* Back to login */}
          <p className="text-sm text-foreground-muted text-center">
            Remembered it?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline underline-offset-4"
            >
              Back to login
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
