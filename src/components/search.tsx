"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  popularSearches,
  Product,
  recentSearches,
  watchProducts,
} from "@/constant/routes";
import { SearchDropdown } from "./search/search-dropdown";

export default function WatchSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(watchProducts);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSelect = (query: string) => {
    console.log("Searching for:", query);
    setSearchQuery(query);
    setIsSearchOpen(false);
  };

  const handleBuy = (product: Product) => {
    console.log("Buying product:", product);
  };

  const handleViewAll = () => {
    setIsSearchOpen(false);
  };

  const filterProducts = () => {
    if (!searchQuery) {
      setFilteredProducts(watchProducts);
      return;
    }

    const filtered = watchProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for watches by brand, model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="pl-10 pr-4 h-12 text-base border-2 focus:border-primary"
          />
        </div>

        <SearchDropdown
          isOpen={isSearchOpen}
          searchQuery={searchQuery}
          filteredProducts={filteredProducts}
          popularSearches={popularSearches}
          recentSearches={recentSearches}
          onSearchSelect={handleSearchSelect}
          onBuy={handleBuy}
          onViewAll={handleViewAll}
        />
      </div>
    </div>
  );
}
