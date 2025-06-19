import { fetcher } from "@/lib/fetcher";
import { Watch, ApiResponse } from "@/types/watch";

export const watchesApi = {
  fetchAll: async (page: number = 1): Promise<ApiResponse<Watch>> => {
    const data = await fetcher<ApiResponse<Watch>>(`/watches?page=${page}`);
    return data;
  },
  fetchByBrand: async (
    page: number = 1,
    brand: string,
  ): Promise<ApiResponse<Watch>> => {
    const data = await fetcher<ApiResponse<Watch>>(
      `/watches/brand/${brand}?page=${page}`,
    );
    return data;
  },
};
