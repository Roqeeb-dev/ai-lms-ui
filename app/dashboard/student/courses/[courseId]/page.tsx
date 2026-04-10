import Client from "./Client";

export const metadata = {
  title: "Course Content",
  description: "Continue learning your enrolled course.",
};

export default function CoursePage() {
  return (
    <main>
      <Client />
    </main>
  );
}
