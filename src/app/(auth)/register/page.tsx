"use client";

import { AuthForm, RegisterFormData } from "@/components/auth-form";
import { authApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const Page = () => {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);

  const mutateRegister = useMutation({
    mutationFn: (data: RegisterFormData) =>
      authApi.register(data.email, data.password),
    onSuccess: (data: RegisterFormData) => {
      console.log(data);
      router.push("/verify-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (data: RegisterFormData) => {
    setEmail(data.email);
    mutateRegister.mutate(data);
  };

  return (
    <AuthForm
      mode="register"
      onSubmit={(data) => handleSubmit(data)}
      className="w-full max-w-[400px] mx-auto"
    />
  );
};

export default Page;
