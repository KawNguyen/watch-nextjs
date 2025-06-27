import { favoriteApi } from "@/services/favorite";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteQuery = () => {
  return useQuery({
    queryKey: ["favorite"],
    queryFn: async () =>
      favoriteApi.getFavoriteMe().then((res) => res.data.items),
  });
};
