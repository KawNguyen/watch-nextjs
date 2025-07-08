"use client";

import { Filter } from "lucide-react";
import { useBrandQuery } from "@/queries/brand";
import FilterList from "./filter-list";
import { useMovements } from "@/queries/movement";
import { useMaterials } from "@/queries/material";
import { useBandMaterials } from "@/queries/band-material";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceRangeSlider } from "./price-range-slider";
import { useWatchFilters } from "@/hooks/use-watch-filters";

export default function WatchFilters() {
  const { data: brands, isLoading: isBrandLoading } = useBrandQuery();
  const { data: movements, isLoading: isMovementLoading } = useMovements();
  const { data: materials, isLoading: isMaterialLoading } = useMaterials();
  const { data: bandMaterials, isLoading: isBandMaterialLoading } =
    useBandMaterials();

  const {
    priceRange,
    selectedBrands,
    selectedMovements,
    selectedMaterials,
    selectedBandMaterials,
    setPriceRange,
    toggleBrand,
    toggleMovement,
    toggleMaterial,
    toggleBandMaterial,
  } = useWatchFilters();

  const isLoading =
    isBrandLoading ||
    isMovementLoading ||
    isMaterialLoading ||
    isBandMaterialLoading;

  if (isLoading)
    return (
      <div className="size-full">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <span className="font-semibold text-xl text-muted-foreground">
            Filters
          </span>
        </div>
        <div className="mt-4 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-5 w-24 mb-2" />
              <div className="space-y-2">
                {[...Array(3)].map((__, j) => (
                  <Skeleton key={j} className="h-4 w-full rounded-sm" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="size-full">
      <div className="flex items-center gap-2">
        <Filter className="size-4 text-muted-foreground" />
        <span className="font-semibold text-xl text-muted-foreground">
          Filters
        </span>
      </div>
      <div className="mt-4 space-y-4">
        <PriceRangeSlider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={10000}
          step={100}
        />
        <FilterList
          name="Brand"
          data={brands}
          selectedItems={selectedBrands}
          onToggleItem={toggleBrand}
        />
        <FilterList
          name="Movement"
          data={movements}
          selectedItems={selectedMovements}
          onToggleItem={toggleMovement}
        />
        <FilterList
          name="Material"
          data={materials}
          selectedItems={selectedMaterials}
          onToggleItem={toggleMaterial}
        />
        <FilterList
          name="Band Material"
          data={bandMaterials}
          selectedItems={selectedBandMaterials}
          onToggleItem={toggleBandMaterial}
        />
      </div>
    </div>
  );
}
