import { ServerUser, User } from "./user";
import { ServerCourse, Course } from "./course";

export type EnrollmentStatus = "active" | "completed" | "dropped";

export type ServerEnrollment = {
  _id: string;
  user: string;
  course: string;
  status: EnrollmentStatus;
  progress?: number;
  completedLessons?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress?: number;
  completedLessons?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export function normalizeEnrollment(data: ServerEnrollment): Enrollment {
  return {
    id: data._id,
    userId: data.user,
    courseId: data.course,
    status: data.status,
    progress: data.progress,
    completedLessons: data.completedLessons,
    createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
  };
}

export function normalizeAllEnrollments(
  data: ServerEnrollment[],
): Enrollment[] {
  return data.map(normalizeEnrollment);
}

export type ServerEnrollmentPopulated = {
  _id: string;
  user: string;
  course: ServerCourse;
  status: EnrollmentStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type EnrollmentWithCourse = {
  id: string;
  userId: string;
  status: EnrollmentStatus;
  createdAt: Date;
  updatedAt: Date;
  course: Course;
};

export function normalizeEnrollmentPopulated(
  data: ServerEnrollmentPopulated,
): EnrollmentWithCourse {
  const instructor =
    typeof data.course.instructor === "string"
      ? { _id: data.course.instructor, name: "", email: "" }
      : data.course.instructor;

  return {
    id: data._id,
    userId: data.user,
    status: data.status,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    course: {
      id: data.course._id,
      title: data.course.title,
      description: data.course.description,
      instructor,
      status: data.course.status,
      thumbnail: data.course.thumbnail,
      createdAt: data.course.createdAt
        ? new Date(data.course.createdAt)
        : new Date(),
      updatedAt: data.course.updatedAt
        ? new Date(data.course.updatedAt)
        : new Date(),
    },
  };
}

export function normalizeAllEnrollmentsPopulated(
  data: ServerEnrollmentPopulated[],
): EnrollmentWithCourse[] {
  return data.map(normalizeEnrollmentPopulated);
}

export type ServerEnrollmentWithStudent = {
  _id: string;
  user: ServerUser;
  course: string;
  status: EnrollmentStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type EnrollmentWithStudent = {
  id: string;
  courseId: string;
  status: EnrollmentStatus;
  createdAt: Date;
  updatedAt: Date;
  user: Omit<User, "password" | "profile">;
};

export function normalizeEnrollmentWithStudent(
  data: ServerEnrollmentWithStudent,
): EnrollmentWithStudent {
  return {
    id: data._id,
    courseId: data.course,
    status: data.status,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    user: {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      bio: data.user.bio,
      role: data.user.role as User["role"],
      profilePic: data.user.profilePic,
      isVerified: data.user.isVerified,
      isApproved: data.user.isApproved,
      lastLogin: data.user.lastLogin
        ? new Date(data.user.lastLogin)
        : undefined,
      createdAt: new Date(data.user.createdAt),
      updatedAt: new Date(data.user.updatedAt),
    },
  };
}

export function normalizeAllEnrollmentsWithStudents(
  data: ServerEnrollmentWithStudent[],
): EnrollmentWithStudent[] {
  return data.map(normalizeEnrollmentWithStudent);
}
