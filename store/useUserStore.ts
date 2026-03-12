import { SessionUser } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: SessionUser | null;
  setUser: (data: SessionUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (data) => set({ user: data }),
  clearUser: () => set({ user: null }),
}));
