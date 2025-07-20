import axiosInstance from "@/lib/axios-instance";
import { OrderPayload } from "@/types/order";

export const orderAPI = {
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

  createOrderFromCart: async (data: OrderPayload) => {
    const response = await axiosInstance.post(`/order/create`, data);
    return response.data;
  },

  createOrderWalkin: async (data: OrderPayload) => {
    const response = await axiosInstance.post(`/order/create-walkin`, data);
    return response.data;
  },
};
