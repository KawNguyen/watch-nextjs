import { fetcher } from "@/lib/fetcher";
import { Watch, ApiResponse, ApiResponseItem } from "@/types/watch";

export const watchesApi = {
  fetchAll: async (page: number = 1): Promise<ApiResponse<Watch>> => {
    const data = await fetcher<ApiResponse<Watch>>(`/watch?page=${page}`);
    return data;
  },
  
  fetchByBrand: async (
    page: number = 1,
    brand: string
  ): Promise<ApiResponse<Watch>> => {
    const data = await fetcher<ApiResponse<Watch>>(
      `/watch?brand=${brand}&page=${page}`
    );
    return data;
  },

  fetchBySlug: async (slug: string): Promise<ApiResponseItem<Watch>> => {
    const data = await fetcher<ApiResponseItem<Watch>>(`/watch/${slug}`);
    return data;
  }
};
