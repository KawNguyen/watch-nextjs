import axiosInstance from "@/lib/axios-instance";
import { OrderPayload } from "@/types/order";

export const orderAPI = {
  getOrdersForTracking: async (status: string) => {
    const response = await axiosInstance.get(
      `/order/tracking?keyword=${status}`
    );
    return response.data;
  },

  getOrdersMe: async (status: string) => {
    const response = await axiosInstance.get(
      `/order/my-order?status=${status}`
    );
    return response.data;
  },

  getOrder: async (orderId: string) => {
    const response = await axiosInstance.get(`/order/${orderId}`);
    return response.data;
  },

  trackingOrder: async (orderId: string, phoneLast4Digits: string) => {
    const response = await axiosInstance.get(`/order/track/${orderId}?phoneLast4Digits=${phoneLast4Digits}`);
    return response.data;
  },

  createOrderFromCart: async (data: OrderPayload) => {
    const response = await axiosInstance.post(`/order/create`, data);
    return response.data;
  },

  createOrderWalkin: async (data: OrderPayload) => {
    const response = await axiosInstance.post(`/order/create-walkin`, data);
    return response.data;
  },

  cancelOrder: async (orderId: string, reason: string) => {
    const response = await axiosInstance.patch(`/order/cancel/${orderId}`, {
      reason,
    });
    return response.data;
  },
};
