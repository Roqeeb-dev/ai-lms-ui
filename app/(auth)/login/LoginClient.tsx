"use client";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import { auth } from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";

import type { User } from "@/types/user";
import type { AuthResponse } from "@/services/authService";
import { LoadingDots } from "@/components/LoadingDots";

type LoginDetails = Pick<User, "email" | "password">;

export type AuthState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: AuthResponse }
  | { state: "error"; error: any };

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({ state: "idle" });

  const router = useRouter();
  const { values, update, reset } = useForm<LoginDetails>({
    email: "",
    password: "",
  });
  const setUser = useUserStore((state) => state.setUser);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setAuthState({ state: "loading" });

    try {
      const data = await auth.login(values);
      setAuthState({ state: "success", data });
      setUser(data.user);
      reset();
      router.replace(`/dashboard/${data.user.role}`);
    } catch (err: any) {
      setAuthState({ state: "error", error: err });
      console.error("Login failed:", err.message || err);
    }
  }

  return (
    <div className="w-full max-w-md px-5 pt-10 pb-8 lg:p-6 flex flex-col gap-8 lg:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 lg:gap-1.5">
        <h1 className="text-2xl lg:text-xl font-bold text-foreground tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-foreground-muted">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Google OAuth */}
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-3 py-3 lg:py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-foreground-muted">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            Email
          </label>
          <input
            type="email"
            placeholder="ada@cognify.com"
            name="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-3 lg:py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              name="password"
              value={values.password}
              onChange={(e) => update("password", e.target.value)}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={authState.state === "loading"}
          className="w-full mt-1 rounded-lg bg-primary text-primary-foreground px-3 py-3 lg:py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
        >
          {authState.state === "loading" ? (
            <LoadingDots text="Logging you in" />
          ) : (
            "Log in"
          )}
        </button>

        {authState.state === "error" && (
          <p className="text-red-500 text-sm">
            {authState.error?.message || "Login failed."}
          </p>
        )}
      </form>

      {/* Terms */}
      <p className="text-xs text-foreground-muted text-center leading-relaxed">
        By logging in you agree to our{" "}
        <Link
          href="/terms"
          className="text-primary hover:underline underline-offset-4"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-primary hover:underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
