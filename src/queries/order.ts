import { orderAPI } from "@/services/order";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOrdersQuery = (keyword: string) =>
  useQuery({
    queryKey: ["tracking-search", keyword],
    queryFn: () =>
      orderAPI.getOrdersForTracking(keyword).then((res) => res.data.items),
  });

export const useTrackingOrderQuery = (
  orderId: string,
  phoneLast4Digits: string
) =>
  useQuery({
    queryKey: ["tracking-order", orderId, phoneLast4Digits],
    queryFn: () =>
      orderAPI.trackingOrder(orderId, phoneLast4Digits).then((res) => res.data.item),
  });

export const useMyOrdersQuery = (status: string) =>
  useQuery({
    queryKey: ["my-orders", status],
    queryFn: () => orderAPI.getOrdersMe(status).then((res) => res.data.items),
  });

export const useOrderQuery = (orderId: string) =>
  useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderAPI.getOrder(orderId).then((res) => res.data.item),
  });

export const useCancelOrderMutation = () =>
  useMutation({
    mutationFn: (data: { orderId: string; reason: string }) =>
      orderAPI.cancelOrder(data.orderId, data.reason),
  });
