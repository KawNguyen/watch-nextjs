"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export interface WatchFilters {
  priceRange: [number, number];
  selectedBrands: string[];
  selectedMovements: string[];
  selectedMaterials: string[];
  selectedBandMaterials: string[];
}

export function useWatchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL params
  const [priceRange, setPriceRangeState] = useState<[number, number]>(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    return [
      minPrice ? parseInt(minPrice) : 0,
      maxPrice ? parseInt(maxPrice) : 10000,
    ];
  });

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brands = searchParams.get("brands");
    return brands ? brands.split(",") : [];
  });

  const [selectedMovements, setSelectedMovements] = useState<string[]>(() => {
    const movements = searchParams.get("movements");
    return movements ? movements.split(",") : [];
  });

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(() => {
    const materials = searchParams.get("materials");
    return materials ? materials.split(",") : [];
  });

  const [selectedBandMaterials, setSelectedBandMaterials] = useState<string[]>(
    () => {
      const bandMaterials = searchParams.get("bandMaterials");
      return bandMaterials ? bandMaterials.split(",") : [];
    }
  );

  // Update URL when filters change
  const updateUrl = useCallback(
    (currentFilters: WatchFilters, updatedParams: Partial<WatchFilters>) => {
      const params = new URLSearchParams();

      // Get current state with updates applied
      const finalState = { ...currentFilters, ...updatedParams };

      // Handle price range
      const [min, max] = finalState.priceRange;
      if (min > 0) {
        params.set("minPrice", min.toString());
      }
      if (max < 10000) {
        params.set("maxPrice", max.toString());
      }

      // Handle array filters
      const arrayFilters = [
        { key: "brands", value: finalState.selectedBrands },
        { key: "movements", value: finalState.selectedMovements },
        { key: "materials", value: finalState.selectedMaterials },
        { key: "bandMaterials", value: finalState.selectedBandMaterials },
      ];

      arrayFilters.forEach(({ key, value }) => {
        if (value && value.length > 0) {
          params.set(key, value.join(","));
        }
      });

      // Update URL without page reload
      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.push(newUrl, { scroll: false });
    },
    [router]
  );

  // Price range handlers
  const setPriceRange = useCallback(
    (range: [number, number]) => {
      setPriceRangeState(range);

      // Create current state snapshot
      const currentState = {
        priceRange: range,
        selectedBrands,
        selectedMovements,
        selectedMaterials,
        selectedBandMaterials,
      };

      updateUrl(currentState, { priceRange: range });
    },
    [
      selectedBrands,
      selectedMovements,
      selectedMaterials,
      selectedBandMaterials,
      updateUrl,
    ]
  );

  // Generic toggle function for array filters
  const toggleArrayFilter = useCallback(
    (
      currentItems: string[],
      setter: (items: string[]) => void,
      itemId: string,
      filterKey: keyof WatchFilters
    ) => {
      const newItems = currentItems.includes(itemId)
        ? currentItems.filter((id) => id !== itemId)
        : [...currentItems, itemId];

      setter(newItems);

      // Create current state snapshot with the updated array
      const currentState = {
        priceRange,
        selectedBrands,
        selectedMovements,
        selectedMaterials,
        selectedBandMaterials,
        [filterKey]: newItems,
      };

      updateUrl(currentState, { [filterKey]: newItems });
    },
    [
      priceRange,
      selectedBrands,
      selectedMovements,
      selectedMaterials,
      selectedBandMaterials,
      updateUrl,
    ]
  );

  // Individual toggle functions
  const toggleBrand = useCallback(
    (brandId: string) => {
      toggleArrayFilter(
        selectedBrands,
        setSelectedBrands,
        brandId,
        "selectedBrands"
      );
    },
    [selectedBrands, toggleArrayFilter]
  );

  const toggleMovement = useCallback(
    (movementId: string) => {
      toggleArrayFilter(
        selectedMovements,
        setSelectedMovements,
        movementId,
        "selectedMovements"
      );
    },
    [selectedMovements, toggleArrayFilter]
  );

  const toggleMaterial = useCallback(
    (materialId: string) => {
      toggleArrayFilter(
        selectedMaterials,
        setSelectedMaterials,
        materialId,
        "selectedMaterials"
      );
    },
    [selectedMaterials, toggleArrayFilter]
  );

  const toggleBandMaterial = useCallback(
    (bandMaterialId: string) => {
      toggleArrayFilter(
        selectedBandMaterials,
        setSelectedBandMaterials,
        bandMaterialId,
        "selectedBandMaterials"
      );
    },
    [selectedBandMaterials, toggleArrayFilter]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setPriceRangeState([0, 10000]);
    setSelectedBrands([]);
    setSelectedMovements([]);
    setSelectedMaterials([]);
    setSelectedBandMaterials([]);
    router.push("", { scroll: false });
  }, [router]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      priceRange[0] > 0 ||
      priceRange[1] < 10000 ||
      selectedBrands.length > 0 ||
      selectedMovements.length > 0 ||
      selectedMaterials.length > 0 ||
      selectedBandMaterials.length > 0
    );
  }, [
    priceRange,
    selectedBrands,
    selectedMovements,
    selectedMaterials,
    selectedBandMaterials,
  ]);

  // Filter query object for API calls
  const filterQuery = useMemo(
    () => ({
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 10000 ? priceRange[1] : undefined,
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      movements: selectedMovements.length > 0 ? selectedMovements : undefined,
      materials: selectedMaterials.length > 0 ? selectedMaterials : undefined,
      bandMaterials:
        selectedBandMaterials.length > 0 ? selectedBandMaterials : undefined,
    }),
    [
      priceRange,
      selectedBrands,
      selectedMovements,
      selectedMaterials,
      selectedBandMaterials,
    ]
  );

  return {
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
    clearFilters,
    hasActiveFilters,
    filterQuery,
  };
}
