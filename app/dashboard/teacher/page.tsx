import TeacherClient from "./TeacherClient";

export const metadata = {
  title: "Teacher Dashboard | Cognify",
  description:
    "Manage your classrooms, track student progress, and deliver AI-enhanced learning experiences.",
};

export default function TeacherDashboard() {
  return (
    <main>
      <TeacherClient />
    </main>
  );
}
