import { reviewApi } from "@/services/review";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useReviews = () => {
  return useInfiniteQuery({
    queryKey: ["reviews"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await reviewApi.getReviews(pageParam);

      const items = res.data?.items ?? [];
      const totalPages = res.data?.meta?.totalPages ?? 1;

      return {
        reviews: items,
        nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export const useInfiniteReviews = (slug: string) => {
  return useInfiniteQuery({
    queryKey: ["reviews", slug],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await reviewApi.getReviewsBySlug(slug, pageParam);

      const items = res.data?.items ?? [];
      const totalPages = res.data?.meta?.totalPages ?? 1;

      return {
        reviews: items,
        nextPage: pageParam < totalPages ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
