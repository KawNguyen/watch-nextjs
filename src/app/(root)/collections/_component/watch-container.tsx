"use client";

import Image from "next/image";
import WatchFilters from "./watch-filters";
import { Input } from "@/components/ui/input";
import WatchList from "./watch-list";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationControl from "@/components/pagination-control";
import { useState } from "react";
import { useBrandQuery } from "@/queries/brand";
import WatchBrand from "@/app/(root)/collections/_component/watch-brand";
import { useWatchesQuery } from "@/queries/watches";

export default function WatchesContainer({ brand }: { brand?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: watches, isPending: isWatchesLoading } = useWatchesQuery(
    currentPage,
    brand,
  );
  const { data: brands, isPending: isBrandsLoading } = useBrandQuery();

  const isLoading = isWatchesLoading || isBrandsLoading;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="container mx-auto py-10">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <WatchFilters />
            <Input placeholder="Search" />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="h-[400px] rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <WatchBrand brands={brands?.data.items} />

            <div className="mt-6 space-y-6">
              <WatchList watchesData={watches?.data.items} />
              {watches?.data?.items?.length &&
              watches?.data?.items?.length > 0 &&
              watches?.meta ? (
                <PaginationControl
                  currentPage={currentPage}
                  totalPages={watches.meta.totalPages}
                  onPageChange={handlePageChange}
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
