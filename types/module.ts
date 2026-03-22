export type ServerModule = {
  _id: string;
  title: string;
  course: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Module = {
  id: string;
  title: string;
  courseId: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export function normalizeModule(data: ServerModule): Module {
  return {
    id: data._id,
    title: data.title,
    courseId: data.course,
    description: data.description,
    order: data.order,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function normalizeAllModules(data: ServerModule[]): Module[] {
  return data.map((d) => normalizeModule(d));
}
