"use client";

import { useRouter } from "next/navigation";
import { RegisterTypes, SignInTypes } from "@/types/auth";
import { authApi } from "@/services/auth";
import { useUser } from "@/queries/user";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();
  const { data: userData, refetch } = useUser();

  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const step = useAuthStore((state) => state.step);
  const pendingState = useAuthStore((state) => state.pendingState);
  const setStep = useAuthStore((state) => state.setStep);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  useEffect(() => {
    if (userData && !profile) {
      setProfile(userData);
      setAuthenticated(true);
    }
  }, [userData, profile, setProfile, setAuthenticated]);

  const registerMutation = useMutation({
    mutationFn: (data: RegisterTypes) =>
      authApi.register(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
      ),
    onMutate: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState, register: true },
      }));
    },
    onSuccess: () => {
      setStep("2");
    },
    onSettled: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState, register: false },
      }));
    },
    onError: (err) => {
      console.error("Register error", err);
    },
  });

  const signInMutation = useMutation({
    mutationFn: (data: SignInTypes) =>
      authApi.signIn(data.email, data.password),
    onMutate: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState, signIn: true },
      }));
    },
    onSuccess: async (data) => {
      if (data.message === "Login successfully") {
        await refetch();
        setAuthenticated(true);
        router.push("/");
      }
    },
    onSettled: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState, signIn: false },
      }));
    },
    onError: (err) => {
      console.error("Sign in error", err);
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authApi.verifyOTP(email, otp),
    onMutate: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState, verifyOTP: true },
      }));
    },
    onSuccess: async (data) => {
      if (data.message === "Account created successfully") {
        await refetch();
        setAuthenticated(true);
        router.push("/");
      }
    },
    onSettled: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState, verifyOTP: false },
      }));
    },
    onError: (err) => {
      console.error("Verify OTP error", err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setAuthenticated(false);
      setStep("1");
      setProfile(null);
      refetch();
    },
  });

  return {
    profile,
    isAuthenticated,
    step,
    setStep,
    register: registerMutation.mutate,
    signIn: signInMutation.mutate,
    verifyOTP: (email: string, otp: string) =>
      verifyOTPMutation.mutate({ email, otp }),
    logout: logoutMutation.mutate,
    pendingState,
  };
};
