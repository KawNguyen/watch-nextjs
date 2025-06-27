import axiosInstance from "@/lib/axiosInstance";
import { UpdateUserProps } from "@/types/auth";

export const userAPI = {
  findMe: async () => {
    const response = await axiosInstance.get("/user/me");
    return response?.data;
  },

  updateUser: async (userId: string, data: UpdateUserProps) => {
    const response = await axiosInstance.patch(`/user/update/${userId}`, data);
    return response.data;
  },

  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    const response = await axiosInstance.post(
      `/user/change-password/${userId}`,
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  },

  changeAvatar: async (
    userId: string,
    avatar: { absolute_url: string; public_id: string }
  ) => {
    const response = await axiosInstance.patch(
      `/user/change-avatar/${userId}`,
      {
        avatar,
      }
    );
    return response.data;
  },
};
