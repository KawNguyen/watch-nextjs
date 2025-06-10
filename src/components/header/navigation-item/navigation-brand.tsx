import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import Link from "next/link";
import { AspectRatio } from "../../ui/aspect-ratio";
import Image from "next/image";
import { useState } from "react";

interface Brand {
  name: string;
  value: string;
  logo: string;
}

interface NavigationBrandProps {
  brands: Brand[];
}

const NavigationBrand = ({ brands }: NavigationBrandProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentBrand = hoveredIndex !== null ? brands[hoveredIndex] : brands[0];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="px-4 py-2">Brand</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid grid-cols-2 md:w-[400px] lg:w-[500px]">
          <div className="p-6 border-r border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Brands</h3>
            <ul className="space-y-1">
              {brands.map((brand, index) => (
                <li
                  key={brand.name}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={`${brand.value}/collections`}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors 
                      text-gray-700 hover:bg-gray-200`}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full">
            <AspectRatio ratio={3 / 4} className="bg-white">
              <Image
                src={currentBrand.logo}
                alt={`${currentBrand.name} logo`}
                fill
                className="object-contain p-4 transition-opacity duration-300"
              />
            </AspectRatio>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavigationBrand;
