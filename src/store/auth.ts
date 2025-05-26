import { create } from "zustand";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { userAPI } from "@/services/user";

interface AuthState {
  email: string;
  user: any;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setAuth: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  user: null,
  isAuthenticated: false,
  setEmail: (email) => set({ email }),
  setAuth: (user) => set({ user, isAuthenticated: true }),
  logout: () => {
    Cookies.remove("accessToken");
    set({ user: null, isAuthenticated: false });
  }
}));

// Tạo hook riêng để xử lý authentication

