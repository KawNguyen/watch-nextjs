import { Card, CardContent } from "@/components/ui/card";
import { SearchResults } from "./search-results";
import { SearchSuggestions } from "./search-suggestions";
import { Product } from "@/constant/routes";

interface SearchDropdownProps {
  isOpen: boolean;
  searchQuery: string;
  filteredProducts: Product[];
  popularSearches: string[];
  recentSearches: string[];
  onSearchSelect: (query: string) => void;
  onBuy?: (product: Product) => void;
  onViewAll?: () => void;
}

export function SearchDropdown({
  isOpen,
  searchQuery,
  filteredProducts,
  popularSearches,
  recentSearches,
  onSearchSelect,
  onBuy,
  onViewAll,
}: SearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg max-h-96 overflow-hidden">
      <CardContent className="p-0">
        {searchQuery ? (
          <SearchResults
            query={searchQuery}
            products={filteredProducts}
            onBuy={onBuy}
            onViewAll={onViewAll}
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
