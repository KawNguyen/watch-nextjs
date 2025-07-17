import axiosInstance from "@/lib/axios-instance";
import { CreateOrderDto } from "@/types/order";

export const orderAPI = {
  getOrdersMe: async () => {
    const response = await axiosInstance.get(`/order/my-order`);
    return response.data;
  },

  createOrder: async (data: CreateOrderDto) => {
    const response = await axiosInstance.post(`/order`, data);
    return response.data;
  },
};
