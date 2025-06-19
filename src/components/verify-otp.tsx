"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

export function VerifyOTP({ length = 6, onChange }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => void (inputRefs.current[index] = el)}
          className="max-w-12 max-h-12 min-w-10 min-h-10 text-center text-xl font-semibold"
        />
      ))}
    </div>
  );
}
