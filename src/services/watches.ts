import { fetcher } from "@/lib/fetcher";
import { Watch, ApiResponse, ApiResponseItem } from "@/types/watch";

export const watchesApi = {
  fetchAll: async (
    page: number = 1,
    filters: any
  ): Promise<ApiResponse<Watch>> => {
    const params = new URLSearchParams();

    params.append("page", page.toString());

    if (filters?.material) {
      params.append("material", filters.material);
    }

    if (filters?.bandMaterial) {
      params.append("bandMaterial", filters.bandMaterial);
    }

    if (filters?.movement) {
      params.append("movement", filters.movement);
    }

    const data = await fetcher<ApiResponse<Watch>>(
      `/watch?${params.toString()}`
    );
    return data;
  },
  fetchByBrand: async (
    page: number = 1,
    brand: string,
    filters?: any
  ): Promise<ApiResponse<Watch>> => {
    const params = new URLSearchParams();

    params.append("page", page.toString());

    if (brand) {
      params.append("brand", brand);
    }

    if (filters?.material) {
      params.append("material", filters.material);
    }

    if (filters?.bandMaterial) {
      params.append("bandMaterial", filters.bandMaterial);
    }

    if (filters?.movement) {
      params.append("movement", filters.movement);
    }

    const data = await fetcher<ApiResponse<Watch>>(
      `/watch?brand=${brand}&page=${page}`
    );
    return data;
  },
  fetchBySlug: async (slug: string): Promise<ApiResponseItem<Watch>> => {
    const data = await fetcher<ApiResponseItem<Watch>>(`/watch/${slug}`);
    return data;
  },
};
