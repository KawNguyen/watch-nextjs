import { watchesApi } from "@/services/watches";
import { useQuery } from "@tanstack/react-query";
import { Watch, ApiResponse } from "@/types/watch";

export const useWatchesQuery = (page: number = 1, brands?: string) =>
  useQuery<ApiResponse<Watch>>({
    queryKey: [brands ? brands : "watches", page],
    queryFn: () =>
      brands ? watchesApi.fetchByBrand(page, brands) : watchesApi.fetchAll(page),
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
