import { userAPI } from "@/services/user";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    const { setAuth, logout } = useAuthStore();
    
    const { data, isLoading } = useQuery({
      queryKey: ["auth"],
      queryFn: async () => {
        try {
          const data = await userAPI.fineMe();
          setAuth(data);
          return data;
        } catch (error) {
          logout();
          throw error;
        }
      },
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
  
    return {
      user: data,
      isLoading,
      logout
    };
  };