"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import Link from "next/link";
import { LoadingDots } from "@/components/LoadingDots";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface ResetDetails {
  password: string;
  confirmPassword: string;
}

export default function ResetClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resetDetails, setResetDetails] = useState<ResetDetails>({
    password: "",
    confirmPassword: "",
  });

  const { resetPassword, resettingPassword, error } = useUser();
  const params = useParams<{ token: string }>();
  const token = params.token;
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setResetDetails((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const passwordsMatch =
    resetDetails.confirmPassword === "" ||
    resetDetails.password === resetDetails.confirmPassword;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!passwordsMatch) return;
    if (!token) return;

    try {
      await resetPassword(token, resetDetails.password);
      setSubmitted(true);
    } catch {}
  }

  return (
    <div className="w-full max-w-md px-5 pt-10 pb-8 lg:p-6 flex flex-col gap-8 lg:gap-6">
      {submitted ? (
        <div className="flex flex-col gap-6 lg:gap-4 text-center">
          <div className="w-16 h-16 lg:w-12 lg:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Check className="text-primary" size={22} />
          </div>
          <div className="flex flex-col gap-2 lg:gap-1.5">
            <h1 className="text-2xl lg:text-xl font-bold text-foreground tracking-tight">
              Password reset
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Your password has been updated successfully. You can now log in
              with your new password.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full rounded-lg bg-primary text-primary-foreground px-3 py-3 lg:py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm text-center"
          >
            Back to login
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 lg:gap-1.5">
            <h1 className="text-2xl lg:text-xl font-bold text-foreground tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Choose a strong new password for your account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 lg:gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  name="password"
                  value={resetDetails.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-input px-3 py-3 lg:py-2 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  name="confirmPassword"
                  value={resetDetails.confirmPassword}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-input px-3 py-3 lg:py-2 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 ${
                    passwordsMatch
                      ? "border-border focus:border-input-focus"
                      : "border-destructive focus:ring-destructive"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {!passwordsMatch && (
                <p className="text-xs text-destructive">
                  Passwords do not match.
                </p>
              )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={!passwordsMatch || resettingPassword}
              className="w-full rounded-lg bg-primary text-primary-foreground px-3 py-3 lg:py-2 text-sm font-semibold hover:bg-primary-hover active:scale-95 active:brightness-95 active:shadow-sm transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
            >
              {resettingPassword ? (
                <LoadingDots text="Resetting" />
              ) : (
                "Reset password"
              )}
            </button>
          </form>

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
