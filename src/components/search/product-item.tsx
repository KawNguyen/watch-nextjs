"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Watch } from "@/types/watch";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";

interface ProductItemProps {
  product: Watch;
  onBuy?: (product: Watch) => void;
}

export function ProductItem({ product, onBuy }: ProductItemProps) {
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(price / 25000);
  // };

  return (
    <Link href={`/collections/${product.slug}`} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
      <div className="flex gap-3">
        <div className="size-16 relative overflow-hidden rounded-md">
          <AspectRatio ratio={1} className="">
            <Image
              src={product.images[0]?.absolute_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover flex-shrink-0"
            />
          </AspectRatio>
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-1">
            {product.brand.name}
          </div>
          <h4 className="font-medium text-sm line-clamp-2 mb-1">
            {product.name}
          </h4>
          <div className="flex items-center gap-2 mb-2"></div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-bold text-primary text-sm">
                {formatMoney(product.price)}
              </div>
            </div>
            <Button
              size="sm"
              className="h-7 px-3 text-xs"
              onClick={() => onBuy?.(product)}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Buy
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
