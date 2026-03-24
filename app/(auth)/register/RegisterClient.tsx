"use client";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import Link from "next/link";
import { LoadingDots } from "@/components/LoadingDots";
import { useUser } from "@/hooks/useUser";
import { ROLES } from "@/types/roles";
import type { User, Role } from "@/types/user";

type RegisterDetails = Pick<User, "name" | "email" | "password" | "role">;

export default function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, registering, error } = useUser();
  const router = useRouter();

  const { values, update, reset } = useForm<RegisterDetails>({
    name: "",
    email: "",
    password: "",
    role: ROLES.STUDENT as Role,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await registerUser(values);
      reset();
      router.push("/verify-email");
    } catch {}
  }

  return (
    <div className="w-full max-w-md px-5 pt-10 pb-8 lg:p-6 flex flex-col gap-8 lg:gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 lg:gap-1.5">
        <h1 className="text-2xl lg:text-xl font-bold text-foreground tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-foreground-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-4">
        {/* Role selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            I am {values.role === "student" ? "a" : "an"}
          </label>
          <div className="grid grid-cols-2 rounded-lg border border-border bg-card p-1 gap-1">
            {[ROLES.STUDENT, ROLES.INSTRUCTOR].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => update("role", r as Role)}
                className={`py-2.5 lg:py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                  values.role === r
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {r === ROLES.STUDENT ? "Student" : "Instructor"}
              </button>
            ))}
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Ada Lovelace"
            name="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            className="w-full rounded-lg border border-border bg-input px-3 py-3 lg:py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
            required
          />
        </div>

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
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              name="password"
              value={values.password}
              minLength={8}
              onChange={(e) => update("password", e.target.value)}
              autoComplete="new-password"
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

        <button
          type="submit"
          disabled={registering}
          className="w-full mt-1 rounded-lg bg-primary text-primary-foreground px-3 py-3 lg:py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
        >
          {registering ? (
            <LoadingDots text="Creating your account" />
          ) : (
            "Create account"
          )}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* Terms */}
      <p className="text-xs text-foreground-muted text-center leading-relaxed">
        By signing up you agree to our{" "}
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
