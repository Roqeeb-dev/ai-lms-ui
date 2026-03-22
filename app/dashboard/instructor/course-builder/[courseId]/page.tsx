import BuilderClient from "./BuilderClient";

export const metadata = {
  title: "Course Builder | Cognify LMS",
  description: "Build courses and add modules, lessons and other descriptions",
};

export default function CourseBuilder() {
  return (
    <main>
      <BuilderClient />
    </main>
  );
}
