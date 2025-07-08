"use client";

import Image from "next/image";
import { useWatchesQuery } from "@/queries";
import WatchFilters from "./watch-filters";

import WatchList from "./watch-list";

import PaginationControl from "@/components/pagination-control";
import { useState } from "react";

export default function WatchesContainer({ brand }: { brand?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: watches } = useWatchesQuery(currentPage, brand);

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
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <WatchFilters />
          </div>
          <div className="col-span-9 space-y-8">
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
        </div>
      </div>
    </main>
  );
}
