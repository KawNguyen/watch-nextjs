"use client";

import { routes } from "@/constant/routes";
import { useAuthStore } from "@/store/auth";
import { Heart, LogIn, LogOut, Search, ShoppingBag, UserCog } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

const Header = () => {
  const { getUser, isAuthenticated, logout } = useAuthStore();
  const user = getUser();
  const router = useRouter();
  console.log(getUser());
  return (
    <header className="w-full h-20 content-center bg-slate-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4 text-xl w-[20%]">
          {routes.map((route, index) => (
            <Link key={index} href={route.path}>
              {route.name}
            </Link>
          ))}
        </div>
        <div className="text-3xl font-medium">KronLux</div>
        <div className="flex items-center gap-4 w-[20%] justify-end">
          <Search />
          <Link href="/">
            <Heart />
          </Link>
          <Link href="/">
            <ShoppingBag />
          </Link>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
                <Avatar>
                  <AvatarImage src={user?.avatar} className="object-cover" />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>
                  <UserCog />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
