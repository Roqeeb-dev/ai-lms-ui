import { apiClient } from "@/lib/apiClient";
import {
  normalizeEnrollment,
  normalizeAllEnrollmentsPopulated,
  normalizeAllEnrollmentsWithStudents,
  ServerEnrollment,
  ServerEnrollmentPopulated,
  ServerEnrollmentWithStudent,
} from "@/types/enrollment";

export interface CreateCourseEnrollmentResponse {
  success: boolean;
  data: Pick<ServerEnrollment, "_id" | "user" | "course" | "status">;
}

export interface GetCoursesEnrollmentResponse {
  success: boolean;
  data: ServerEnrollmentPopulated[];
}

export interface GetCourseStudentsResponse {
  success: boolean;
  data: ServerEnrollmentWithStudent[];
}

export async function createCourseEnrollment(courseId: string) {
  const res = await apiClient.post<CreateCourseEnrollmentResponse>(
    `/api/courses/${courseId}/enroll`,
  );

  return {
    success: res.success,
    enrollment: normalizeEnrollment(res.data),
  };
}

export async function getCoursesEnrollment() {
  const res = await apiClient.get<GetCoursesEnrollmentResponse>(
    `/api/users/me/courses`,
  );

  return {
    success: res.success,
    enrollments: normalizeAllEnrollmentsPopulated(res.data),
  };
}

export async function getCourseStudents(courseId: string) {
  const res = await apiClient.get<GetCourseStudentsResponse>(
    `/api/courses/${courseId}/students`,
  );

  return {
    success: res.success,
    enrollments: normalizeAllEnrollmentsWithStudents(res.data),
  };
}
