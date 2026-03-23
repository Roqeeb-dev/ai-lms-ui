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
  thumbnail?: File | null;
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
  const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  const updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();

  const instructor =
    typeof data.instructor === "string"
      ? { _id: data.instructor, name: "", email: "" }
      : data.instructor;

  return {
    id: data._id,
    title: data.title,
    description: data.description,
    instructor,
    thumbnail: data.thumbnail,
    status: data.status,
    createdAt,
    updatedAt,
  };
}

function normalizeAllCourses(data: ServerCourse[]): Course[] {
  return data.map((d) => normalizeCourse(d));
}

function toFormData(payload: Partial<CreateCoursePayload>): FormData {
  const fd = new FormData();
  if (payload.title) fd.append("title", payload.title);
  if (payload.description) fd.append("description", payload.description);
  if (payload.status) fd.append("status", payload.status);
  if (payload.thumbnail) fd.append("thumbnail", payload.thumbnail);
  return fd;
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
    const res = await apiClient.postForm<CreateCourseResponse>(
      "/api/courses",
      toFormData(payload),
    );
    return {
      course: normalizeCourse(res.course),
      message: res.message,
    };
  },

  async updateCourse(courseId: string, payload: Partial<CreateCoursePayload>) {
    const res = await apiClient.patchForm<UpdateCourseResponse>(
      `/api/courses/${courseId}`,
      toFormData(payload),
    );
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
