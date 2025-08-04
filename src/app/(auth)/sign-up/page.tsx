"use client";

import { useState } from "react";
import { z } from "zod";

import { AuthForm } from "@/components/auth-form";
import { VerifyOTP } from "@/components/verify-otp";
import { Button } from "@/components/ui/button";

import { RegisterTypes } from "@/types/auth";
import { useAuth } from "@/mutation/auth.mutation";

const Page = () => {
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { step, register, verifyOTP, pendingState } = useAuth();

  const handleSubmit = (data: unknown) => {
    if (
      typeof data === "object" &&
      data !== null &&
      "firstName" in data &&
      "lastName" in data
    ) {
      const registerData = data as RegisterTypes;
      setEmail(registerData.email);
      register(registerData);
    }
  };

  const handleSubmitOTP = () => {
    verifyOTP(email, otp);
  };

  return (
    <>
      {step === "2" ? (
        <div className="flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold mb-4">Nhập mã OTP</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Mã xác thực 6 chữ số đã được gửi đến{" "}
            <span className="font-semibold">{email}</span>.
          </p>
          <VerifyOTP length={6} onChange={setOtp} />
          <Button
            className="mt-6 w-full max-w-xs"
            onClick={handleSubmitOTP}
            disabled={otp.length < 6 || pendingState.verifyOTP}
          >
            {pendingState.verifyOTP ? "Verifying..." : "Verify"}
          </Button>
        </div>
      ) : (
        <AuthForm
          mode="register"
          isPending={pendingState.register}
          fields={[
            {
              name: "firstName",
              label: "Tên",
              type: "text",
              placeholder: "Tên",
              validation: z.string().min(1, "Tên là bắt buộc"),
            },
            {
              name: "lastName",
              label: "Họ",
              type: "text",
              placeholder: "Họ",
              validation: z.string().min(1, "Họ là bắt buộc"),
            },
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "Email",
              validation: z.string().email("Email không hợp lệ"),
            },
            {
              name: "password",
              type: "password",
              label: "Mật khẩu",
              placeholder: "Mật khẩu",
              validation: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
            },
          ]}
          onSubmit={handleSubmit}
          className="w-full max-w-[400px] mx-auto"
        />
      )}
    </>
  );
};

export default Page;
