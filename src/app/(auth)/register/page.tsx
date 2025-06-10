"use client";

import { AuthForm } from "@/components/auth-form";
import { z } from "zod";
import { RegisterTypes } from "@/types/auth";
import { useState } from "react";
import { VerifyOTP } from "@/components/verify-otp";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-context";

const Page = () => {
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { step, register, verifyOTP, pendingState } = useAuth();

  const handleSubmit = (data: RegisterTypes) => {
    setEmail(data.email);
    register(data);
  };

  const handleSubmitOTP = (otp: string) => {
    verifyOTP(email, otp);
  };

  return (
    <>
      {step === "2" ? (
        <div className="flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            A 6-digit code was sent to {email}.
          </p>
          <VerifyOTP length={6} onChange={setOtp} />
          <Button
            className="mt-6 w-full max-w-xs"
            onClick={() => handleSubmitOTP(otp)}
            disabled={otp.length < 6 || pendingState.verifyOTP}
          >
            {pendingState.verifyOTP ? "Verifying..." : "Verify"}
          </Button>
        </div>
      ) : (
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
          onSubmit={(data) => handleSubmit(data as RegisterTypes)}
          className="w-full max-w-[400px] mx-auto"
        />
      )}
    </>
  );
};

export default Page;
