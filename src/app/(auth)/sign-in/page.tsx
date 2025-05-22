"use client";

import { AuthForm } from "@/components/auth-form";
import { authApi } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { SignInTypes } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Page = () => {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const mutateSignIn = useMutation({
    mutationFn: (data: SignInTypes) =>
      authApi.signIn(data.email, data.password),

    onSuccess: () => {
      router.push("/verify-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (data: SignInTypes) => {
    setEmail(data.email);
    mutateSignIn.mutate(data);
  };

  return (
    <AuthForm
      mode="signin"
      fields={[
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
        }
      ]}

      onSubmit={(data) => handleSubmit(data as SignInTypes)}
      className="w-full max-w-[400px] mx-auto"
      isPending={mutateSignIn.isPending}
    />
  );
};

export default Page;
