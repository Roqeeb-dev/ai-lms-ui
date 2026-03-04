import CourseClient from "./CourseClient";

export const metadata = {
  title: "My Courses | Cognify",
  description:
    "View your enrolled courses, track progress, and discover new AI-recommended learning paths.",
};

export default function Courses() {
  return (
    <main>
      <CourseClient />
    </main>
  );
}
