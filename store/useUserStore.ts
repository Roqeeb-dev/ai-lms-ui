import { User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  updateUserDetails: (data: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  updateUserDetails: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
