import ProgressClient from "./ProgressClient";
import { getStudentAnalyticsServer } from "@/services/analyticsService.server";
import { StudentAnalytics } from "@/services/analyticsService";

export const metadata = {
  title: "My Progress",
  description:
    "Track your learning progress, completion rates and pace across all your courses.",
};

export default async function StudentProgress() {
  let analyticsData: StudentAnalytics | null = null;
  let analyticsError: string | null = null;

  try {
    analyticsData = await getStudentAnalyticsServer();
  } catch (err) {
    analyticsError =
      err instanceof Error ? err.message : "Failed to load analytics";
  }

  return (
    <main>
      <ProgressClient
        initialAnalytics={analyticsData}
        initialError={analyticsError}
      />
    </main>
  );
}
