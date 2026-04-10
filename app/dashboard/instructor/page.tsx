import InstructorClient from "./InstructorClient";

export const metadata = {
  title: "Instructor Dashboard",
  description:
    "Manage your classrooms, track student progress, and deliver AI-enhanced learning experiences.",
};

export default function InstructorDashboard() {
  return (
    <main>
      <InstructorClient />
    </main>
  );
}
