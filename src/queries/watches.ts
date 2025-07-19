import { watchesApi } from "@/services/watches";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

// export const useWatchBySearchQuery = (keyword: string) =>
//   useQuery({
//     queryKey: ["watch-keyword", "search", keyword],
//     queryFn: () => watchesApi.fetchWatchBySearch(keyword).then((res) => res),
//     enabled: !!keyword,
//   });

export const useWatchBySearchQuery = (keyword: string, limit = 10) =>
  useInfiniteQuery({
    queryKey: ["watches", "search", keyword],
    queryFn: ({ pageParam = 1 }) =>
      watchesApi.fetchWatchBySearch(keyword, pageParam, limit),
    getNextPageParam: (lastPage: ApiResponse<Watch>) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!keyword.trim(),
  });
