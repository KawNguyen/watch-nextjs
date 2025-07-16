"use client";

import { Filter } from "lucide-react";
import { useBrandQuery } from "@/queries/brand";
import FilterList from "./filter-list";
import { useMovements } from "@/queries/movement";
import { useMaterials } from "@/queries/material";
import { useBandMaterials } from "@/queries/band-material";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceRangeSlider } from "./price-range-slider";
import { Button } from "@/components/ui/button";
import GenderFilter from "./gender-filter";
import { cn } from "@/lib/utils";
import { useWatchFilters } from "@/hooks/use-watches-filters";

interface WatchFiltersProps {
  className?: string;
}

export default function WatchFilters({ className }: WatchFiltersProps) {
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
    selectedGenders,
    setPriceRange,
    toggleBrand,
    toggleMovement,
    toggleMaterial,
    toggleBandMaterial,
    toggleGender,
    clearAll,
    activeFilterCount,
  } = useWatchFilters();

  const isLoading =
    isBrandLoading ||
    isMovementLoading ||
    isMaterialLoading ||
    isBandMaterialLoading;

  if (isLoading)
    return (
      <div className="size-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8" />

            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-8 w-32" />
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
    <div className={cn("size-full", className)}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <span className="font-semibold text-xl text-muted-foreground">
            Filters
          </span>
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>
      <div className="mt-4 space-y-4">
        <PriceRangeSlider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={10000}
          step={100}
        />
        <GenderFilter
          selectedGenders={selectedGenders}
          onToggleGender={toggleGender}
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
