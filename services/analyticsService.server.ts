import { serverApiClient } from "@/lib/serverApiClient";
import {
  GetStudentAnalyticsResponse,
  StudentAnalytics,
  GetCourseAnalyticsResponse,
  CourseAnalytics,
} from "./analyticsService";
import { QuizAttempt } from "./quizService";
import { EnrollmentStatus } from "@/types/enrollment";

export type AnalyticsEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  status: EnrollmentStatus;
  progress: number;
  completedLessons: string[];
  createdAt: string;
};

function normalizeStudentAnalytics(
  data: GetStudentAnalyticsResponse["data"],
): StudentAnalytics {
  return {
    enrollments: data.enrollments.map((e) => ({
      id: e._id,
      userId: e.user,
      courseId: e.course._id,
      courseTitle: e.course.title,
      status: e.status,
      progress: e.progress ?? 0,
      completedLessons: e.completedLessons ?? [],
      createdAt: e.createdAt ?? "",
    })),
    attempts: data.attempts,
    bestScores: data.bestScores,
  };
}

function normalizeCourseAnalytics(
  data: GetCourseAnalyticsResponse["data"],
): CourseAnalytics {
  return {
    totalStudents: data.totalStudents,
    avgProgress: data.avgProgress,
  };
}

export async function getStudentAnalyticsServer(): Promise<StudentAnalytics> {
  const res =
    await serverApiClient.get<GetStudentAnalyticsResponse>("/api/analytics/me");

  return normalizeStudentAnalytics(res.data);
}

export async function getCourseAnalyticsServer(
  courseId: string,
): Promise<CourseAnalytics> {
  const res = await serverApiClient.get<GetCourseAnalyticsResponse>(
    `/api/analytics/instructor/courses/${courseId}`,
  );

  return normalizeCourseAnalytics(res.data);
}
