import QuizzClient from "./QuizzClient";

export const metadata = {
  title: "Instructor Quizzes",
  description: "Create, edit, and manage quizzes for your students.",
};

export default function InstructorQuizzes() {
  return (
    <main>
      <QuizzClient />
    </main>
  );
}
