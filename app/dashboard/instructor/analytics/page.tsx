import AnalyticsClient from "./AnalyticsClient";
import { getLoggedInInstructorCoursesServer } from "@/services/courseService.server";
import { getCourseAnalyticsServer } from "@/services/analyticsService.server";
import { Course } from "@/types/course";
import { CourseAnalytics } from "@/services/analyticsService";

export const metadata = {
  title: "Analytics",
  description: "Get an overview of all actions related to you on the app",
};

export default async function Analytics() {
  let courses: Course[] = [];
  let analyticsMap = new Map<string, CourseAnalytics>();

  try {
    const coursesRes = await getLoggedInInstructorCoursesServer();
    courses = coursesRes.courses;

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
    console.error("Failed to fetch analytics data:", err);
  }

  return (
    <main>
      <AnalyticsClient
        initialCourses={courses}
        initialAnalyticsMap={analyticsMap}
      />
    </main>
  );
}
