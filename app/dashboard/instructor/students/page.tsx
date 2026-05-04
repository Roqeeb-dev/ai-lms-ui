import { Metadata } from "next";
import StudentsClient from "./StudentsClient";
import { getLoggedInInstructorCoursesServer } from "@/services/courseService.server";
import { getCourseStudentsServer } from "@/services/enrollmentService.server";
import { Course } from "@/types/course";
import { EnrollmentWithStudent } from "@/types/enrollment";

export const metadata: Metadata = {
  title: "My Students",
  description: "View and manage students enrolled in your courses.",
};

export default async function Page() {
  let courses: Course[] = [];
  let students: EnrollmentWithStudent[] = [];

  try {
    const coursesRes = await getLoggedInInstructorCoursesServer();
    courses = coursesRes.courses;

    if (courses.length > 0) {
      // Get students for the first course
      const studentsRes = await getCourseStudentsServer(courses[0].id);
      students = studentsRes.enrollments;
    }
  } catch (err) {
    console.error("Failed to fetch students data:", err);
  }

  return (
    <main>
      <StudentsClient
        initialCourses={courses}
        initialStudents={students}
        initialSelectedCourseId={courses.length > 0 ? courses[0].id : ""}
      />
    </main>
  );
}
