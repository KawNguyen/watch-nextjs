import { notificationApi } from "@/services/notification";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = (page: number) => {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: async () =>  await notificationApi.myNotifications(page).then(res => res.data.items),
  });
};
