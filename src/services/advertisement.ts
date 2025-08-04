import axiosInstance from "@/lib/axios-instance";

export const advertisementAPI = {
  getAdvertisements: async () => {
    const response = await axiosInstance.get("/advertisement");
    return response.data;
  },
};
