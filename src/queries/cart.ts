import { cartApi } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["my-cart"],
    queryFn: () => cartApi.getMyCartItems().then((res) => res.data.items),
    retry: 2,
  });
};
