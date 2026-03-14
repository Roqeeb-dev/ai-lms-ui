"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Mail } from "lucide-react";
import Link from "next/link";
import { auth } from "@/services/authService";

export default function VerifyClient() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    async function verify() {
      if (!token) {
        setError("Invalid or missing verification token.");
        setLoading(false);
        return;
      }

      try {
        await auth.verifyEmail({ token });
        setSuccess(true);
      } catch (err: any) {
        setError(
          err.message || "Failed to verify your account. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, []);

  async function handleResend() {
    setLoading(true);
    setError("");
    try {
      if (user?.email) {
        await auth.resetVerification({ email: user.email });
        setResent(true);
        setTimeout(() => setResent(false), 3000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to resend email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-6 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Mail className="text-yellow-800" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {loading
            ? "Verifying your account..."
            : success
              ? "Account verified!"
              : "Check your inbox"}
        </h1>
        <p className="text-sm text-foreground-muted leading-relaxed">
          {loading
            ? "Please wait while we confirm your email."
            : success
              ? "Your account has been successfully verified. You can now log in."
              : `We sent a verification link to ${user?.email ?? "your email address"}. Click the link to activate your account.`}
        </p>
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {!success && (
        <div className="flex flex-col gap-3">
          <button
            onClick={handleResend}
            disabled={loading || resent}
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading
              ? "Sending..."
              : resent
                ? "Link sent ✓"
                : "Resend verification email"}
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
      )}

      {!loading && success && (
        <Link
          href="/login"
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200"
        >
          Go to login
        </Link>
      )}
    </div>
  );
}
