import { serverApiClient } from "@/lib/serverApiClient";
import { normalizeCourseProgress } from "./courseService"; // only import pure functions/types

export async function getCourseProgressServer(courseId: string) {
  const res = await serverApiClient.get<any>(
    `/api/courses/${courseId}/progress`,
  );
  return normalizeCourseProgress(res.data);
}
