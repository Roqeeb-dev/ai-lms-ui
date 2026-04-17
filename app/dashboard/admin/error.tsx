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
      title="Admin Dashboard Error"
      message="An error occurred while loading the admin dashboard. Please try refreshing or contact the development team if issues continue."
      onRetry={reset}
      backHref="/dashboard"
    />
  );
}
