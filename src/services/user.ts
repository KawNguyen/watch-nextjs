import axiosInstance from "@/lib/axiosInstance";

export const userAPI = {
  fineMe: async () => {
    const response = await axiosInstance.get("/users/me");
    return response?.data;
  },
};
