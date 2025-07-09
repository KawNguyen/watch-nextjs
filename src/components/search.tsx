"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { searchProducts } from "@/constant/routes";
import { Input } from "./ui/input";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN").format(price) + "đ";

const getDiscountPercentage = (price: number, originalPrice: number) =>
  Math.round(((originalPrice - price) / originalPrice) * 100);

const SearchBar = () => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchProducts.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    }
    if (showSearchDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchDropdown]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSearchDropdown(false);
    }
  };

  return (
    <div className="flex-1 max-w-xl mx-8" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        <Input
          type="search"
          placeholder="What are you looking for"
          className="pl-10 pr-10 w-full h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          onFocus={() => setShowSearchDropdown(true)}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {searchValue && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100 rounded"
            onClick={() => {
              setSearchValue("");
              setShowSearchDropdown(false);
            }}
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}

        {showSearchDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  {searchResults.length} Products Found
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={product.href}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      onClick={() => setShowSearchDropdown(false)}
                    >
                      <div className="flex-shrink-0">
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.title}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover border border-gray-200"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
                            {product.category}
                          </span>
                          {product.inStock ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-200 text-green-600 bg-white">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-200 text-red-600 bg-white">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-red-600">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <div className="flex flex-col items-end">
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
                                -
                                {getDiscountPercentage(
                                  product.price,
                                  product.originalPrice
                                )}
                                %
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : searchValue ? (
              <div className="px-4 py-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Search className="h-8 w-8 mx-auto" />
                </div>
                <p className="text-gray-600 font-medium">No products found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try different keywords or check spelling
                </p>
              </div>
            ) : (
              <div className="px-4 py-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Motherboard", "Watch", "Gaming", "Premium"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 bg-white text-xs font-medium hover:bg-gray-100"
                      onClick={() => {
                        setSearchValue(tag);
                        setShowSearchDropdown(true);
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
