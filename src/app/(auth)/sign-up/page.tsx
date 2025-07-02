"use client";

import { AuthForm } from "@/components/auth-form";
import { z } from "zod";
import { RegisterTypes } from "@/types/auth";
import { useAuth } from "@/components/providers/auth-context";

const Page = () => {
  const { register, pendingState } = useAuth();

  const handleSubmit = (data: RegisterTypes | unknown) => {
    if (
      typeof data === "object" &&
      data !== null &&
      "firstName" in data &&
      "lastName" in data
    ) {
      const registerData = data as RegisterTypes;
      register(registerData);
    }
  };

  return (
    <AuthForm
      mode="register"
      isPending={pendingState.signIn}
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
      onSubmit={(data) => handleSubmit(data)}
      className="w-full max-w-[400px] mx-auto"
    />
  );
};

export default Page;
