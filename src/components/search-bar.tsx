"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { popularSearches, Product, recentSearches } from "@/constant/routes";
import { SearchDropdown } from "./search/search-dropdown";
import { useWatchBySearchQuery } from "@/queries/watches";
import { useClickOutside } from "@/hooks/use-click-outside";
import useDebounce from "@/hooks/use-debounce";

export default function WatchSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchQueryDebounce = useDebounce(searchQuery, 300);

  const searchRef = useClickOutside(() => {
    setIsSearchOpen(false);
  });
  const { data: productsByKeyword, isLoading } =
    useWatchBySearchQuery(searchQueryDebounce);

  const handleSearchSelect = (query: string) => {
    console.log("Searching for:", query);
    setSearchQuery(query);
    setIsSearchOpen(false);
  };

  const handleBuy = (product: Product) => {
    console.log("Buying product:", product);
  };

  return (
    <div className="w-full lg:max-w-xl xl:max-w-4xl mx-auto p-2 sm:p-4">
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for watches by brand, model..."
            value={searchQueryDebounce}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="pl-10"
          />
        </div>

        <SearchDropdown
          isSearching={isLoading}
          products={productsByKeyword}
          isOpen={isSearchOpen}
          searchQuery={searchQueryDebounce}
          popularSearches={popularSearches}
          recentSearches={recentSearches}
          onSearchSelect={handleSearchSelect}
          onBuy={handleBuy}
        />
      </div>
    </div>
  );
}
