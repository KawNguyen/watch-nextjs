import { orderAPI } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

export const useOrdersQuery = (status: string) =>
  useQuery({
    queryKey: ["my-orders", status],
    queryFn: () => orderAPI.getOrdersMe(status).then((res) => res.data.items),
  });

export const useOrderQuery = (orderId: string) =>
  useQuery({
    queryKey: ["order"],
    queryFn: () => orderAPI.getOrder(orderId).then((res) => res.data),
  });
