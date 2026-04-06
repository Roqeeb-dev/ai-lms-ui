"use client";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useForm } from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import { LoadingDots } from "@/components/LoadingDots";
import { useUser } from "@/hooks/useUser";
import type { User } from "@/types/user";
import Logo from "@/components/Logo";

type LoginDetails = Pick<User, "email" | "password">;

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loggingIn, error } = useUser();
  const router = useRouter();

  const { values, update, reset } = useForm<LoginDetails>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = await loginUser(values);
      reset();
      router.replace(`/dashboard/${data.user.role}`);
    } catch {}
  }

  return (
    <div className="w-full max-w-md px-5 pt-10 pb-8 lg:p-6 flex flex-col gap-8 lg:gap-6">
      {/* Mobile Logo */}
      <div className="lg:hidden flex items-center justify-start">
        <Link href="/">
          <Logo />
        </Link>
      </div>

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
            autoComplete="email"
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
              autoComplete="current-password"
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
          disabled={loggingIn}
          className="w-full mt-1 rounded-lg bg-primary text-primary-foreground px-3 py-3 lg:py-2 text-sm font-semibold hover:bg-primary-hover active:scale-95 active:brightness-95 active:shadow-sm transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
        >
          {loggingIn ? <LoadingDots text="Logging you in" /> : "Log in"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
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
          href="/privacy-policy"
          className="text-primary hover:underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
