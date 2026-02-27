import StudentClient from "./StudentClient";

export const metadata = {
  title: "My Dashboard | Cognify",
  description:
    "Track your learning progress, continue your courses, and get AI-powered guidance personalized to you.",
};

export default function StudentDashboard() {
  return (
    <main>
      <StudentClient />
    </main>
  );
}
