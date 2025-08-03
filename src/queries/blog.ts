import { blogApi } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

export const useBlogsQueries = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogApi.getAllBlogs(true).then((res) => res.data.items),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useBlogBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogApi.getBlogBySlug(slug).then((res) => res.data.item),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
