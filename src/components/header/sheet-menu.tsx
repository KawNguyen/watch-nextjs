  "use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, User, Menu, ChevronRight, ChevronDown } from "lucide-react";
import { navigation } from "@/constant/routes";
import { useState } from "react";const SheetMenu = () => {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="sr-only">Open menu</span>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full sm:max-w-sm flex flex-col h-full">
        <div>
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-xl font-bold text-gray-900">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex-1 overflow-y-auto">
            <div className="space-y-1 p-2">
              <SheetClose asChild>
                <Link href="/collections" className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Collections
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </SheetClose>
              
              {/* Brands Navigation */}
              <div className="px-4 py-2">
                <button 
                  onClick={() => setBrandsOpen(!brandsOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-800 mb-2"
                >
                  <span>Brands</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${brandsOpen ? 'transform rotate-90' : ''}`} />
                </button>
                <div className={`space-y-1 ${brandsOpen ? 'block' : 'hidden'}`}>
                  {navigation.brand.map((brand, index) => (
                    <SheetClose key={index} asChild>
                      <Link 
                        href={`/brand/${brand.value}`} 
                        className="flex items-center justify-between px-2 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {brand.name}
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>

              {/* Gender Navigation */}
              <div className="px-4 py-2">
                <button 
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium text-gray-800 mb-2"
                >
                  <span>Categories</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${categoriesOpen ? 'transform rotate-90' : ''}`} />
                </button>
                <div className={`space-y-1 ${categoriesOpen ? 'block' : 'hidden'}`}>
                  {navigation.gender.map((item, index) => (
                    <SheetClose key={index} asChild>
                      <Link 
                        href={`/collections?gender=${item.value}`} 
                        className="flex items-center justify-between px-2 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.title}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>

              <SheetClose asChild>
                <Link href="/promotion" className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Promotion
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/blog" className="flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Blog
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </SheetClose>
            </div>
          </nav>
        </div>

        <SheetFooter className="mt-auto border-t">
          <div className="grid grid-cols-2 gap-px bg-gray-100">
            <SheetClose asChild>
              <Link 
                href="/account/profile" 
                className="flex flex-col items-center gap-1 py-4 text-gray-700 hover:text-blue-600 bg-white transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="text-xs font-medium">Profile</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                href="/account/favorites" 
                className="flex flex-col items-center gap-1 py-4 text-gray-700 hover:text-pink-600 bg-white transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span className="text-xs font-medium">Favorites</span>
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;