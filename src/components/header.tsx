import { routes } from "@/constant/routes";
import { Heart, LogIn, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

const Header = () => {
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
        <div className="flex gap-4 w-[20%] justify-end">
          <Search />
          <Link href="/">
            <Heart />
          </Link>
          <Link href="/">
            <ShoppingBag />
          </Link>
          <Link href="/sign-in">
            <LogIn />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
