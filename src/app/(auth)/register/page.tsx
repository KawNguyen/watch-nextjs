"use client";

import { AuthForm } from "@/components/auth-form";
import { authApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { z } from "zod";
import { RegisterTypes } from "@/types/auth";

const Page = () => {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);

  const mutateRegister = useMutation({
    mutationFn: (data: { firstName: string, lastName: string, email: string, password: string }) =>
      authApi.register(data.firstName, data.lastName, data.email, data.password),
    onSuccess: () => {
      router.push("/verify-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (data: RegisterTypes ) => {
    setEmail(data.email);
    mutateRegister.mutate(data);
  };

  return (
    <AuthForm
      mode="register"
      isPending={mutateRegister.isPending}
      fields={[
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "First Name",
          validation: z.string().min(1),
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Last Name",
          validation: z.string().min(1),
        },
        {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Email",
          validation: z.string().email(),
        },
        {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Password",
          validation: z.string().min(6),
        },
      ]}
      onSubmit={(data) => handleSubmit(data as RegisterTypes)}
      className="w-full max-w-[400px] mx-auto"
    />
  );
};

export default Page;
