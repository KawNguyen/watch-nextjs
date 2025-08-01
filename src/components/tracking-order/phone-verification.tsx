"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PhoneVerificationProps {
  orderId: string;
  onVerify: (phoneLast4Digits: string) => void;
  onBack: () => void;
}

export function PhoneVerification({
  orderId,
  onVerify,
  onBack,
}: PhoneVerificationProps) {
  const [phoneInput, setPhoneInput] = useState("");

  const handleVerify = () => {
    if (!phoneInput.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    if (phoneInput.length < 4) {
      toast.error("Vui lòng nhập ít nhất 4 số cuối");
      return;
    }

    const last4Digits = phoneInput.slice(-4);
    onVerify(last4Digits);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Xác thực số điện thoại
            </CardTitle>
            <CardDescription>
              Để xem chi tiết đơn hàng #{orderId.slice(-8).toUpperCase()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="phone-verify">
            Nhập 4 số cuối điện thoại đặt hàng
          </Label>
          <Input
            id="phone-verify"
            value={phoneInput}
            placeholder="Ví dụ: 1234"
            maxLength={4}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPhoneInput(value);
            }}
            onKeyPress={handleKeyPress}
            className="text-center text-lg font-mono tracking-widest"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Button onClick={handleVerify} className="w-full">
            Xác thực và xem đơn hàng
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Chúng tôi sử dụng 4 số cuối điện thoại để bảo vệ thông tin đơn hàng
            của bạn
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
