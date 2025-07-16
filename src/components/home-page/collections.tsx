"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useBrandQuery } from "@/queries/brand";
import { useWatchesQuery } from "@/queries/watches";
import { Watch } from "@/types/watch";
import { Brand } from "@/types/brand";
import WatchCard from "../watch-card";

const Collections = () => {
  const { data: brands, isLoading: brandsLoading } = useBrandQuery();
  const [activeCategory, setActiveCategory] = useState<Brand | null>(null);

  useEffect(() => {
    if (
      brands?.data?.items &&
      brands.data.items.length > 1 &&
      !activeCategory
    ) {
      setActiveCategory(brands.data.items[0]);
    }
  }, [brands, activeCategory]);

  const { data: watches, isLoading: watchesLoading } = useWatchesQuery(
    1,
    activeCategory?.slug ? { brands: [activeCategory.slug] } : undefined
  );

  const ProductSkeleton = () => (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="space-y-4 bg-gray-50 p-4 rounded-lg shadow-sm"
        >
          <Skeleton className="h-[240px] w-full rounded-lg" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </>
  );

  const BrandSkeleton = () => (
    <div className="flex justify-start sm:justify-center w-fit mx-auto gap-4 sm:gap-6 md:gap-8 px-4 py-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-10 w-24 rounded-full" />
      ))}
    </div>
  );

  const filteredWatches = watches?.data?.items || [];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Movement Catalogue
          </h2>
          <div className="w-40 h-1 bg-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our passion watch by movement type
          </p>
        </div>

        <div className="w-full overflow-x-auto scroll-smooth mb-12 no-scrollbar">
          {brandsLoading ? (
            <BrandSkeleton />
          ) : (
            <div className="flex justify-start sm:justify-center w-fit mx-auto gap-4 sm:gap-6 md:gap-8 px-4 py-2">
              {brands?.data?.items?.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 text-sm sm:text-base font-medium rounded-full whitespace-nowrap transition-all duration-300 
                    ${
                      activeCategory?.id === category.id
                        ? "bg-gray-900 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {watchesLoading ? (
            <ProductSkeleton />
          ) : filteredWatches?.length ? (
            filteredWatches
              .slice(0, 4)
              .map((item: Watch) => (
                <WatchCard watchData={item} key={item.id} />
              ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No watches found for this brand.
            </p>
          )}
        </div>

        {filteredWatches.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              className="group relative px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-300 flex items-center gap-2"
              onClick={() => {
                window.location.href = `/collections?brands=${activeCategory?.slug}`;
              }}
            >
              <span>View Collection</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collections;
