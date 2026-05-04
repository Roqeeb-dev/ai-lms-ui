import CourseClient from "./CourseClient";
import { getCoursesEnrollmentServer } from "@/services/enrollmentService.server";
import {
  getAllCoursesServer,
  getCourseProgressServer,
} from "@/services/courseService.server";
import { Course } from "@/types/course";
import { EnrollmentWithCourse } from "@/types/enrollment";

export const metadata = {
  title: "My Courses",
  description:
    "View your enrolled courses, track progress, and discover new AI-recommended learning paths.",
};

export default async function Courses() {
  const [enrollmentsRes, coursesRes] = await Promise.all([
    getCoursesEnrollmentServer().catch(() => ({
      enrollments: [] as EnrollmentWithCourse[],
    })),
    getAllCoursesServer().catch(() => ({ courses: [] as Course[] })),
  ]);

  const enrollments = enrollmentsRes.enrollments;
  const allCourses = coursesRes.courses;

  const progressEntries = await Promise.allSettled(
    enrollments.map((e) => getCourseProgressServer(e.course.id)),
  );

  const progressMap: Record<string, number> = {};
  progressEntries.forEach((result, i) => {
    if (result.status === "fulfilled" && result.value) {
      progressMap[enrollments[i].course.id] = result.value.progress.progress;
    }
  });

  return (
    <main>
      <CourseClient
        initialEnrollments={enrollments.filter(
          (e) => e.course.status === "published",
        )}
        initialCourses={allCourses.filter((c) => c.status === "published")}
        initialProgressMap={progressMap}
      />
    </main>
  );
}
