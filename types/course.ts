export interface CourseThumbnail {
  url: string;
  public_id: string;
}

export interface Instructor {
  _id: string;
  name: string;
  email: string;
}

export type Status = "draft" | "published";

export interface ServerCourse {
  thumbnail: CourseThumbnail;
  _id: string;
  title: string;
  description: string;
  instructor: Instructor | string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  thumbnail: CourseThumbnail;
  status: Status;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ServerCompletedLesson = {
  _id: string;
  title: string;
  module: string;
  type: string;
  file: { url: string; public_id: string };
  duration: number;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ServerCourseProgress = {
  _id: string;
  user: string;
  course: string;
  status: "active" | "completed" | "dropped";
  progress: number;
  completedLessons: ServerCompletedLesson[];
  createdAt: string;
  updatedAt: string;
};

export type CompletedLesson = {
  id: string;
  title: string;
  moduleId: string;
  type: string;
  fileUrl: string;
  duration: number;
  order: number;
};

export type CourseProgress = {
  id: string;
  userId: string;
  courseId: string;
  status: "active" | "completed" | "dropped";
  progress: number;
  completedLessons: CompletedLesson[];
  createdAt: Date;
  updatedAt: Date;
};
