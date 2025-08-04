import axiosInstance from "@/lib/axios-instance";
import { ReturnRequestDto } from "@/types/return-request";

export const returnApi = {
  getMyReturnRequests: async (status: string) => {
    const response = await axiosInstance.get(
      `/return-request/my-return-requests?status=${status}`
    );
    return response.data;
  },

  getReturnRequest: async (id: string) => {
    const response = await axiosInstance.get(`/return-request/${id}`);
    return response.data;
  },

  createRequestReturn: async (data: ReturnRequestDto) => {
    const response = await axiosInstance.post("/return-request/create", data);
    return response.data;
  },
};
