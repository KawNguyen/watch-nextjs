"use client";

import { Heart, LockKeyholeIcon, MapPin, Package, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const menuItems = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "password", label: "Password", icon: LockKeyholeIcon },
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
