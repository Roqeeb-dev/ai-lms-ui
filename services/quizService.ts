import { apiClient } from "@/lib/apiClient";
import { normalizeQuiz, Question, ServerQuiz } from "@/types/quiz";

export interface CreateQuizPayload {
  questions: Omit<Question, "_id">[];
  passingScore: number;
  shuffleQuestions: boolean;
}

export interface CreateQuizResponse {
  success: boolean;
  data: ServerQuiz;
}

export interface Answer {
  questionId: string;
  selectedOption: number;
}

export interface StartQuizResponse {
  success: boolean;
  data: {
    user: string;
    quiz: string;
    startedAt: string;
    _id: string; // ID of the quiz attempt
    answers: Answer[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface QuizAttempt {
  id: string; // Attempt ID
  userId: string;
  quizId: string;
  startedAt: Date;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubmitQuizPayload {
  answers: Answer[];
}

export interface SubmitQuizResponse {
  success: boolean;
  data: {
    _id: string; // Attempt ID
    user: string;
    quiz: ServerQuiz;
    startedAt: string;
    answers: Answer[];
    duration: number;
    passed: boolean;
    score: number;
    percentage: number;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface GetQuizResponse {
  success: boolean;
  data: ServerQuiz;
}

export async function createQuiz(lessonId: string, data: CreateQuizPayload) {
  const res = await apiClient.post<CreateQuizResponse, CreateQuizPayload>(
    `/api/lessons/${lessonId}/quiz`,
    data,
  );

  return {
    success: res.success,
    data: normalizeQuiz(res.data),
  };
}

export async function startQuiz(quizId: string) {
  const res = await apiClient.post<StartQuizResponse>(
    `/api/quizzes/${quizId}/start`,
  );

  const data = res.data;

  return {
    success: res.success,
    data: {
      id: data._id, // Quiz attempt ID
      userId: data.user,
      quizId: data.quiz,
      startedAt: new Date(data.startedAt),
      answers: data.answers,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    } as QuizAttempt,
  };
}

export async function submitQuiz(attemptId: string, data: SubmitQuizPayload) {
  const res = await apiClient.post<SubmitQuizResponse, SubmitQuizPayload>(
    `/api/quizzes/attempts/${attemptId}/submit`,
    data,
  );

  return {
    success: res.success,
    data: {
      id: res.data._id, // Attempt ID
      userId: res.data.user,
      quiz: normalizeQuiz(res.data.quiz),
      answers: res.data.answers,
      passed: res.data.passed,
      score: res.data.score,
      percentage: res.data.percentage,
      duration: res.data.duration,
      startedAt: new Date(res.data.startedAt),
      submittedAt: new Date(res.data.submittedAt),
      createdAt: new Date(res.data.createdAt),
      updatedAt: new Date(res.data.updatedAt),
    },
  };
}

export async function getQuiz(quizId: string) {
  const res = await apiClient.get<GetQuizResponse>(
    `/api/quizzes/${quizId}/quiz`,
  );

  return {
    success: res.success,
    data: normalizeQuiz(res.data),
  };
}
