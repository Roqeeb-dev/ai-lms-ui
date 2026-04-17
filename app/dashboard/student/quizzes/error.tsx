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
      title="Quizzes Error"
      message="Unable to load your quizzes. Please try again to take or review your quizzes."
      onRetry={reset}
      backHref="/dashboard/student"
    />
  );
}
