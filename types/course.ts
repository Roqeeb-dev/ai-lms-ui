export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  duration: number;
  createdAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  lessonIds: string[];
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  level: "beginner" | "intermediate" | "advanced";
  moduleIds: string[];
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  status: "active" | "completed" | "cancelled";
}
