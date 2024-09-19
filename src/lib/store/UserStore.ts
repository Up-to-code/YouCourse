import { create } from "zustand";

interface User {
  given_name?: string;
  family_name?: string;
  picture?: string;
  isAuthenticated?: boolean;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
