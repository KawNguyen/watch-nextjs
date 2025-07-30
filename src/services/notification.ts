import axiosInstance from "@/lib/axios-instance";

export const notificationApi = {
  myNotifications: async (page: number = 1) => {
    const res = await axiosInstance.get(
      `/notifications/my-notifications?page=${page}`
    );
    return res.data;
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    const res = await axiosInstance.patch(
      `/notifications/mark-as-read/${notificationId}`
    );
    return res.data;
  },

  //   markAllAsRead: async (): Promise<void> => {
  //     await fetch("/api/notifications/mark-all-read", { method: "PATCH" });
  //   },
};
