"use client";

import { useRouter } from "next/navigation";
import { RegisterTypes, SignInTypes, UpdateUserProps } from "@/types/auth";
import { authApi } from "@/services/auth";
import { useUser } from "@/queries/user";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { toast } from "sonner";
import { userAPI } from "@/services/user";

export const useAuth = () => {
  const router = useRouter();
  const { data: userData, refetch } = useUser();

  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const step = useAuthStore((state) => state.step);
  const pendingState = useAuthStore((state) => state.pendingState);
  const setStep = useAuthStore((state) => state.setStep);
  const setProfile = useAuthStore((state) => state.setProfile);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  useEffect(() => {
    if (userData && !profile) {
      setProfile(userData);
      setIsAuthenticated(true);
    }
  }, [userData, profile, setProfile, setIsAuthenticated]);

  const registerMutation = useMutation({
    mutationFn: (data: RegisterTypes) =>
      authApi.register(
        data.firstName,
        data.lastName,
        data.email,
        data.password
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
    onMutate: async () => {
      await refetch();
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState },
      }));
    },
    onSuccess: async (data) => {
      if (data.message === "Login successfully") {
        await refetch();
        setIsAuthenticated(true);
        router.push("/");
      }
    },
    onSettled: () => {
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState },
      }));
    },
    onError: (err) => {
      console.error("Sign in error", err);
    },
  });

  const updateProfile = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserProps }) =>
      await userAPI.updateUser(id, data),
    onSuccess: async () => {
      await refetch();
      setProfile(userData);
      toast.success("Your profile has been updated successfully.");
    },
    onError: (error: string) => {
      console.error("Error updating user:", error);
    },
  });

  const changeAvatar = useMutation({
    mutationFn: (avatar: { absolute_url: string; public_id: string }) =>
      userAPI.changeAvatar(avatar),
    onSuccess: async () => {
      await refetch();
      setProfile(userData);
      toast.success("Your avatar has been updated successfully.");
    },
    onError: (error: string) => {
      console.error("Failed to update avatar.", error);
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
        setIsAuthenticated(true);
        router.push("/");
      }
      toast.success("Sign up successful");
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
    onMutate: async () => {
      await refetch();
      setProfile(null);
      setIsAuthenticated(false);
      useAuthStore.setState((state) => ({
        pendingState: { ...state.pendingState },
      }));
    },
    onSuccess: () => {
      refetch();
      setIsAuthenticated(false);
      setStep("1");
    },
  });

  return {
    profile,
    isAuthenticated,
    step,
    setStep,
    register: registerMutation.mutate,
    signIn: signInMutation.mutate,
    updateProfile: updateProfile,
    changeAvatar: changeAvatar,
    verifyOTP: (email: string, otp: string) =>
      verifyOTPMutation.mutate({ email, otp }),
    logout: logoutMutation.mutate,
    pendingState,
  };
};
