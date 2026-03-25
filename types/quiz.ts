export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
}

export interface ServerQuiz {
  _id: string;
  lesson: string;
  questions: Question[];
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function normalizeQuiz(data: ServerQuiz): Quiz {
  return {
    id: data._id,
    lessonId: data.lesson,
    questions: data.questions,
    passingScore: data.passingScore,
    maxAttempts: data.maxAttempts,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
    shuffleQuestions: data.shuffleQuestions,
  };
}
