import { queryClient } from "@/components/providers/providers";
import { orderAPI } from "@/services/order";
import { OrderPayload } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useOrderMutation = () => {
  const router = useRouter();
  const createOrderFromCart = useMutation({
    mutationFn: async (data: OrderPayload) =>
      await orderAPI.createOrderFromCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      toast.success("Your order has been created successfully.");
      router.push("/checkout-success");
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}. Please try again.`);
    },
  });

  const createOrderWalkin = useMutation({
    mutationFn: async (data: OrderPayload) =>
      await orderAPI.createOrderWalkin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      toast.success("Your walk-in order has been created successfully.");
      router.push("/checkout-success");
    },
    onError: (error: string) => {
      console.error("Error creating walk-in order:", error);
      toast.error("Failed to create walk-in order. Please try again.");
    },
  });

  return { createOrderFromCart, createOrderWalkin };
};
