import { useQuery } from "@tanstack/react-query";
import { favoriteApi } from "@/services/favorite";
import { favoriteItem } from "@/types/favorite";

export const useFavoriteQuery = () => {
  return useQuery<favoriteItem[]>({
    queryKey: ["my-favorite"],
    queryFn: () => favoriteApi.getMyFavorite().then((res) => res.data.items),
  });
};
