import { watchesApi } from "@/services/watches";
import { useQuery } from "@tanstack/react-query";
import { Watch, ApiResponse } from "@/types/watch";

export const useWatchesQuery = (page: number = 1, brand?: string) =>
  useQuery<ApiResponse<Watch>>({
    queryKey: [brand ? brand : "watches", page],
    queryFn: () =>
      brand ? watchesApi.fetchByBrand(page, brand) : watchesApi.fetchAll(page),
  });
