import { create } from "zustand";

interface User {
  id: string;
  email: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface AuthStore {
  email: string;
  user: {
    profile: User | null;
  };
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setAuth: (user: User) => void;
  logout: () => void;
  getToken: () => string | null;
  getUser: () => User | null;
}

export const useAuthStore = create<AuthStore>((set, get): AuthStore => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  return {
    email: "",
    user,
    isAuthenticated: user ? !!user.accessToken : false,
    setEmail: (email) => set({ email }),
  
    setAuth: (user: User) => {
      localStorage.setItem("access_token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      set({ user: { profile: user }, isAuthenticated: true });
    },

    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      set({ user: { profile: null }, isAuthenticated: false });
    },

    getToken: () => get().user?.profile?.accessToken || null,

    getUser: () => get().user?.profile,
  };
});
