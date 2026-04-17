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
      title="Courses Error"
      message="Unable to load your courses. Try again to view your enrolled courses and progress."
      onRetry={reset}
      backHref="/dashboard/student"
    />
  );
}
