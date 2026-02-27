export type Role = "student" | "teacher" | "admin";

export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
}
