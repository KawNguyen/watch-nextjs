"use client";

import { TrendingUp, History, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SearchSuggestionsProps {
  popularSearches: string[];
  recentSearches: string[];
  onSearchSelect: (query: string) => void;
}

export function SearchSuggestions({
  popularSearches,
  recentSearches,
  onSearchSelect,
}: SearchSuggestionsProps) {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Sản phẩm phổ biến
        </h4>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => onSearchSelect(search)}
            >
              {search}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <History className="h-4 w-4 mr-2" />
          Tìm kiếm gần đây
        </h4>
        <div className="space-y-1">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSearchSelect(search)}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded-md text-sm flex items-center"
            >
              <Clock className="h-3 w-3 mr-2 text-muted-foreground" />
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
