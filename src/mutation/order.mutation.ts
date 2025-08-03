import { queryClient } from "@/components/providers/providers";
import { orderAPI } from "@/services/order";
import { paymentApi } from "@/services/payment";
import { OrderPayload, paymentMethodEnum } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

const handleOrderWithMomo = async (
  router: any,
  data: OrderPayload,
  orderFn: (data: OrderPayload) => Promise<any>
) => {
  const result = await orderFn(data);

  if (
    result.status === "success" &&
    data.paymentMethod === paymentMethodEnum.MOMO
  ) {
    const payload = {
      orderInfo: result.data.item.id,
      amount: data.totalPrice,
    };

    try {
      const response = await paymentApi.payWithMomo(payload);

      if (response.data.resultCode === 0) {
        window.location.href = response.data.shortLink;
      }
    } catch (error) {
      console.error("Momo payment creation failed:", error);
    }
  } else {
    router.push("/checkout-success?orderInfo=" + result.data.item.id);
  }

  return result;
};

export const useOrderMutation = () => {
  const router = useRouter();
  const createOrderFromCart = useMutation({
    mutationFn: async (data: OrderPayload) => {
      return await handleOrderWithMomo(
        router,
        data,
        orderAPI.createOrderFromCart
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      toast.success("Your order has been created successfully.");
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    },
  });

  const createOrderWalkin = useMutation({
    mutationFn: async (data: OrderPayload) => {
      return await handleOrderWithMomo(
        router,
        data,
        orderAPI.createOrderWalkin
      );
    },
    onSuccess: () => {
      toast.success("Your order has been created successfully.");
    },
    onError: (error: any) => {
      toast.error(`${error.response.data.message}`);
    },
  });

  return { createOrderFromCart, createOrderWalkin };
};
