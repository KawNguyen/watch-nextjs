"use client";

import { routes } from "@/constant/routes";
import { useAuthStore } from "@/store/auth";
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

const Header = () => {
  const { getUser, isAuthenticated, logout } = useAuthStore();
  console.log(getUser())
  const router = useRouter();
  const user = getUser();


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
                    <AvatarImage src={user?.avatar} className="object-cover" />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.firstName} {user?.lastName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/")}>
                    <UserCog />
                    Profile
                  </DropdownMenuItem> 
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
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
