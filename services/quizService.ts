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

export interface StartQuizResponse {
  success: boolean;
  data: {
    user: string;
    quiz: string;
    startedAt: string;
    _id: string;
    answers: {
      questionId: string;
      selectedOption: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface Answer {
  questionId: string;
  selectedOption: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;

  startedAt: Date;

  answers: Answer[];

  createdAt: Date;
  updatedAt: Date;
}

export interface SubmitQuizPayload {}
export interface SubmitQuizResponse {}

export interface GetQuizResponse {}

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
      id: data._id,
      userId: data.user,
      quizId: data.quiz,
      startedAt: new Date(data.startedAt),
      answers: data.answers,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    } as QuizAttempt,
  };
}

// submit quiz

// get quiz questions
