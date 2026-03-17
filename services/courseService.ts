import { apiClient } from "@/lib/apiClient";
import { Course, ServerCourse } from "@/types/course";

export interface GetAllCoursesResponse {
  success: boolean;
  data: { courses: ServerCourse[] };
  page: number;
  limit: number;
  totalPages: number;
  totalCourses: number;
}

export interface GetSingleCourseResponse {
  success: boolean;
  course: ServerCourse;
}

export interface GetInstructorCoursesResponse {
  success: boolean;
  data: ServerCourse[];
}

export interface CreateCoursePayload {
  title: string;
  description: string;
  thumbnail?: string;
  status: "draft" | "published";
}

export interface CreateCourseResponse {
  success: boolean;
  message: string;
  course: ServerCourse;
}

export interface UpdateCourseResponse {
  success: boolean;
  message: string;
  course: ServerCourse;
}

export interface DeleteCourseResponse {
  success: boolean;
  message: string;
}

function normalizeCourse(data: ServerCourse): Course {
  const createdAt = new Date(data.createdAt);
  const updatedAt = new Date(data.updatedAt);

  if (isNaN(createdAt.getTime()))
    throw new Error(`Invalid createdAt for course ${data._id}`);
  if (isNaN(updatedAt.getTime()))
    throw new Error(`Invalid updatedAt for course ${data._id}`);

  return {
    id: data._id,
    title: data.title,
    description: data.description,
    instructor: data.instructor,
    thumbnail: data.thumbnail,
    status: data.status,
    createdAt,
    updatedAt,
  };
}

function normalizeAllCourses(data: ServerCourse[]): Course[] {
  return data.map((d) => normalizeCourse(d));
}

export const course = {
  async getAllCourses() {
    const res = await apiClient.get<GetAllCoursesResponse>("/api/courses");
    return {
      courses: normalizeAllCourses(res.data.courses),
      page: res.page,
      limit: res.limit,
      totalPages: res.totalPages,
      totalCourses: res.totalCourses,
    };
  },

  async getSingleCourse(courseId: string) {
    const res = await apiClient.get<GetSingleCourseResponse>(
      `/api/courses/${courseId}`,
    );
    return {
      course: normalizeCourse(res.course),
    };
  },

  async getInstructorCourses(instructorId: string) {
    const res = await apiClient.get<GetInstructorCoursesResponse>(
      `/api/courses/instructors/${instructorId}`,
    );
    return {
      courses: normalizeAllCourses(res.data),
    };
  },

  async getLoggedInInstructorCourses() {
    const res =
      await apiClient.get<GetInstructorCoursesResponse>("/api/courses/me");
    return {
      courses: normalizeAllCourses(res.data),
    };
  },

  async createCourse(payload: CreateCoursePayload) {
    const res = await apiClient.post<CreateCourseResponse, CreateCoursePayload>(
      "/api/courses",
      payload,
    );
    return {
      course: normalizeCourse(res.course),
      message: res.message,
    };
  },

  async updateCourse(courseId: string, payload: Partial<CreateCoursePayload>) {
    if (Object.keys(payload).length === 0)
      throw new Error("No fields to update");

    const res = await apiClient.patch<
      UpdateCourseResponse,
      Partial<CreateCoursePayload>
    >(`/api/courses/${courseId}`, payload);

    return {
      course: normalizeCourse(res.course),
      message: res.message,
    };
  },

  async deleteCourse(courseId: string) {
    const res = await apiClient.delete<DeleteCourseResponse>(
      `/api/courses/${courseId}`,
    );
    return {
      success: res.success,
      message: res.message,
    };
  },
};
