import axiosInstance from "@/lib/axios-instance";

export const paymentApi = {
  payWithMomo: async (payload: any) => {
    const response = await axiosInstance.post("/payments/momo", payload);
    return response;
  },
};
