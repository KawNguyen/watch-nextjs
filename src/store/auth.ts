import { create } from "zustand";

interface Profile {
  firstName: string;
  avatar: string;
  lastName: string;
}

interface User {
  userId: string;
  accessToken: string;
  profile: Profile;
}

interface AuthStore {
  email: string;
  user: User | null;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setAuth: (user: User) => void;
  logout: () => void;
  getToken: () => string | null;
  getUser: () => Profile | null;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  email: "",
  user: null,
  isAuthenticated: !!localStorage.getItem("access_token"),

  setEmail: (email) => set({ email }),

  setAuth: (user: User) => {
    localStorage.setItem("access_token", user.accessToken);
    localStorage.setItem("user", JSON.stringify(user.profile));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },

  getToken: () => localStorage.getItem("access_token"),

  getUser: () => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData);
  },
  
}));
