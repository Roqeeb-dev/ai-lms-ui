"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  PlusCircle,
  ClipboardList,
  ChevronDown,
  Trophy,
  Layers,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import Link from "next/link";
import { useInstructorCourses } from "@/hooks/useInstructorCourses";
import { useLesson } from "@/hooks/useLesson";
import { useQuiz } from "@/hooks/useQuiz";
import { Skeleton } from "@/components/Skeleton";

function QuizCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

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

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);
  const hasQuizzes = quizzes.length > 0;

  return (
    <main className="flex flex-col gap-8 max-w-6xl mx-auto">
      <DashboardHeader
        title="Quizzes"
        text="View and manage quizzes across your courses"
      />

      {/* Course selector + summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Dropdown */}
        <div className="relative w-full sm:w-72">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            disabled={fetchingCourses}
            className="w-full appearance-none rounded-xl border border-border bg-card px-4 py-2.5 pr-9 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 disabled:opacity-50 cursor-pointer"
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
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none"
          />
        </div>

        {/* Quiz count badge */}
        {!fetchingByLesson && hasQuizzes && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 w-fit">
            <ClipboardList size={13} className="text-primary" />
            <span className="text-xs font-semibold text-primary">
              {quizzes.length} quiz{quizzes.length !== 1 ? "zes" : ""} found
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      {fetchingByLesson ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <QuizCardSkeleton key={i} />
          ))}
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
                : "No course selected"}
            </h3>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {selectedCourseId
                ? "Open a quiz lesson in your course builder to create quizzes."
                : "Select a course above to view its quizzes."}
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
        <div className="flex flex-col gap-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
            >
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ClipboardList size={16} className="text-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {quiz.title || "Quiz Lesson"}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-foreground-muted">
                      <Layers size={11} />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground-muted">
                      <Trophy size={11} />
                      <span>{quiz.passingScore}% to pass</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground-muted">
                      <BookOpen size={11} />
                      <span>{quiz.maxAttempts} max attempts</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground-muted">
                      <CalendarDays size={11} />
                      <span>
                        {new Date(quiz.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <Link
                href={`/dashboard/instructor/courses/${selectedCourseId}/quizzes/${quiz.id}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 sm:ml-auto"
              >
                View / Edit
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
