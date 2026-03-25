"use client";

import DashboardHeader from "@/components/DashboardHeader";
import QuizCard from "@/components/QuizCard";

type Quiz = {
  id: string;
  title: string;
  course: string;
  questions: number;
  duration: string;
  status: "not_started" | "in_progress" | "completed";
  score?: number;
};

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Introduction to React",
    course: "React Fundamentals",
    questions: 10,
    duration: "10 mins",
    status: "not_started",
  },
  {
    id: "2",
    title: "State & Props Quiz",
    course: "React Fundamentals",
    questions: 15,
    duration: "15 mins",
    status: "in_progress",
  },
  {
    id: "3",
    title: "JavaScript Basics",
    course: "JavaScript Mastery",
    questions: 20,
    duration: "20 mins",
    status: "completed",
    score: 85,
  },
];

export default function StudentQuizzClient() {
  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Quizzes"
        text="Test your understanding across your courses"
      />

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </main>
  );
}
