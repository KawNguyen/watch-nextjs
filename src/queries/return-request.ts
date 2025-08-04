import { returnApi } from "@/services/return-request";
import { useQuery } from "@tanstack/react-query";

export const useGetMyReturnRequests = (status: string) => {
  return useQuery({
    queryKey: ["my-return-requests", status],
    queryFn: () =>
      returnApi.getMyReturnRequests(status).then((res) => res.data.items),
    enabled: !!status,
  });
};

export const useGetReturnRequest = (id: string) => {
  return useQuery({
    queryKey: ["return-request", id],
    queryFn: () => returnApi.getReturnRequest(id).then((res) => res.data.item),
  });
  
};
