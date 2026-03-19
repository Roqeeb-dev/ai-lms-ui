import { apiClient } from "@/lib/apiClient";
import {
  ServerModule,
  normalizeAllModules,
  normalizeModule,
} from "@/types/module";

export interface CreateCourseModulePayload {
  title: string;
  description: string;
}

export interface CreateCourseModuleResponse {
  success: boolean;
  data: ServerModule;
}

export interface GetCourseModulesResponse {
  success: boolean;
  data: ServerModule[];
}

export interface GetSingleModuleResponse {
  success: boolean;
  module: ServerModule;
}

export type UpdateModulePayload = CreateCourseModulePayload;

export type UpdateModuleResponse = GetSingleModuleResponse;

export interface DeleteModuleResponse {
  success: boolean;
  message: string;
}

export async function createCourseModule(
  courseId: string,
  data: CreateCourseModulePayload,
) {
  const res = await apiClient.post<
    CreateCourseModuleResponse,
    CreateCourseModulePayload
  >(`/api/courses/${courseId}/modules`, data);

  return {
    ...res,
    module: normalizeModule(res.data),
  };
}

export async function getCourseModules(courseId: string) {
  const res = await apiClient.get<GetCourseModulesResponse>(
    `/api/courses/${courseId}/modules`,
  );

  return {
    ...res,
    modules: normalizeAllModules(res.data),
  };
}

export async function getSingleModule(moduleId: string) {
  const res = await apiClient.get<GetSingleModuleResponse>(
    `/api/modules/${moduleId}`,
  );

  return {
    ...res,
    module: normalizeModule(res.module),
  };
}

export async function updateModule(
  moduleId: string,
  data: UpdateModulePayload,
) {
  const res = await apiClient.patch<UpdateModuleResponse, UpdateModulePayload>(
    `/api/modules/${moduleId}`,
    data,
  );

  return {
    ...res,
    module: normalizeModule(res.module),
  };
}

export async function deleteModule(moduleId: string) {
  return apiClient.delete<DeleteModuleResponse>(`/api/modules/${moduleId}`);
}
