"use client";

import { useUser } from "@/queries/user";
import { authApi } from "@/services/auth";
import { RegisterTypes, SignInTypes, UserProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  profile: UserProps | null;
  isAuthenticated: boolean;
  step: "1" | "2";
  setStep: (step: "1" | "2") => void;
  register: (data: RegisterTypes) => void;
  signIn: (data: SignInTypes) => void;
  verifyOTP: (email: string, otp: string) => void;
  pendingState: {
    register: boolean;
    signIn: boolean;
    verifyOTP: boolean;
  };
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  profile: null,
  isAuthenticated: false,
  step: "1",
  setStep: () => {},
  register: () => {},
  signIn: () => {},
  verifyOTP: () => {},
  pendingState: {
    register: false,
    signIn: false,
    verifyOTP: false,
  },
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: profile, refetch } = useUser();
  const [step, setStep] = useState<"1" | "2">("1");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setIsAuthenticated(true);
    }
  }, [profile]);

  const mutateRegister = useMutation({
    mutationFn: (data: RegisterTypes) =>
      authApi.register(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      ),
    onSuccess: () => {
      setStep("2");
    },
  });

  const mutateSignIn = useMutation({
    mutationFn: (data: SignInTypes) =>
      authApi.signIn(data.email, data.password),
    onSuccess: () => {
      setStep("2");
    },
  });

  const mutateVerifyOTP = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyOTP(email, otp),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const mutateLogout = useMutation({
    mutationFn: () => authApi.logout(),
  });

  const register = (data: RegisterTypes) => {
    mutateRegister.mutate(data);
  };

  const signIn = (data: SignInTypes) => {
    mutateSignIn.mutate(data);
  };

  const verifyOTP = (email: string, otp: string) => {
    mutateVerifyOTP.mutate({ email, otp });
    refetch();
  };

  const logout = () => {
    mutateLogout.mutate();
    setIsAuthenticated(false);
    setStep("1");
    refetch();
  };

  const value: AuthContextType = {
    profile,
    isAuthenticated,
    step,
    setStep,
    register,
    signIn,
    verifyOTP,
    pendingState: {
      register: mutateRegister.isPending,
      signIn: mutateSignIn.isPending,
      verifyOTP: mutateVerifyOTP.isPending,
    },
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
