import axiosInstance from "@/lib/axiosInstance";

export const addressAPI = {
  addAddress: async (data: {
    street: string;
    district: string;
    ward: string;
    city: string;
    country: string;
  }) => {
    const response = await axiosInstance.post("/address/add", data);
    return response.data;
  },
};
