import { create } from "zustand";
import { UserProps } from "@/types/auth";

type StepType = "1" | "2";

type AuthStore = {
  profile: UserProps | null;
  isAuthenticated: boolean;
  step: StepType;
  pendingState: {
    register: boolean;
    signIn: boolean;
    verifyOTP: boolean;
  };
  setStep: (step: StepType) => void;
  setProfile: (user: UserProps | null) => void;
  setIsAuthenticated: (val: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  profile: null,
  isAuthenticated: false,
  step: "1",
  pendingState: {
    register: false,
    signIn: false,
    verifyOTP: false,
  },
  setStep: (step) => set({ step }),
  setProfile: (user) => set({ profile: user }),
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),
}));
