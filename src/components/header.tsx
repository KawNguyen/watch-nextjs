"use client";

import { Heart, LogOut, Search, User, UserCog } from "lucide-react";
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
import { useAuth } from "./providers/auth-context";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PanelWrapper from "./header/pannel-wrapper";
import NavigationMenuHeader from "./header/navigation-menu-header";
import { CartSheet } from "./cart-sheet";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated, profile, logout } = useAuth();

  return (
    <header className="w-full bg-white z-10">
      <PanelWrapper />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href={"/"} className="text-3xl">
              KronLux
            </Link>
          </div>
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="What are you looking for"
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/account/favorites">
                  <Heart />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Favorite</p>
              </TooltipContent>
            </Tooltip>

            <CartSheet />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center outline-none cursor-pointer"
                  asChild
                >
                  <Avatar>
                    <AvatarImage
                      src={profile?.avatar?.absolute_url ?? undefined}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {profile?.firstName?.charAt(0).toUpperCase()}
                      {profile?.lastName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {profile?.firstName} {profile?.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => router.push("/account/profile")}
                  >
                    <UserCog className="mr-2 h-4 w-4" />
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/sign-in">
                    <User />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign In</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <NavigationMenuHeader />
    </header>
  );
};

export default Header;
