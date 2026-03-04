export type Role = "student" | "teacher" | "admin";

interface Profile {
  firstName: string;
  lastName?: string;
  bio?: string;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  role: Role;
  profile: Profile;
  createdAt: Date;
}

export type PublicUser = Pick<User, "fullname" | "email" | "role">;
