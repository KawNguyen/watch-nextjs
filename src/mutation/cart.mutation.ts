import { queryClient } from "@/components/providers/providers";
import { cartApi } from "@/services/cart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCartMutation = () => {
  const addToCart = useMutation({
    mutationFn: ({
      watchId,
      quantity,
    }: {
      watchId: string;
      quantity: number;
    }) => cartApi.addCartItem({ watchId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
      toast.success("Added item to cart successfully.");
    },
    onError: () => {
      toast.error("Failed to add item to cart. Please try again.");
    },
  });

  const updateQuantity = useMutation({
    mutationFn: ({
      cartItemId,
      newQuantity,
    }: {
      cartItemId: string;
      newQuantity: number;
    }) => cartApi.updateQuantityCartItem(cartItemId, newQuantity),
    onSuccess: () => {
      toast.success("Quantity updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
    },
    onError: () => {
      toast.error("Failed to update quantity.");
    },
  });

  const deleteCartItem = useMutation({
    mutationFn: (ids: string[]) => cartApi.deleteCartItem(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
      toast.success("Items removed from cart.");
    },
    onError: () => {
      toast.error("Failed to remove items.");
    },
  });

  return { addToCart, updateQuantity, deleteCartItem };
};
