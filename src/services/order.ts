import axiosInstance from "@/lib/axios-instance";

export const orderAPI = {
  getOrdersMe: async () => {
    const response = await axiosInstance.get(`/order/my-order`);
    return response.data;
  },

  //   createOrder: async (data: {
};
