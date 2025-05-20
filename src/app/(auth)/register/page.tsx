"use client"

import { AuthForm, RegisterFormData } from "@/components/auth-form";
import { authApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
    const mutateRegister = useMutation({
      mutationFn: (data: RegisterFormData) =>
        authApi.register(data.name, data.email, data.password),
      onSuccess: (data: RegisterFormData) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  return (
    <AuthForm
      mode="register"
      onSubmit={(data) => mutateRegister.mutate(data as RegisterFormData)}
      className="w-full max-w-[400px] mx-auto"
    />
  );
};

export default Page;
