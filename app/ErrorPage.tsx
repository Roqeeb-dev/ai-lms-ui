"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, ArrowLeft, Home } from "lucide-react";
import Logo from "@/components/Logo";
import { useUserStore } from "@/store/useUserStore";

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
  onRetry?: () => void;
  backHref?: string;
  fullPage?: boolean;
}

export default function ErrorPage({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again or go back to the previous page.",
  code,
  onRetry,
  backHref,
  fullPage = true,
}: ErrorPageProps) {
  const router = useRouter();
  const { user } = useUserStore();

  return (
    <div
      className={`flex items-center justify-center bg-background px-4 py-12 ${
        fullPage ? "min-h-screen" : "min-h-[400px] w-full"
      }`}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
        {/* Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle size={34} className="text-destructive" />
          </div>
          {code && (
            <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-black tracking-widest">
              {code}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-destructive">
              Error
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
            {title}
          </h1>
          <p className="text-sm text-foreground-muted leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <Logo />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          )}

          {backHref ? (
            <Link
              href={backHref}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all duration-200"
            >
              <ArrowLeft size={14} />
              Go Back
            </Link>
          ) : (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all duration-200"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>
          )}

          <Link
            href={`/dashboard/${user?.role}`}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all duration-200"
          >
            <Home size={14} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
