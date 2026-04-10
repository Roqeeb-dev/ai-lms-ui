import ProgressClient from "./ProgressClient";

export const metadata = {
  title: "My Progress",
  description:
    "Track your learning progress, completion rates and pace across all your courses.",
};

export default function StudentProgress() {
  return (
    <main>
      <ProgressClient />
    </main>
  );
}
