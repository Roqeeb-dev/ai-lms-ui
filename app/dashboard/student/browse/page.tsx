import BrowseClient from "./BrowseClient";
import { getCoursesEnrollmentServer } from "@/services/enrollmentService.server";
import { getAllCoursesServer } from "@/services/courseService.server";
import { Course } from "@/types/course";
import { EnrollmentWithCourse } from "@/types/enrollment";

export const metadata = {
  title: "Browse Courses",
  description: "Browse courses you may be interested in",
};

export default async function ExploreCourses() {
  const [enrollmentsRes, coursesRes] = await Promise.all([
    getCoursesEnrollmentServer().catch(() => ({
      enrollments: [] as EnrollmentWithCourse[],
    })),
    getAllCoursesServer().catch(() => ({ courses: [] as Course[] })),
  ]);

  const enrollments = enrollmentsRes.enrollments;
  const allCourses = coursesRes.courses;

  const publishedEnrollments = enrollments.filter(
    (e) => e.course.status === "published",
  );
  const publishedCourses = allCourses.filter((c) => c.status === "published");

  return (
    <main>
      <BrowseClient
        initialEnrollments={publishedEnrollments}
        initialCourses={publishedCourses}
      />
    </main>
  );
}
