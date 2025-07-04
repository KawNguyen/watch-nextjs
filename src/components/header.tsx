"use client";

import { Heart, LogOut, User, UserCog } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PanelWrapper from "./header/pannel-wrapper";

import NavigationMenuHeader from "./header/navigation-menu-header";
import { CartSheet } from "./cart-sheet";
import SearchBar from "./sreach/sreach";
import NotificationDropdown from "./notifications/notifications";


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
          <SearchBar />
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/wishlist">
                  <Heart />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Favorites</p>
              </TooltipContent>


            </Tooltip>

            <CartSheet />

            <NotificationDropdown />
            
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
                  <p>Log in</p>
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
