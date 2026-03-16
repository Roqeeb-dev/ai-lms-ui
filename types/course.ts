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
  instructor: Instructor;
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
