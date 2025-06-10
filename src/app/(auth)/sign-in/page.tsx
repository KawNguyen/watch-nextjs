"use client";

import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/components/providers/auth-context";
import { Button } from "@/components/ui/button";
import { VerifyOTP } from "@/components/verify-otp";
import { SignInTypes } from "@/types/auth";
import { useState } from "react";
import { z } from "zod";

const Page = () => {
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { step, signIn, verifyOTP, pendingState } = useAuth();

  const handleSubmit = (data: SignInTypes) => {
    setEmail(data.email);
    signIn(data);
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
      )}
    </>
  );
};

export default Page;
