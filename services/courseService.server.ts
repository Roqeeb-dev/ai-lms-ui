import { serverApiClient } from "@/lib/serverApiClient";
import { Course, ServerCourse } from "@/types/course";
import { normalizeCourseProgress } from "./courseService"; // only import pure functions/types

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
  return data.map(normalizeCourse);
}

export async function getAllCoursesServer() {
  const res = await serverApiClient.get<any>("/api/courses");
  return {
    courses: normalizeAllCourses(res.data.courses),
  };
}

export async function getCourseProgressServer(courseId: string) {
  const res = await serverApiClient.get<any>(
    `/api/courses/${courseId}/progress`,
  );
  return {
    progress: normalizeCourseProgress(res.data),
  };
}
