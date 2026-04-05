"use client";

import { generateQuiz } from "@/services/aiService";
import { useState } from "react";
import { useToastStore } from "@/store/useToastStore";

export function useGenerateQuiz() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToastStore();

  async function generateNewQuiz(lessonId: string) {
    setGenerating(true);
    setError(null);

    try {
      const res = await generateQuiz(lessonId);
      addToast("Quiz generated successfully!", "success");
      return res;
    } catch (err: any) {
      const message = err ?? err?.message ?? "Something went wrong";
      addToast(message, "error");
      setError(message);
    } finally {
      setGenerating(false);
    }
  }

  return {
    generating,
    error,
    generateNewQuiz,
  };
}
