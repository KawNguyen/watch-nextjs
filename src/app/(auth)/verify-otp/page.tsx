"use client";

import { Button } from "@/components/ui/button";
import { VerifyOTP } from "@/components/verify-otp";
import { useState } from "react";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
      <p className="text-sm text-gray-500 mb-6">
        A 6-digit code was sent to your phone number.
      </p>

      <VerifyOTP length={6} onChange={setOtp} />

      <Button
        className="mt-6 w-full max-w-xs"
        onClick={handleSubmit}
        disabled={otp.length < 6 || loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}
