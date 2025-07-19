import axiosInstance from "@/lib/axios-instance";
import { OrderPayload } from "@/types/order";


export const orderAPI = {
  getOrdersMe: async () => {
    const response = await axiosInstance.get(`/order/my-order`);
    return response.data;
  },

  createOrderFromCart: async (data: OrderPayload) => {
    const response = await axiosInstance.post(`/order/create`, data);
    return response.data;
  },

  createOrderWalkin: async (data: OrderPayload) => {
    const response = await axiosInstance.post(`/order/create-walkin`, data);
    return response.data;
  }
};
