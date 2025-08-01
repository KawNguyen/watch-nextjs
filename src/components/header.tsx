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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PanelWrapper from "./header/pannel-wrapper";
import NavigationMenuHeader from "./header/navigation-menu-header";
import { useAuth } from "@/mutation/auth.mutation";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "./cart/cart-sheet";
import NotificationDropdown from "./notifications/notifications";
import SearchBar from "./search-bar";
import SheetMenu from "./header/sheet-menu";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isAuthenticated, profile, logout } = useAuth();

  return (
    <header className="w-full bg-white z-10">
      {!isMobile && <PanelWrapper />}
      <div className="container mx-auto px-4 md:py-4 py-2">
        <div className="flex items-center justify-between">
          {isMobile && <SheetMenu />}

          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo/logo-black.png"
                alt="logo"
                width={80}
                height={80}
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {!isMobile && <SearchBar />}

          <div className="flex items-center gap-4">
            {!isMobile && (
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
            )}

            <CartSheet />

            <NotificationDropdown />

            {!isMobile &&
              (isAuthenticated ? (
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
                    <DropdownMenuItem onClick={() => logout()}>
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
              ))}
          </div>
        </div>
      </div>
      {!isMobile && <NavigationMenuHeader />}
    </header>
  );
};

export default Header;
