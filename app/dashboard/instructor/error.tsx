"use client";

import ErrorPage from "@/app/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      title="Instructor Dashboard Error"
      message="Something went wrong while loading your instructor dashboard. Try again to manage your courses and students."
      onRetry={reset}
      backHref="/dashboard"
    />
  );
}
