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
      title="Dashboard Error"
      message="Something went wrong while loading your dashboard. Please try again or contact support if the issue persists."
      onRetry={reset}
      backHref="/"
    />
  );
}
