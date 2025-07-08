import { fetcher } from "@/lib/fetcher";
import { Watch, ApiResponse, ApiResponseItem } from "@/types/watch";

export const watchesApi = {
  fetchAll: async (
    page: number = 1,
    filters: {
      minPrice?: number;
      maxPrice?: number;
      brands?: string[];
      movements?: string[];
      materials?: string[];
      bandMaterials?: string[];
    }
  ): Promise<ApiResponse<Watch>> => {
    const params = new URLSearchParams();

    params.append("page", page.toString());

    if (filters.minPrice !== undefined) {
      params.append("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params.append("maxPrice", filters.maxPrice.toString());
    }
    if (filters.brands && filters.brands.length > 0) {
      params.append("brands", filters.brands.join(","));
    }
    if (filters.movements && filters.movements.length > 0) {
      params.append("movements", filters.movements.join(","));
    }
    if (filters.materials && filters.materials.length > 0) {
      params.append("materials", filters.materials.join(","));
    }
    if (filters.bandMaterials && filters.bandMaterials.length > 0) {
      params.append("bandMaterials", filters.bandMaterials.join(","));
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
