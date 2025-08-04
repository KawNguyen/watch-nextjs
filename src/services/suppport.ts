import axiosInstance from "@/lib/axios-instance";

export const supportApi = {
  createSupportTicket: async (data: {
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await axiosInstance.post(`/support-request/create`, data);
    return response.data;
  },
};
