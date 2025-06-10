import axiosInstance from "@/lib/axiosInstance";

export const userAPI = {
  findMe: async () => {
    const response = await axiosInstance.get("/user/me");
    return response?.data;
  },
};
