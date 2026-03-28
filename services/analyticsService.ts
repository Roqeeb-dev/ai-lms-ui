import { QuizAttempt } from "./quizService";
import { EnrollmentStatus } from "@/types/enrollment";
import { apiClient } from "@/lib/apiClient";

export type ServerAnalyticsEnrollment = {
  _id: string;
  user: string;
  course: {
    _id: string;
    title: string;
  };
  status: EnrollmentStatus;
  progress?: number;
  completedLessons?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export interface GetCourseAnalyticsResponse {
  success: boolean;
  data: {
    totalStudents: number;
    avgProgress: number;
  };
}

export interface GetInstructorQuizAnalyticsResponse {
  success: boolean;
  data: {
    avgScore: number;
    totalAttempts: number;
    passRate: number;
  };
}

export interface GetStudentAnalyticsResponse {
  success: boolean;
  data: {
    enrollments: ServerAnalyticsEnrollment[];
    attempts: QuizAttempt[];
    bestScores: number[];
  };
}

export type CourseAnalytics = {
  totalStudents: number;
  avgProgress: number;
};

export type QuizAnalytics = {
  avgScore: number;
  totalAttempts: number;
  passRate: number;
};

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

export type StudentAnalytics = {
  enrollments: AnalyticsEnrollment[];
  attempts: QuizAttempt[];
  bestScores: number[];
};

function normalizeCourseAnalytics(
  data: GetCourseAnalyticsResponse["data"],
): CourseAnalytics {
  return {
    totalStudents: data.totalStudents,
    avgProgress: data.avgProgress,
  };
}

function normalizeQuizAnalytics(
  data: GetInstructorQuizAnalyticsResponse["data"],
): QuizAnalytics {
  return {
    avgScore: data.avgScore,
    totalAttempts: data.totalAttempts,
    passRate: data.passRate,
  };
}

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

export async function getCourseAnalytics(
  courseId: string,
): Promise<CourseAnalytics> {
  const res = await apiClient.get<GetCourseAnalyticsResponse>(
    `/api/analytics/instructor/courses/${courseId}`,
  );

  return normalizeCourseAnalytics(res.data);
}

export async function getInstructorQuizAnalytics(
  quizId: string,
): Promise<QuizAnalytics> {
  const res = await apiClient.get<GetInstructorQuizAnalyticsResponse>(
    `/api/analytics/instructor/quizzes/${quizId}`,
  );

  return normalizeQuizAnalytics(res.data);
}

export async function getStudentAnalytics(): Promise<StudentAnalytics> {
  const res =
    await apiClient.get<GetStudentAnalyticsResponse>("/api/analytics/me");

  return normalizeStudentAnalytics(res.data);
}
