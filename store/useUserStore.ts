import { SessionUser, User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: SessionUser | null;
  setUser: (data: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : (data as SessionUser),
    }));
  },
}));
