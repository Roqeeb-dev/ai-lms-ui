import { apiClient } from "./apiClient";
import { User } from "@/types/user";

type LoginPayload = Pick<User, "email" | "password">;

type RegisterPayload = Pick<User, "fullname" | "email" | "password" | "role">;

export type UpdateProfilePayload = Partial<
  Pick<User, "fullname" | "email" | "profile">
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
    return apiClient.post<AuthResponse, LoginPayload>("/login", payload);
  },

  async register(payload: RegisterPayload) {
    return apiClient.post<AuthResponse, RegisterPayload>("/register", payload);
  },

  async updateProfile(payload: UpdateProfilePayload) {
    return apiClient.patch<UpdateProfileResponse, UpdateProfilePayload>(
      "/me",
      payload,
    );
  },
};
