import CoursesClient from "./CoursesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses",
  description:
    "View and manage all your created courses, track student enrollment, and update course content.",
};

export default function InstructorCourses() {
  return (
    <main>
      <CoursesClient />
    </main>
  );
}
