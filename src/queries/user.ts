import { userAPI } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userAPI.findMe(),
    
  });
};
