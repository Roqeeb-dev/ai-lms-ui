"use client";

import { useState, useEffect } from "react";
import { BookOpen, PlusCircle, Info } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { useQuiz } from "@/hooks/useQuiz";

export default function InstructorQuizzesClient() {
  const { courses, fetching: fetchingCourses } = useInstructorCourses();
  const { fetchQuizzesByLesson, fetchingByLesson } = useQuiz();

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    if (courses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses]);

  useEffect(() => {
    if (!selectedCourseId) return;

    async function loadQuizzes() {
      try {
        const res = await fetchQuizzesByLesson(selectedCourseId);
        setQuizzes(res?.data || []);
      } catch {
        setQuizzes([]);
      }
    }

    loadQuizzes();
  }, [selectedCourseId]);

  const hasQuizzes = quizzes.length > 0;

  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Quizzes"
        text="View and manage quizzes across your courses and lessons"
      />

      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Info size={15} className="text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">
            Quizzes are created per lesson
          </p>
          <p className="text-xs text-foreground-muted leading-relaxed">
            To create or manage a quiz, go to your course builder, select a
            lesson, and add a quiz directly to it. Each quiz is tied to a
            specific lesson in your course.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          disabled={fetchingCourses}
          className="sm:w-64 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 disabled:opacity-50"
        >
          {fetchingCourses ? (
            <option>Loading courses...</option>
          ) : courses.length === 0 ? (
            <option>No courses yet</option>
          ) : (
            courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))
          )}
        </select>
      </div>

      {fetchingByLesson ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-sm text-foreground-muted">Loading quizzes...</p>
        </div>
      ) : !selectedCourseId || !hasQuizzes ? (
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <BookOpen size={22} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1.5 max-w-xs">
            <h3 className="text-sm font-semibold text-foreground">
              {selectedCourseId
                ? "No quizzes for this course"
                : "No courses selected"}
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {selectedCourseId
                ? "Open a lesson in your course builder to create quizzes."
                : "Select a course to view its quizzes."}
            </p>
          </div>
          <Link
            href="/dashboard/instructor/courses"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors duration-200"
          >
            <PlusCircle size={14} />
            Go to My Courses
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 border rounded-xl hover:bg-muted/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <span className="text-sm font-semibold text-foreground truncate">
                    {quiz.title || "Untitled Quiz"}
                  </span>
                  <p className="text-xs text-foreground-muted">
                    Lesson ID: {quiz.lessonId}
                  </p>
                </div>
                <div className="text-xs text-foreground-muted">
                  Questions: {quiz.questions.length} | Max Attempts:{" "}
                  {quiz.maxAttempts} | Passing Score: {quiz.passingScore}%
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <p className="text-xs text-foreground-muted">
                  {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <Link
                  href={`/dashboard/instructor/courses/${selectedCourseId}/quizzes/${quiz.id}`}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View / Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
