"use client";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import { auth } from "@/services/authService";
import type { AuthResponse } from "@/services/authService";
import Link from "next/link";
import { LoadingDots } from "@/components/LoadingDots";

import { useUserStore } from "@/store/useUserStore";
import { ROLES } from "@/types/roles";

import type { User, Role } from "@/types/user";

type RegisterDetails = Pick<User, "name" | "email" | "password" | "role">;

type RegisterState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: AuthResponse }
  | { state: "error"; error: any };

export default function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [authState, setAuthState] = useState<RegisterState>({ state: "idle" });

  const { values, update, reset } = useForm<RegisterDetails>({
    name: "",
    email: "",
    password: "",
    role: ROLES.STUDENT as Role, // default
  });

  const { setUser } = useUserStore();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthState({ state: "loading" });

    try {
      const data = await auth.register(values);
      setAuthState({ state: "success", data });
      setUser(data.user);
      reset();
      router.push("/verify-email");
    } catch (err: any) {
      setAuthState({ state: "error", error: err });
      alert("Registration failed: " + (err.message || "Unknown error"));
    }
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

      {/* OAuth */}
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-4">
        {/* Role selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            I am a
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
          disabled={authState.state === "loading"}
          className="w-full mt-1 rounded-lg bg-primary text-primary-foreground px-3 py-3 lg:py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-primary"
        >
          {authState.state === "loading" ? (
            <LoadingDots text="Creating your account" />
          ) : (
            "Create account"
          )}
        </button>

        {authState.state === "error" && (
          <p className="text-red-500 text-sm mt-2">
            {authState.error?.message || "Registration failed."}
          </p>
        )}
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
