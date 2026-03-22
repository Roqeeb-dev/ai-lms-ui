import Client from "./Client";

export const metadata = {
  title: "Course Content | Cognify LMS",
  description: "Continue learning your enrolled course.",
};

export default function CoursePage() {
  return (
    <main>
      <Client />
    </main>
  );
}
