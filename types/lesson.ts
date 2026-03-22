export type LessonType = "video" | "pdf" | "text" | "quiz";

export type ServerLessonFile = {
  url: string;
  public_id: string;
};

export type ServerLesson = {
  _id: string;
  title: string;
  module: string;
  type: LessonType;
  file: ServerLessonFile;
  duration: number;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type LessonFile = {
  url: string;
  publicId: string;
};

export type Lesson = {
  id: string;
  title: string;
  moduleId: string;
  type: LessonType;
  file: LessonFile;
  duration: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export function normalizeLesson(data: ServerLesson): Lesson {
  return {
    id: data._id,
    title: data.title,
    moduleId: data.module,
    type: data.type,
    file: {
      url: data.file.url,
      publicId: data.file.public_id,
    },
    duration: data.duration,
    order: data.order,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function normalizeAllLessons(data: ServerLesson[]): Lesson[] {
  return data.map(normalizeLesson);
}
