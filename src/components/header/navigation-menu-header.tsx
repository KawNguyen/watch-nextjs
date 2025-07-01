import { navigation } from "@/constant/routes";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import NavigationBrand from "./navigation-item/navigation-brand";
import NavigationGender from "./navigation-item/navigation-gender";
import { Home } from "lucide-react";
import Link from "next/link";

const NavigationMenuHeader = () => {
  return (
    <div className="bg-gray-50 border-y">
      <div className="container mx-auto px-4">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex gap-6 z-20">
            <NavigationMenuItem>
              <Link href={"/"}>
                <Home size={16} />
              </Link>
            </NavigationMenuItem>

            <NavigationBrand brands={navigation.brand} />

            <NavigationGender gender={navigation.gender} />

            <NavigationMenuItem>
              <Link href={"/promotion"}>Promotion</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={"/blog"}>Blog</Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href={"/support/contact"}>Contact</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavigationMenuHeader;
