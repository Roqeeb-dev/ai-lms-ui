import StudentClient from "./StudentClient";
import { getCoursesEnrollmentServer } from "@/services/enrollmentService.server";
import { getCourseProgressServer } from "@/services/courseService.server";
import { EnrollmentWithCourse } from "@/types/enrollment";

export const metadata = {
  title: "My Dashboard",
  description:
    "Track your learning progress, continue your courses, and get AI-powered guidance personalized to you.",
};

export default async function StudentDashboard() {
  const enrollmentsRes = await getCoursesEnrollmentServer().catch(() => ({
    enrollments: [] as EnrollmentWithCourse[],
  }));
  const enrollments = enrollmentsRes.enrollments;

  const recentEnrollments = enrollments.slice(0, 3);

  const progressEntries = await Promise.allSettled(
    recentEnrollments.map((e) => getCourseProgressServer(e.course.id)),
  );

  const progressMap: Record<string, number> = {};
  progressEntries.forEach((result, i) => {
    if (result.status === "fulfilled" && result.value) {
      progressMap[recentEnrollments[i].course.id] =
        result.value.progress.progress;
    }
  });

  return (
    <main>
      <StudentClient
        initialEnrollments={enrollments}
        initialProgressMap={progressMap}
      />
    </main>
  );
}
