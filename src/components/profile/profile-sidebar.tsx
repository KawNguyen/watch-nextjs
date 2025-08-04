"use client";

import { Heart, LockKeyholeIcon, MapPin, Package, RotateCcw, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const menuItems = [
  { id: "profile", label: "Thông tin cá nhân", icon: User },
  { id: "orders", label: "Lịch sử đơn hàng", icon: Package },
  { id: "return-request", label: "Yêu cầu trả hàng", icon: RotateCcw },
  { id: "addresses", label: "Địa chỉ", icon: MapPin },
  { id: "favorites", label: "Yêu thích", icon: Heart },
  { id: "password", label: "Mật khẩu", icon: LockKeyholeIcon },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = pathname?.split("/")[2] || "profile";

  return (
    <Card>
      <CardContent className="p-6 overflow-hidden">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentTab === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => router.push(`/account/${item.id}`)}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
