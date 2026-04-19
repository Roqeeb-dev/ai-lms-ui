import { serverApiClient } from "@/lib/serverApiClient";
import { normalizeAllEnrollmentsPopulated } from "../types/enrollment";

export async function getCoursesEnrollmentServer() {
  const res = await serverApiClient.get<any>("/api/users/me/courses");
  return {
    enrollments: normalizeAllEnrollmentsPopulated(res.data),
  };
}
