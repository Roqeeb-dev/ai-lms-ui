export interface CourseThumbnail {
  url: string;
  public_id: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail?: CourseThumbnail;
  status: "draft" | "published";
  level?: "beginner" | "intermediate" | "advanced";
  category?: string;
  moduleIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  lessonIds: string[];
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  duration: number;
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
  status: "active" | "completed" | "cancelled";
}
