export type Role = "student" | "teacher" | "admin";

export interface ServerUser {
  _id: string;
  name: string;
  email: string;
  bio: string;
  role: string;
  isVerified: boolean;
  isApproved: boolean;
  profilePic?: string;
  verificationToken?: string;
  verificationTokenExpiresAt?: string;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
}

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
  bio?: string;
  profilePic?: string;
  isVerified?: boolean;
  isApproved?: boolean;
  lastLogin?: Date;
  updatedAt?: Date;
}

export type PublicUser = Pick<User, "name" | "email" | "role">;

export type SessionUser = Omit<User, "password">;
