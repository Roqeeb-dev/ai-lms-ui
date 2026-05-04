import CoursesClient from "./CoursesClient";
import { getLoggedInInstructorCoursesServer } from "@/services/courseService.server";
import { Course } from "@/types/course";

export const metadata = {
  title: "My Courses",
  description:
    "View and manage all your created courses, track student enrollment, and update course content.",
};

export default async function InstructorCourses() {
  let courses: Course[] = [];

  try {
    const res = await getLoggedInInstructorCoursesServer();
    courses = res.courses;
  } catch (err) {
    console.error("Failed to fetch instructor courses:", err);
  }

  return (
    <main>
      <CoursesClient initialCourses={courses} />
    </main>
  );
}
