import { serverApiClient } from "@/lib/serverApiClient";

export async function getQuizzesByLessonServer(lessonId: string) {
  const res = await serverApiClient.get<any>(
    `/api/quizzes/lessons/${lessonId}`,
  );
  return res.data;
}
