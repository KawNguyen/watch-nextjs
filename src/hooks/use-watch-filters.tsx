"use client";

import {
  useQueryStates,
  parseAsInteger,
  parseAsArrayOf,
  parseAsString,
} from "nuqs";
import { useCallback, useMemo } from "react";

export type Gender = "MEN" | "WOMEN" | "UNISEX";

export interface WatchFilters {
  priceRange: [number, number];
  selectedBrands: string[];
  selectedMovements: string[];
  selectedMaterials: string[];
  selectedBandMaterials: string[];
  selectedGenders: Gender[];
}

// Default values
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export function useWatchFilters() {
  const [filters, setFilters] = useQueryStates({
    minPrice: parseAsInteger.withDefault(DEFAULT_MIN_PRICE),
    maxPrice: parseAsInteger.withDefault(DEFAULT_MAX_PRICE),
    brands: parseAsArrayOf(parseAsString, ",").withDefault([]),
    movements: parseAsArrayOf(parseAsString, ",").withDefault([]),
    materials: parseAsArrayOf(parseAsString, ",").withDefault([]),
    bandMaterials: parseAsArrayOf(parseAsString, ",").withDefault([]),
    genders: parseAsArrayOf(parseAsString, ",").withDefault([]),
  });

  // Computed price range
  const priceRange = useMemo<[number, number]>(
    () => [filters.minPrice, filters.maxPrice],
    [filters.minPrice, filters.maxPrice]
  );

  // Price range handler
  const setPriceRange = useCallback(
    (range: [number, number]) => {
      const [min, max] = range;
      setFilters({
        minPrice: min > DEFAULT_MIN_PRICE ? min : null,
        maxPrice: max < DEFAULT_MAX_PRICE ? max : null,
      });
    },
    [setFilters]
  );

  // Generic toggle function
  const toggleArrayFilter = useCallback(
    (filterKey: keyof typeof filters, itemId: string) => {
      const currentItems = filters[filterKey] as string[];
      const newItems = currentItems.includes(itemId)
        ? currentItems.filter((id) => id !== itemId)
        : [...currentItems, itemId];

      setFilters({
        [filterKey]: newItems.length > 0 ? newItems : null,
      });
    },
    [filters, setFilters]
  );

  // Individual toggle functions
  const toggleBrand = useCallback(
    (brandId: string) => {
      toggleArrayFilter("brands", brandId);
    },
    [toggleArrayFilter]
  );

  const toggleMovement = useCallback(
    (movementId: string) => {
      toggleArrayFilter("movements", movementId);
    },
    [toggleArrayFilter]
  );

  const toggleMaterial = useCallback(
    (materialId: string) => {
      toggleArrayFilter("materials", materialId);
    },
    [toggleArrayFilter]
  );

  const toggleBandMaterial = useCallback(
    (bandMaterialId: string) => {
      toggleArrayFilter("bandMaterials", bandMaterialId);
    },
    [toggleArrayFilter]
  );

  const toggleGender = useCallback(
    (gender: Gender) => {
      toggleArrayFilter("genders", gender);
    },
    [toggleArrayFilter]
  );

  // Clear all filters - comprehensive reset
  const clearAll = useCallback(() => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      brands: null,
      movements: null,
      materials: null,
      bandMaterials: null,
      genders: null,
    });
  }, [setFilters]);

  // Clear specific filter categories
  const clearPriceRange = useCallback(() => {
    setFilters({
      minPrice: null,
      maxPrice: null,
    });
  }, [setFilters]);

  const clearBrands = useCallback(() => {
    setFilters({ brands: null });
  }, [setFilters]);

  const clearMovements = useCallback(() => {
    setFilters({ movements: null });
  }, [setFilters]);

  const clearMaterials = useCallback(() => {
    setFilters({ materials: null });
  }, [setFilters]);

  const clearBandMaterials = useCallback(() => {
    setFilters({ bandMaterials: null });
  }, [setFilters]);

  const clearGenders = useCallback(() => {
    setFilters({ genders: null });
  }, [setFilters]);

  // Reset to default values (alternative to clearAll)
  const resetToDefaults = useCallback(() => {
    setFilters({
      minPrice: DEFAULT_MIN_PRICE,
      maxPrice: DEFAULT_MAX_PRICE,
      brands: [],
      movements: [],
      materials: [],
      bandMaterials: [],
      genders: [],
    });
  }, [setFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.minPrice > DEFAULT_MIN_PRICE ||
      filters.maxPrice < DEFAULT_MAX_PRICE ||
      filters.brands.length > 0 ||
      filters.movements.length > 0 ||
      filters.materials.length > 0 ||
      filters.bandMaterials.length > 0 ||
      filters.genders.length > 0
    );
  }, [filters]);

  // Check specific filter categories
  const hasActivePriceFilter = useMemo(() => {
    return (
      filters.minPrice > DEFAULT_MIN_PRICE ||
      filters.maxPrice < DEFAULT_MAX_PRICE
    );
  }, [filters.minPrice, filters.maxPrice]);

  const hasActiveBrandFilter = useMemo(
    () => filters.brands.length > 0,
    [filters.brands]
  );
  const hasActiveMovementFilter = useMemo(
    () => filters.movements.length > 0,
    [filters.movements]
  );
  const hasActiveMaterialFilter = useMemo(
    () => filters.materials.length > 0,
    [filters.materials]
  );
  const hasActiveBandMaterialFilter = useMemo(
    () => filters.bandMaterials.length > 0,
    [filters.bandMaterials]
  );
  const hasActiveGenderFilter = useMemo(
    () => filters.genders.length > 0,
    [filters.genders]
  );

  // Filter query object for API calls
  const filterQuery = useMemo(
    () => ({
      minPrice:
        filters.minPrice > DEFAULT_MIN_PRICE ? filters.minPrice : undefined,
      maxPrice:
        filters.maxPrice < DEFAULT_MAX_PRICE ? filters.maxPrice : undefined,
      brands: filters.brands.length > 0 ? filters.brands : undefined,
      movements: filters.movements.length > 0 ? filters.movements : undefined,
      materials: filters.materials.length > 0 ? filters.materials : undefined,
      bandMaterials:
        filters.bandMaterials.length > 0 ? filters.bandMaterials : undefined,
      genders: filters.genders.length > 0 ? filters.genders : undefined,
    }),
    [filters]
  );

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (hasActivePriceFilter) count++;
    if (hasActiveBrandFilter) count++;
    if (hasActiveMovementFilter) count++;
    if (hasActiveMaterialFilter) count++;
    if (hasActiveBandMaterialFilter) count++;
    if (hasActiveGenderFilter) count++;
    return count;
  }, [
    hasActivePriceFilter,
    hasActiveBrandFilter,
    hasActiveMovementFilter,
    hasActiveMaterialFilter,
    hasActiveBandMaterialFilter,
    hasActiveGenderFilter,
  ]);

  return {
    // Current filter values
    priceRange,
    selectedBrands: filters.brands,
    selectedMovements: filters.movements,
    selectedMaterials: filters.materials,
    selectedBandMaterials: filters.bandMaterials,
    selectedGenders: filters.genders as Gender[],

    // Update functions
    setPriceRange,
    toggleBrand,
    toggleMovement,
    toggleMaterial,
    toggleBandMaterial,
    toggleGender,

    // Clear functions
    clearAll,
    clearPriceRange,
    clearBrands,
    clearMovements,
    clearMaterials,
    clearBandMaterials,
    clearGenders,
    resetToDefaults,

    // Status checks
    hasActiveFilters,
    hasActivePriceFilter,
    hasActiveBrandFilter,
    hasActiveMovementFilter,
    hasActiveMaterialFilter,
    hasActiveBandMaterialFilter,
    hasActiveGenderFilter,
    activeFilterCount,

    // API query object
    filterQuery,
  };
}
