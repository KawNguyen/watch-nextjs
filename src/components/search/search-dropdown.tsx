import { Card, CardContent } from "@/components/ui/card";
import { SearchResults } from "./search-results";
import { SearchSuggestions } from "./search-suggestions";
import { Product } from "@/constant/routes";

interface SearchDropdownProps {
  isOpen: boolean;
  isSearching?: boolean;
  searchQuery: string;
  products: any;
  popularSearches: string[];
  recentSearches: string[];
  onSearchSelect: (query: string) => void;
  onBuy?: (product: Product) => void;
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
}: SearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg max-h-96 overflow-hidden">
      <CardContent className="p-0">
        {searchQuery ? (
          <SearchResults
            isSearching={isSearching}
            products={products}
            query={searchQuery}
            onBuy={onBuy}
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
