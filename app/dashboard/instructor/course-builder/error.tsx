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
      title="Course Builder Error"
      message="An error occurred in the course builder. Try again to continue building your course."
      onRetry={reset}
      backHref="/dashboard/instructor/courses"
    />
  );
}
