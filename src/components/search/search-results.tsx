"use client";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductItem } from "./product-item";
import { Product } from "@/constant/routes";

interface SearchResultsProps {
  query: string;
  products: Product[];
  onBuy?: (product: Product) => void;
  onViewAll?: () => void;
  maxResults?: number;
}

export function SearchResults({
  query,
  products,
  onBuy,
  onViewAll,
  maxResults = 6,
}: SearchResultsProps) {
  const displayedProducts = products.slice(0, maxResults);
  const hasMoreResults = products.length > maxResults;

  if (products.length === 0) {
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
          Search results for "{query}" ({products.length} products)
        </div>
      </div>
      <div className="divide-y">
        {displayedProducts.map((product) => (
          <ProductItem key={product.id} product={product} onBuy={onBuy} />
        ))}
        {hasMoreResults && (
          <div className="p-4 text-center border-t bg-muted/30">
            <Button variant="outline" size="sm" onClick={onViewAll}>
              View all {products.length} products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
