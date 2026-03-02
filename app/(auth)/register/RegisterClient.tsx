"use client";

import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import { auth } from "@/lib/authService";
import Link from "next/link";

import type { Role } from "@/types/user";
import type { User } from "@/types/user";

type RegisterDetails = Pick<User, "fullname" | "email" | "password" | "role">;

export default function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { values, update, reset } = useForm<RegisterDetails>({
    fullname: "",
    email: "",
    password: "",
    role: "student",
  });

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await auth.register(values);
      console.log("Registered user:", data.user);
      reset();
      router.push("/onboarding");
    } catch (err: any) {
      console.error("Registration failed:", err.message || err);
      alert("Registration failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md lg:p-6 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
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

      {/* Google OAuth */}
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Role */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            I am a
          </label>
          <div className="grid grid-cols-2 rounded-lg border border-border bg-card p-1 gap-1">
            {(["student", "teacher"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => update("role", r)}
                className={`py-2 rounded-md text-sm font-semibold capitalize transition-all duration-200 ${
                  values.role === r
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
          <label className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Ada Lovelace"
            name="fullname"
            value={values.fullname}
            onChange={(e) => update("fullname", e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
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
            className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
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
              className="w-full rounded-lg border border-border bg-input px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
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
          disabled={loading}
          className="w-full mt-1 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          {loading ? "Creating your account" : "Create account"}
        </button>
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
