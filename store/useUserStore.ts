import { User } from "@/types/user";
import { PublicUser } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: PublicUser | null;
  setUser: (data: Partial<User>) => void;
}

const mockUser: PublicUser = {
  fullname: "Shafiriyu Roqeeb Taiwo",
  email: "shafiriyuroqeeb@gmail.com",
  role: "student",
};

export const useUserStore = create<UserStore>((set) => ({
  user: mockUser,

  setUser: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
