"use client";

import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/mutation/auth.mutation";
import { SignInTypes } from "@/types/auth";
import { z } from "zod";

const Page = () => {
  const { signIn, pendingState } = useAuth();

  const handleSubmit = (data: SignInTypes) => {
    signIn(data);
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
        },
      ]}
      onSubmit={(data) => handleSubmit(data as SignInTypes)}
      className="w-full max-w-[400px] mx-auto"
      isPending={pendingState.signIn}
    />
  );
};

export default Page;
