"use client";

import { AuthForm, SigninFormData } from "@/components/auth-form";
import { authApi } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";


const Page = () => {
  const mutateSignIn = useMutation({
    mutationFn: (data: SigninFormData) => authApi.signIn(data.email, data.password),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <AuthForm
      mode="signin"
      onSubmit={(data) => mutateSignIn.mutate(data)}
      className="w-full max-w-[400px] mx-auto"
      isPending={mutateSignIn.isPending}
    />
  );
};

export default Page;
