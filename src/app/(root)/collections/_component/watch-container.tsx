"use client";

import Image from "next/image";
import { useWatchesQuery } from "@/queries";
import WatchFilters from "./watch-filters";

import WatchList from "./watch-list";

import PaginationControl from "@/components/pagination-control";
import { useEffect, useMemo, useState } from "react";
import { useWatchFilters } from "@/hooks/use-watch-filters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import FilterSidebar from "./filter-sidebar";

type SortOption = "a-z" | "price-low" | "price-high" | "z-a" | "rating";

export default function WatchesContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const { filterQuery } = useWatchFilters();

  useEffect(() => {
    setCurrentPage(1);
  }, [filterQuery]);

  const queryParams = useMemo(
    () => ({
      page: currentPage,
      ...filterQuery,
    }),
    [currentPage, filterQuery]
  );

  const {
    data: watches,
    refetch,
    isLoading,
  } = useWatchesQuery(currentPage, queryParams);

  useEffect(() => {
    refetch();
  }, [filterQuery, refetch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showPagination = useMemo(() => {
    return (
      watches?.data?.items?.length &&
      watches?.data?.items?.length > 0 &&
      watches?.meta?.totalPages > 1
    );
  }, [watches?.data?.items?.length, watches?.meta?.totalPages]);

  return (
    <main>
      <div className="w-full h-[300px] relative flex justify-center items-center">
        <Image
          src="/images/watch.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50 size-full backdrop-blur-xs"></div>
        <h2 className="relative text-white text-4xl font-bold text-center">
          Elevate Every Moment - Discover Your Watch
        </h2>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <WatchFilters />
          </div>
          <div className="col-span-full lg:col-span-9 space-y-8">
            <div className="flex items-center justify-between text-muted-foreground">
              <div>
                <FilterSidebar className="pt-9"/>
                {watches?.meta?.totalItems !== undefined &&
                watches?.meta?.limit !== undefined &&
                watches?.meta?.totalItems > watches?.meta?.limit ? (
                  <span className="hidden lg:block">
                    Showing {watches?.meta?.limit} of{" "}
                    {watches?.meta?.totalItems}
                  </span>
                ) : (
                  <span className="hidden lg:block">
                    Showing {watches?.meta?.totalItems ?? 0} of{" "}
                    {watches?.meta?.totalItems ?? 0}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {watches?.meta?.totalItems !== undefined &&
                watches?.meta?.limit !== undefined &&
                watches?.meta?.totalItems > watches?.meta?.limit ? (
                  <span className="lg:hidden">
                    Showing {watches?.meta?.limit} of{" "}
                    {watches?.meta?.totalItems}
                  </span>
                ) : (
                  <span className="lg:hidden">
                    Showing {watches?.meta?.totalItems ?? 0} of{" "}
                    {watches?.meta?.totalItems ?? 0}
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpDown className="h-4 w-4" />
                      Sort by
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as SortOption)}
                    >
                      <DropdownMenuRadioItem value="a-z">
                        Name: A - Z
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="z-a">
                        Name: Z - A
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-low">
                        Price: Low to High
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-high">
                        Price: High to Low
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="rating">
                        Highest Rated
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <WatchList
              watchesData={watches?.data.items}
              isFetching={isLoading}
            />

            {showPagination && (
              <PaginationControl
                currentPage={currentPage}
                totalPages={watches?.meta.totalPages || 1}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
