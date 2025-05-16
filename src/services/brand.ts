import { fetcher } from "@/lib/fetcher";
import { Brand } from "@/types/brand";
import { ApiResponse } from "@/types/watch";

export const brandApi = {
  fetchAll: async (): Promise<ApiResponse<Brand>> => {
    const data = await fetcher<ApiResponse<Brand>>(`/brands`);
    return data;
  },
};
