import { serverApiClient } from "@/lib/serverApiClient";
import { normalizeAllEnrollmentsPopulated } from "../types/enrollment";

export async function getCoursesEnrollmentServer() {
  const res = await serverApiClient.get<any>("/api/users/me/courses");
  return {
    enrollments: normalizeAllEnrollmentsPopulated(res.data),
  };
}

export async function getCourseStudentsServer(courseId: string) {
  const res = await serverApiClient.get<any>(
    `/api/courses/${courseId}/students`,
  );
  return {
    enrollments: normalizeAllEnrollmentsPopulated(res.data),
  };
}
