import { watchesApi } from "@/services/watches";
import { useQuery } from "@tanstack/react-query";
import { Watch, ApiResponse, Filters } from "@/types/watch";

export const useWatchesQuery = (page: number = 1, filters?: Filters) =>
  useQuery<ApiResponse<Watch>>({
    queryKey: ["watches", page, filters],
    queryFn: () => watchesApi.fetchAll(page, filters),
  });

export const useWatchQuery = (slug: string) =>
  useQuery({
    queryKey: ["watch", slug],
    queryFn: () => watchesApi.fetchBySlug(slug).then((res) => res.data.item),
  });
