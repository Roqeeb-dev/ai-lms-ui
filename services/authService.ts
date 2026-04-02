import { apiClient } from "../lib/apiClient";
import { User, ServerUser, Role } from "@/types/user";
import type { ProfilePic } from "@/types/user";

export type LoginPayload = Pick<User, "email" | "password">;

export type RegisterPayload = Pick<
  User,
  "name" | "email" | "password" | "role"
>;

export type UpdateProfilePayload = {
  name?: string;
  bio?: string;
};

export type UpdateProfileWithPicPayload = {
  name?: string;
  bio?: string;
  profilePic?: File;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  token?: string;
  user: User;
};

export type UpdateProfileResponse = {
  success: boolean;
  data: ServerUser;
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

export type ChangePasswordPayload = {
  password: string;
  passwordUpdate: string;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
  data: ServerUser;
};

export type DeleteUserAccountResponse = {
  success: boolean;
  message: string;
};

export type GetUserProfileResponse = {
  success: boolean;
  data: {
    name: string;
    bio: string;
    profilePic: ProfilePic;
  };
};

function mapRole(r: string): Role {
  if (r === "student" || r === "instructor" || r === "admin") return r as Role;
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

  async resetVerification(payload: { email: string }) {
    const res = await apiClient.post<ForgotPasswordResponse, { email: string }>(
      "/api/auth/reset-verification",
      payload,
    );
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

  async updateProfile(payload: UpdateProfileWithPicPayload) {
    const formData = new FormData();
    if (payload.name) formData.append("name", payload.name);
    if (payload.bio) formData.append("bio", payload.bio);
    if (payload.profilePic) formData.append("profilePic", payload.profilePic);

    const res = await apiClient.patchForm<UpdateProfileResponse>(
      "/api/users/me",
      formData,
    );
    return {
      success: res.success,
      data: normalizeUser(res.data),
    };
  },

  async forgotPassword(payload: { email: string }) {
    return apiClient.post<ForgotPasswordResponse, { email: string }>(
      "/api/auth/forgot-password",
      payload,
    );
  },

  async resetPassword(token: string, payload: { password: string }) {
    return apiClient.post<
      { success: boolean; message?: string; user: ServerUser },
      { password: string }
    >(`/api/auth/reset-password/${token}`, payload);
  },

  async checkUser() {
    const res = await apiClient.get<ServerUser>("/api/auth/check");
    return {
      ...res,
      user: normalizeUser(res),
    };
  },

  async changePassword(payload: ChangePasswordPayload) {
    const res = await apiClient.patch<
      ChangePasswordResponse,
      ChangePasswordPayload
    >(`/api/auth/change-password`, payload);

    return {
      success: res.success,
      message: res.message,
      user: normalizeUser(res.data),
    };
  },

  async deleteUserAccount() {
    return apiClient.delete<DeleteUserAccountResponse>("/api/users/me");
  },

  async getUserProfile(userId: string) {
    const res = await apiClient.get<GetUserProfileResponse>(
      `/api/users/${userId}`,
    );

    return res;
  },
};
