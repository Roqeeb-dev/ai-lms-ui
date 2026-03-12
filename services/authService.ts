import { apiClient } from "../lib/apiClient";
import { User } from "@/types/user";

type LoginPayload = Pick<User, "email" | "password">;

type RegisterPayload = Pick<User, "name" | "email" | "password" | "role">;

export type UpdateProfilePayload = Partial<
  Pick<User, "name" | "email" | "profile">
>;

export type AuthResponse = {
  success: boolean;
  message?: string;
  token: string;
  user: User;
};

export type UpdateProfileResponse = {
  success: boolean;
  message?: string;
  user: User;
};

export const auth = {
  async login(payload: LoginPayload) {
    return apiClient.post<AuthResponse, LoginPayload>(
      "/api/auth/login",
      payload,
    );
  },

  async register(payload: RegisterPayload) {
    return apiClient.post<AuthResponse, RegisterPayload>(
      "/api/auth/signup",
      payload,
    );
  },

  async updateProfile(payload: UpdateProfilePayload) {
    return apiClient.patch<UpdateProfileResponse, UpdateProfilePayload>(
      "/me",
      payload,
    );
  },

  async checkUser(payload: Pick<User, "email">) {
    return apiClient.post<User, Pick<User, "email">>(
      "/api/auth/check",
      payload,
    );
  },
};
