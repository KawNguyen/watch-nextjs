"use client";

import { AuthForm, SigninFormData } from "@/components/auth-form";
import { authApi } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const setEmail = useAuthStore((state) => state.setEmail);
  const mutateSignIn = useMutation({
    mutationFn: (data: SigninFormData) =>
      authApi.signIn(data.email, data.password),

    onSuccess: (data) => {
      console.log(data);
      router.push("/verify-otp");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (data: SigninFormData) => {
    setEmail(data.email);
    mutateSignIn.mutate(data);
  };

  return (
    <AuthForm
      mode="signin"
      onSubmit={(data) => handleSubmit(data)}
      className="w-full max-w-[400px] mx-auto"
      isPending={mutateSignIn.isPending}
    />
  );
};

export default Page;
