import { apiClient } from "@/lib/apiClient";
import { CreateQuizResponse } from "./quizService";
import { normalizeQuiz } from "@/types/quiz";

export async function generateQuiz(lessonId: string) {
  const res = await apiClient.post<CreateQuizResponse>(
    `/api/ai/lessons/${lessonId}/generate-quiz`,
  );

  return {
    success: res.success,
    data: normalizeQuiz(res.data),
  };
}
