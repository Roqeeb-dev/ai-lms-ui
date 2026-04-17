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
      title="Instructor Courses Error"
      message="Error loading your courses. Please try again to manage and create courses."
      onRetry={reset}
      backHref="/dashboard/instructor"
    />
  );
}
