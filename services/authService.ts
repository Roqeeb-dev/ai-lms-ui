import { apiClient } from "../lib/apiClient";
import { User, ServerUser, Role } from "@/types/user";

type LoginPayload = Pick<User, "email" | "password">;

type RegisterPayload = Pick<User, "name" | "email" | "password" | "role">;

export type UpdateProfilePayload = Partial<
  Pick<User, "name" | "email" | "profile">
>;

export type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string;
  user: User;
};

export type UpdateProfileResponse = {
  success: boolean;
  message?: string;
  user: User;
};

type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  user: ServerUser;
};

export type VerifyEmailResponse = {
  success: boolean;
  message?: string;
  user: User;
};

function mapRole(r: string): Role {
  if (r === "instructor") return "teacher";
  if (r === "student" || r === "teacher" || r === "admin") return r as Role;

  return "student";
}

function normalizeUser(u: ServerUser): User {
  return {
    id: u._id,
    name: u.name,
    email: u.email,
    password: "",
    role: mapRole(u.role),
    profile: { firstName: "", lastName: "", bio: u.bio || "" },
    createdAt: new Date(u.createdAt),
    bio: u.bio || undefined,
    profilePic: u.profilePic || undefined,
    isVerified: u.isVerified,
    isApproved: u.isApproved,
    lastLogin: u.lastLogin ? new Date(u.lastLogin) : undefined,
    updatedAt: u.updatedAt ? new Date(u.updatedAt) : undefined,
  };
}

export const auth = {
  async login(payload: LoginPayload) {
    const res = await apiClient.post<
      { success: boolean; message?: string; token?: string; user: ServerUser },
      LoginPayload
    >("/api/auth/login", payload);
    return {
      ...res,
      user: normalizeUser(res.user),
    } as AuthResponse;
  },

  async register(payload: RegisterPayload) {
    const res = await apiClient.post<
      { success: boolean; message?: string; token?: string; user: ServerUser },
      RegisterPayload
    >("/api/auth/signup", payload);
    return {
      ...res,
      user: normalizeUser(res.user),
    } as AuthResponse;
  },

  async verifyEmail(payload: { token: string }): Promise<VerifyEmailResponse> {
    const res = await apiClient.post<
      { success: boolean; message: string; user: ServerUser },
      { token: string }
    >("/api/auth/verify-email", payload);

    return {
      ...res,
      user: normalizeUser(res.user),
    };
  },

  async logout() {
    return apiClient.post<{ success: boolean; message: string }>(
      "/api/auth/logout",
    );
  },

  async updateProfile(payload: UpdateProfilePayload) {
    const res = await apiClient.patch<
      { success: boolean; message?: string; user: ServerUser },
      UpdateProfilePayload
    >("/me", payload);
    return {
      ...res,
      user: normalizeUser(res.user),
    } as UpdateProfileResponse;
  },

  async forgotPassword(payload: Pick<User, "email">) {
    return apiClient.post<ForgotPasswordResponse, Pick<User, "email">>(
      "/api/auth/forgot-password",
      payload,
    );
  },

  async resetPassword(payload: { password: string }) {
    return apiClient.post<
      { success: boolean; message?: string; user: ServerUser },
      { password: string }
    >("/api/auth/reset-password", payload);
  },

  async checkUser(payload: Pick<User, "email">) {
    return apiClient.post<User, Pick<User, "email">>(
      "/api/auth/check",
      payload,
    );
  },
};
