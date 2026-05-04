import { serverApiClient } from "@/lib/serverApiClient";
import {
  normalizeAllEnrollmentsPopulated,
  normalizeAllEnrollmentsWithStudents,
  EnrollmentWithCourse,
  EnrollmentWithStudent,
} from "../types/enrollment";

export async function getCoursesEnrollmentServer(): Promise<{
  enrollments: EnrollmentWithCourse[];
}> {
  const res = await serverApiClient.get<any>("/api/users/me/courses");
  return {
    enrollments: normalizeAllEnrollmentsPopulated(res.data),
  };
}

export async function getCourseStudentsServer(
  courseId: string,
): Promise<{ enrollments: EnrollmentWithStudent[] }> {
  const res = await serverApiClient.get<any>(
    `/api/courses/${courseId}/students`,
  );
  return {
    enrollments: normalizeAllEnrollmentsWithStudents(res.data),
  };
}
