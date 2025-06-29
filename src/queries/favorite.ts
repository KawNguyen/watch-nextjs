import { useQuery } from "@tanstack/react-query";
import { favoriteApi } from "@/services/favorite";
import { favoriteItem } from "@/types/favorite";

export const useFavoriteQuery = () => {
  return useQuery<favoriteItem[]>({
    queryKey: ["favorite"],
    queryFn: async () => {
      const res = await favoriteApi
        .getFavoriteMe()
        .then((res) => res.data.items);
      return res;
    },
  });
};
