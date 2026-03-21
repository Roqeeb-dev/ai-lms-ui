import { Lesson } from "@/types/lesson";

export function convertLessonsToMap(
  lessons: Lesson[],
): Record<string, Lesson[]> {
  return lessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.moduleId]) {
        acc[lesson.moduleId] = [];
      }
      acc[lesson.moduleId].push(lesson);
      return acc;
    },
    {} as Record<string, Lesson[]>,
  );
}
