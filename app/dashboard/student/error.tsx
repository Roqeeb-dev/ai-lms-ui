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
      title="Student Dashboard Error"
      message="An error occurred while loading your learning dashboard. Please refresh to continue your courses."
      onRetry={reset}
      backHref="/dashboard"
    />
  );
}
