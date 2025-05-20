import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/watch";
import { Brand } from "@/types/brand";
import { brandApi } from "@/services/brand";

export const useBrandQuery = () =>
  useQuery<ApiResponse<Brand>>({
    queryKey: ["brands"],
    queryFn: brandApi.fetchAll,
  });
