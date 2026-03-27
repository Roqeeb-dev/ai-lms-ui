import CreateQuizClient from "./CreateQuizClient";

export const metadata = {
  title: "Create Quiz | Instructor Dashboard",
  description: "Create quiz and manage quiz for your students",
};

export default function CreateQuizPage() {
  return (
    <main>
      <CreateQuizClient />
    </main>
  );
}
