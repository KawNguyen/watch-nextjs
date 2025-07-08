import axiosInstance from "@/lib/axios-instance";

export const movementApi = {
  async fetchAll() {
    const response = await axiosInstance.get("/movement");
    return response.data;
  },
};
