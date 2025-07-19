import { Card, CardContent } from "@/components/ui/card";
import { SearchResults } from "./search-results";
import { SearchSuggestions } from "./search-suggestions";
import type { ApiResponse, Watch } from "@/types/watch";

interface SearchDropdownProps {
  isOpen: boolean;
  isSearching?: boolean;
  searchQuery: string;
  products?: { pages: ApiResponse<Watch>[] };
  popularSearches: string[];
  recentSearches: string[];
  onSearchSelect: (query: string) => void;
  onBuy?: (product: Watch) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function SearchDropdown({
  isOpen,
  isSearching,
  searchQuery,
  products,
  popularSearches,
  recentSearches,
  onSearchSelect,
  onBuy,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg max-h-96 overflow-hidden">
      <CardContent className="p-0">
        {searchQuery.trim() ? (
          <SearchResults
            isSearching={isSearching}
            products={products}
            query={searchQuery}
            onBuy={onBuy}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : (
          <SearchSuggestions
            popularSearches={popularSearches}
            recentSearches={recentSearches}
            onSearchSelect={onSearchSelect}
          />
        )}
      </CardContent>
    </Card>
  );
}
