"use client";

import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Product } from "@/constant/routes";

interface ProductItemProps {
  product: Product;
  onBuy?: (product: Product) => void;
}

export function ProductItem({ product, onBuy }: ProductItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price / 25000);
  };

  return (
    <div className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
      <div className="flex gap-3">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-1">
            {product.brand}
          </div>
          <h4 className="font-medium text-sm line-clamp-2 mb-1">
            {product.name}
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
            {product.isNew && (
              <Badge className="text-xs py-0 px-1 bg-green-500">New</Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-bold text-primary text-sm">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice > product.price && (
                <div className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
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
    </div>
  );
}
