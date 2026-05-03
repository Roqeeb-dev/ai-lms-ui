import InstructorClient from "./InstructorClient";
import { getLoggedInInstructorCoursesServer } from "@/services/courseService.server";
import { getCourseAnalyticsServer } from "@/services/analyticsService.server";
import { Course } from "@/types/course";
import { CourseAnalytics } from "@/services/analyticsService";

export const metadata = {
  title: "Instructor Dashboard",
  description:
    "Manage your classrooms, track student progress, and deliver AI-enhanced learning experiences.",
};

export default async function InstructorDashboard() {
  let courses: Course[] = [];
  let analyticsMap = new Map<string, CourseAnalytics>();

  try {
    const res = await getLoggedInInstructorCoursesServer();
    courses = res.courses;

    // Fetch analytics for each course
    const analyticsResults = await Promise.allSettled(
      courses.map((c) => getCourseAnalyticsServer(c.id)),
    );

    analyticsResults.forEach((result, idx) => {
      if (result.status === "fulfilled") {
        analyticsMap.set(courses[idx].id, result.value);
      }
    });
  } catch (err) {
    console.error("Failed to fetch instructor data:", err);
  }

  return (
    <main>
      <InstructorClient
        initialCourses={courses}
        initialAnalyticsMap={analyticsMap}
      />
    </main>
  );
}
