import { addressAPI } from "@/services/address";
import { useQuery } from "@tanstack/react-query";

export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: addressAPI.getProvince,
  });
};
