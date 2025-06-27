"use client";

import { Heart, LockKeyholeIcon, MapPin, Package, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProps } from "@/types/auth";

const menuItems = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "orders", label: "Order History", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "password", label: "Password", icon: LockKeyholeIcon },
];

export function ProfileSidebar({ user }: { user: UserProps | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = pathname?.split("/")[2] || "profile";

  return (
    <Card>
      <CardContent className="p-6 overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={user?.avatar?.absolute_url ?? undefined}
              alt="Profile"
            />
            <AvatarFallback>
              {user?.firstName?.charAt(0).toUpperCase()}
              {user?.lastName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <h3 className="font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
              {user?.email || ""}
            </p>
          </div>
        </div>
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
