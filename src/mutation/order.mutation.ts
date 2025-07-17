import { queryClient } from "@/components/providers/providers";
import { orderAPI } from "@/services/order";
import { CreateOrderDto } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useOrderMutation = () => {
  const createOrder = useMutation({
    mutationFn: async (data: CreateOrderDto) =>
      await orderAPI.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      toast.success("Your order has been created successfully.");
    },
    onError: (error: string) => {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    },
  });

  return { createOrder };
};
