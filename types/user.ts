export type Role = "student" | "teacher" | "admin";

interface Profile {
  firstName: string;
  lastName?: string;
  bio?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  profile: Profile;
  createdAt: Date;
}

export type PublicUser = Pick<User, "name" | "email" | "role">;

export type SessionUser = Omit<User, "password">;
