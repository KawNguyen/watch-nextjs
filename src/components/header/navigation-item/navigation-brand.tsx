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
      <NavigationMenuTrigger className="px-4 py-2">Thương hiệu</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid grid-cols-2 md:w-[440px] lg:w-[560px]">
          <div className="p-6 border-r border-gray-200">
            <h3 className="text-sm px-2 font-semibold text-gray-900 mb-3">
              Thương hiệu
            </h3>
            <div className="grid grid-cols-2 gap-1 w-max">
              {brands.map((brand, index) => (
                <div
                  key={brand.name}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={`/collections?brands=${brand.value}`}
                    className={`block p-2 rounded-md text-sm transition-colors 
                      text-gray-700 hover:bg-gray-200`}
                  >
                    {brand.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="h-full">
            <AspectRatio ratio={3 / 4} className="bg-white">
              <Image
                src={currentBrand.logo}
                alt={`${currentBrand.name} logo`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
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
