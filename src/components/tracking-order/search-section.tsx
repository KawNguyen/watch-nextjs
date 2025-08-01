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
import { Search } from "lucide-react";

interface SearchSectionProps {
  trackingNumber: string;
  onTrackingNumberChange: (value: string) => void;
  onTrack: () => void;
}

export function SearchSection({
  trackingNumber,
  onTrackingNumberChange,
  onTrack,
}: SearchSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Tra cứu đơn hàng
        </CardTitle>
        <CardDescription>
          Nhập tên, email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="tracking">Nhập tên, email</Label>
            <Input
              id="tracking"
              value={trackingNumber}
              placeholder="Nhập tên, email"
              onChange={(e) => onTrackingNumberChange(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={onTrack} className="px-6">
              Tra cứu
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Bạn có thể tìm thấy mã đơn hàng trong email xác nhận
        </p>
      </CardContent>
    </Card>
  );
}
