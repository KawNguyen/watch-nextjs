"use client";

import { Clock, Loader2 } from "lucide-react";
import { ProductItem } from "./product-item";
import { Product } from "@/constant/routes";

interface SearchResultsProps {
  isSearching?: boolean;
  query: string;
  products: any;
  onBuy?: (product: Product) => void;
}

export function SearchResults({
  isSearching,
  query,
  products,
  onBuy,
}: SearchResultsProps) {
  if (isSearching) {
    return (
      <div className="h-96 size-full flex items-center justify-center">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  if (products.meta.totalItems === 0) {
    return (
      <div className="p-8 text-center">
        <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <div className="text-sm font-medium mb-1">No products found</div>
        <div className="text-xs text-muted-foreground">
          Try different keywords or check spelling
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-4 border-b bg-muted/50">
        <div className="text-sm font-medium">
          Search results for "{query}" ({products?.meta.totalItems} products)
        </div>
      </div>
      <div className="divide-y">
        {products?.data.items.map((product: any) => (
          <ProductItem key={product.id} product={product} onBuy={onBuy} />
        ))}
      </div>
    </div>
  );
}
