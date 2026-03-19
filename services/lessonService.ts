import {
  LessonType,
  ServerLesson,
  normalizeAllLessons,
  normalizeLesson,
} from "@/types/lesson";
import { ServerEnrollment, normalizeEnrollment } from "@/types/enrollment";
import { apiClient } from "@/lib/apiClient";

export interface CreateLessonPayload {
  title: string;
  type: LessonType;
  file: File;
}

export interface CreateLessonResponse {
  success: boolean;
  data: ServerLesson;
}

export interface GetModuleLessonsResponse {
  success: boolean;
  data: ServerLesson[];
}

export interface GetSingleLessonResponse {
  success: boolean;
  data: ServerLesson;
}

export interface UpdateLessonPayload {
  title?: string;
  type?: LessonType;
  file?: File;
}

export interface UpdateLessonResponse {
  success: boolean;
  data: ServerLesson;
}

export interface DeleteLessonResponse {
  success: boolean;
  message: string;
}

export interface CompleteLessonResponse {
  success: boolean;
  data: ServerEnrollment;
}

export async function createLesson(
  moduleId: string,
  data: CreateLessonPayload,
) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("type", data.type);
  formData.append("file", data.file);

  const res = await apiClient.postForm<CreateLessonResponse>(
    `/api/modules/${moduleId}/lessons`,
    formData,
  );

  return {
    success: res.success,
    lesson: normalizeLesson(res.data),
  };
}

export async function getModuleLessons(moduleId: string) {
  const res = await apiClient.get<GetModuleLessonsResponse>(
    `/api/modules/${moduleId}/lessons`,
  );

  return {
    success: res.success,
    lessons: normalizeAllLessons(res.data),
  };
}

export async function getSingleLesson(lessonId: string) {
  const res = await apiClient.get<GetSingleLessonResponse>(
    `/api/lessons/${lessonId}`,
  );

  return {
    success: res.success,
    lesson: normalizeLesson(res.data),
  };
}

export async function updateLesson(
  lessonId: string,
  data: UpdateLessonPayload,
) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.type) formData.append("type", data.type);
  if (data.file) formData.append("file", data.file);

  const res = await apiClient.patchForm<UpdateLessonResponse>(
    `/api/lessons/${lessonId}`,
    formData,
  );

  return {
    success: res.success,
    lesson: normalizeLesson(res.data),
  };
}

export async function deleteLesson(lessonId: string) {
  return apiClient.delete<DeleteLessonResponse>(`/api/lessons/${lessonId}`);
}

export async function completeLesson(lessonId: string) {
  const res = await apiClient.post<CompleteLessonResponse>(
    `/api/lessons/${lessonId}/complete`,
  );

  return {
    success: res.success,
    enrollment: normalizeEnrollment(res.data),
  };
}
