import { QuizViewerClient } from "./QuizViewerClient";

export const metadata = {
  title: "Quiz | Cognify",
  description:
    "Test your understanding of this lesson with a short quiz. Answer all questions carefully and see how well you've grasped the material.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuizViewerPage() {
  return <QuizViewerClient />;
}
