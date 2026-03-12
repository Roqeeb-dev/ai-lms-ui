import { SessionUser, User } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  user: SessionUser | null;
  setUser: (data: Partial<User>) => void;
}

const mockUser: SessionUser = {
  id: "2334",
  name: "Shafiriyu Roqeeb Taiwo",
  email: "shafiriyuroqeeb@gmail.com",
  role: "student",
  createdAt: new Date(),
  profile: {
    firstName: "Roqeeb",
  },
};

export const useUserStore = create<UserStore>((set) => ({
  user: mockUser,

  setUser: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
