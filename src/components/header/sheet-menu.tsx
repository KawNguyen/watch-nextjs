"use client";

import { useState } from "react";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  User,
  Home,
  Grid3X3,
  Users,
  LogIn,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import WatchSearchBar from "../search-bar";

const mockUser = {
  isLoggedIn: true,
  firstName: "Nguyễn",
  lastName: "Văn An",
  email: "nguyenvanan@example.com",
  avatar: "/placeholder.svg?height=40&width=40&text=User",
};

const menuItems = [
  {
    id: "home",
    title: "Trang chủ",
    icon: Home,
    href: "/",
  },
  {
    id: "collection",
    title: "Bộ sưu tập",
    icon: Grid3X3,
    href: "/collections",
  },
  {
    id: "men",
    title: "Nam",
    icon: Users,
    submenu: [
      {
        title: "Brand",
        href: "/men/brand",
        children: [
          { title: "Rolex", value: "rolex", queryKey: "brands" },
          {
            title: "Daniel Wellington",
            value: "daniel-wellington",
            queryKey: "brands",
          },
          { title: "Casio", value: "casio", queryKey: "brands" },
          { title: "Tissot", value: "tissot", queryKey: "brands" },
        ],
      },
      {
        title: "Material",
        href: "/men/material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "materials",
          },
          { title: "Vàng", value: "gold", queryKey: "materials" },
          { title: "Bạc", value: "silver", queryKey: "materials" },
        ],
      },
      {
        title: "Band Material",
        href: "/men/band-material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "bandMaterials",
          },
          { title: "Da cá sâu", value: "leather", queryKey: "bandMaterials" },
          { title: "Vàng", value: "gold", queryKey: "bandMaterials" },
          { title: "Bạc", value: "silver", queryKey: "bandMaterials" },
        ],
      },
    ],
  },
  {
    id: "women",
    title: "Nữ",
    icon: Users,
    submenu: [
      {
        title: "Brand",
        href: "/women/brand",
        children: [
          { title: "Rolex", value: "rolex", queryKey: "brands" },
          { title: "DW", value: "dw", queryKey: "brands" },
          { title: "Casio", value: "casio", queryKey: "brands" },
          { title: "Tissot", value: "tissot", queryKey: "brands" },
        ],
      },
      {
        title: "Material",
        href: "/women/material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "materials",
          },
          { title: "Vàng", value: "gold", queryKey: "materials" },
          { title: "Bạc", value: "silver", queryKey: "materials" },
        ],
      },
      {
        title: "Band Material",
        href: "/women/band-material",
        children: [
          {
            title: "Thép không rỉ",
            value: "stainless-steel",
            queryKey: "bandMaterials",
          },
          { title: "Da cá sâu", value: "leather", queryKey: "bandMaterials" },
          { title: "Vàng", value: "gold", queryKey: "bandMaterials" },
          { title: "Bạc", value: "silver", queryKey: "bandMaterials" },
        ],
      },
    ],
  },
];

export default function MobileSheetMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleMenuClick = (path: string, queryKey?: string, value?: string) => {
    setIsOpen(false);

    if (queryKey && value) {
      const url = new URLSearchParams();
      url.set(queryKey, value);

      // Add gender filter if from men/women path
      if (path.includes("/men")) url.set("genders", "MEN");
      if (path.includes("/women")) url.set("genders", "WOMEN");

      router.push(`/collections?${url.toString()}`);
    } else {
      router.push(path);
    }
  };

  const handleLogin = () => {
    setIsOpen(false);
    router.push("/login");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // In real case: signOut()
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Mở menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <nav className="space-y-2">
            <WatchSearchBar />
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus.includes(item.id);

              if (item.submenu) {
                return (
                  <Collapsible
                    key={item.id}
                    open={isExpanded}
                    onOpenChange={() => toggleMenu(item.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-12 px-3 text-left font-medium hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-8 space-y-1 mt-1">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.title}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-10 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
                            onClick={() => handleMenuClick("/collections")}
                          >
                            {subItem.title}
                          </Button>
                          {subItem.children && (
                            <div className="ml-4 space-y-1">
                              {subItem.children.map((childItem) => (
                                <Button
                                  key={childItem.title}
                                  variant="ghost"
                                  className="w-full justify-start h-9 px-3 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                  onClick={() =>
                                    handleMenuClick(
                                      subItem.href,
                                      childItem.queryKey,
                                      childItem.value
                                    )
                                  }
                                >
                                  • {childItem.title}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start h-12 px-3 font-medium hover:bg-gray-100"
                  onClick={() => handleMenuClick(item.href)}
                >
                  <Icon className="h-5 w-5 mr-1" />
                  {item.title}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t bg-gray-50">
          {mockUser.isLoggedIn ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white border">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mockUser.avatar} alt="User avatar" />
                  <AvatarFallback className="bg-blue-500 text-white">
                    {mockUser.firstName.charAt(0)}
                    {mockUser.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {mockUser.firstName} {mockUser.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {mockUser.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleMenuClick("/account")}
                >
                  Tài khoản
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-6 bg-white rounded-lg border">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-4">
                  Đăng nhập để trải nghiệm tốt hơn
                </p>
                <Button className="w-full" onClick={handleLogin}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
