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
      title="Instructor Quizzes Error"
      message="Error loading quizzes. Try again to manage and create quizzes for your courses."
      onRetry={reset}
      backHref="/dashboard/instructor"
    />
  );
}
