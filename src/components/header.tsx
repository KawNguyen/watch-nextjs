"use client";

import { routes } from "@/constant/routes";
import {
  Heart,
  LogIn,
  LogOut,
  Search,
  ShoppingBag,
  UserCog,
} from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/auth";
import { useAuth } from "./providers/auth-context";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated, profile, logout } = useAuth();
  const mutateLogout = useMutation({
    mutationFn: async () => await authApi.logout(),
    onSuccess: () => {
      logout();
      router.push("/");
    },
  });

  return (
    <header className="w-full h-20 content-center bg-slate-300">
      <main className="container mx-auto flex justify-between items-center">
        <nav className="w-[20%]">
          <ul className="flex gap-4 text-xl">
            {routes.map((route, index) => (
              <li key={index}>
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/" className="text-3xl font-medium">
          KronLux
        </Link>

        <ul className="flex items-center gap-4 w-[20%] justify-end">
          <li>
            <Search />
          </li>
          <li>
            <Link href="/">
              <Heart />
            </Link>
          </li>
          <li>
            <Link href="/">
              <ShoppingBag />
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center space-x-2 outline-none"
                  asChild
                >
                  <Avatar>
                    <AvatarImage
                      src={profile?.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {profile?.firstName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {profile?.firstName} {profile?.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/")}>
                    <UserCog />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => mutateLogout.mutate()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <LogIn />
              </Link>
            )}
          </li>
        </ul>
      </main>
    </header>
  );
};

export default Header;
