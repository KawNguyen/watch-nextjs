import { orderAPI } from "@/services/order";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOrdersQuery = (status: string) =>
  useQuery({
    queryKey: ["my-orders", status],
    queryFn: () => orderAPI.getOrdersMe(status).then((res) => res.data.items),
  });

export const useOrderQuery = (orderId: string) =>
  useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderAPI.getOrder(orderId).then((res) => res.data),
  });

export const useCancelOrderMutation = () =>
  useMutation({
    mutationFn: (data: { orderId: string; reason: string }) =>
      orderAPI.cancelOrder(data.orderId, data.reason),
  });
