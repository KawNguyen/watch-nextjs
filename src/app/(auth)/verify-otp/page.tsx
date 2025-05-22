"use client";

import { Button } from "@/components/ui/button";
import { VerifyOTP } from "@/components/verify-otp";
import { authApi } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const email = useAuthStore((state) => state.email);
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const mutateVerifyOTP = useMutation({
    mutationFn: (otp: string) => authApi.verifyOTP(email, otp),
    onSuccess: (data) => {
      setAuth(data.user);
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
    },
  })

  const handleSubmit = (otp: string) => {
    mutateVerifyOTP.mutate(otp);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        A 6-digit code was sent to {email}.
      </p>

      <VerifyOTP length={6} onChange={setOtp} />

      <Button
        className="mt-6 w-full max-w-xs"
        onClick={() => handleSubmit(otp)}
        disabled={otp.length < 6 || mutateVerifyOTP.isPending}
      >
        {mutateVerifyOTP.isPending ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}
