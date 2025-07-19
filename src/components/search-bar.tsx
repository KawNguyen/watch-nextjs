"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchDropdown } from "./search/search-dropdown";
import { useWatchBySearchQuery } from "@/queries/watches";
import { useClickOutside } from "@/hooks/use-click-outside";

import { popularSearches, recentSearches } from "@/constant/routes";
import useDebounce from "@/hooks/use-debounce";
import { Watch } from "@/types/watch";

export default function WatchSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const searchRef = useClickOutside(() => setIsSearchOpen(false));

  const {
    data: productsByKeyword,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWatchBySearchQuery(debouncedQuery);

  const handleSearchSelect = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(false);
  }, []);

  const handleBuy = useCallback((product: Watch) => {
    console.log("Buying product:", product);
    // Add your buy logic here
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  return (
    <div className="w-full lg:max-w-xl xl:max-w-4xl mx-auto p-2 sm:p-4">
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for watches by brand, model..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            className="pl-10"
          />
        </div>

        <SearchDropdown
          isSearching={isLoading}
          products={productsByKeyword}
          isOpen={isSearchOpen}
          searchQuery={debouncedQuery}
          popularSearches={popularSearches}
          recentSearches={recentSearches}
          onSearchSelect={handleSearchSelect}
          onBuy={handleBuy}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
