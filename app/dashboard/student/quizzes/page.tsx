import StudentQuizzClient from "./StudentQuizzClient";

export const metadata = {
  title: "My Quizzes | Cognify LMS",
  description:
    "Test your understanding with AI-generated quizzes across your enrolled courses.",
};

export default function Quizzes() {
  return (
    <main>
      <StudentQuizzClient />
    </main>
  );
}
