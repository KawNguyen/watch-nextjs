"use client";

import { cn } from "@/lib/utils";
import { Brand } from "@/types/brand";
import Link from "next/link";
import { buttonVariants } from "../../../../components/ui/button";
import { usePathname } from "next/navigation";

interface WatchBrandProps {
  brands: Brand[] | undefined;
}

export default function WatchBrand({ brands }: WatchBrandProps) {
  const pathname = usePathname();

  return (
    <div className="mt-4 gap-4 flex justify-center items-center">
      <Link
        className={cn(
          buttonVariants({
            variant: pathname === "/collections" ? "default" : "outline",
          }),
        )}
        href="/collections"
      >
        All
      </Link>
      {brands?.map((brand) => (
        <Link
          key={brand.id}
          className={cn(
            buttonVariants({
              variant:
                pathname === `/${brand.slug}/collections` ? "default" : "outline",
            }),
          )}
          href={`/${brand.slug}/collections`}
        >
          {brand.name}
        </Link>
      ))}
    </div>
  );
}