import { watchesApi } from "@/services/watches";
import { useQuery } from "@tanstack/react-query";
import { Watch, ApiResponse } from "@/types/watch";

export const useWatchesQuery = (
  page: number = 1,
  brand?: string,
  filters?: any
) =>
  useQuery<ApiResponse<Watch>>({
    queryKey: [brand ? brand : "watches", page, filters],
    queryFn: () =>
      brand
        ? watchesApi.fetchByBrand(page, brand, filters)
        : watchesApi.fetchAll(page, filters),
  });

export const useWatchQuery = (slug: string) =>
  useQuery({
    queryKey: ["watch", slug],
    queryFn: () => watchesApi.fetchBySlug(slug).then((res) => res.data.item),
  });

// export const useWatchByBrand = (brand: string,page:number) => {
//   return useQuery({
//     queryKey: ["watches", brand],
//     queryFn: () => watchesApi.fetchByBrand(brand,page),
//   })
// };
