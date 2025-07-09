import { useMutation } from "@tanstack/react-query";
import { favoriteApi } from "@/services/favorite";
import { toast } from "sonner";
import { queryClient } from "@/components/providers/providers";

export const useFavoriteMutation = () => {
  const addToFavorite = useMutation({
    mutationFn: (favoriteId: string) => favoriteApi.addToFavorites(favoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-favorite"] });
      toast.success("Item added to favorite.");
    },
    onError: () => {
      toast.error("Failed to add item to favorite. Please try again.");
    },
  });

  const deleteFavorite = useMutation({
    mutationFn: (ids: string[]) => favoriteApi.removeFromFavorites(ids),
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["my-favorite"] });
    },
    onError: () => {
      toast.error("Failed to remove item. Please try again.");
    },
  });
  return {
    addToFavorite,
    deleteFavorite,
  };
};
