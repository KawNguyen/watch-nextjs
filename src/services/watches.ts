import { fetcher } from "@/lib/fetcher";
import { Watch, ApiResponse, ApiResponseItem, Filters } from "@/types/watch";

export const watchesApi = {
  fetchAll: async (
    page: number = 1,
    filters?: Filters
  ): Promise<ApiResponse<Watch>> => {
    const params = new URLSearchParams();

    params.append("page", page.toString());

    if (filters?.minPrice !== undefined) {
      params.append("minPrice", filters.minPrice.toString());
    }
    if (filters?.maxPrice !== undefined) {
      params.append("maxPrice", filters.maxPrice.toString());
    }
    if (filters?.brands && filters.brands.length > 0) {
      params.append("brands", filters.brands.join(","));
    }
    if (filters?.movements && filters.movements.length > 0) {
      params.append("movements", filters.movements.join(","));
    }
    if (filters?.materials && filters.materials.length > 0) {
      params.append("materials", filters.materials.join(","));
    }
    if (filters?.bandMaterials && filters.bandMaterials.length > 0) {
      params.append("bandMaterials", filters.bandMaterials.join(","));
    }
    if (filters?.genders && filters.genders.length > 0) {
      params.append("genders", filters.genders.join(","));
    }

    const data = await fetcher<ApiResponse<Watch>>(
      `/watch?${params.toString()}&status=PUBLISHED`
    );
    return data;
  },

  // fetchByBrand: async (
  //   page: number = 1,
  //   brand: string,
  //   filters?: any
  // ): Promise<ApiResponse<Watch>> => {
  //   const params = new URLSearchParams();

  //   params.append("page", page.toString());

  //   if (brand) {
  //     params.append("brand", brand);
  //   }

  //   if (filters?.material) {
  //     params.append("material", filters.material);
  //   }

  //   if (filters?.bandMaterial) {
  //     params.append("bandMaterial", filters.bandMaterial);
  //   }

  //   if (filters?.movement) {
  //     params.append("movement", filters.movement);
  //   }

  //   const data = await fetcher<ApiResponse<Watch>>(
  //     `/watch?brand=${brand}&page=${page}`
  //   );
  //   return data;
  // },

  fetchBySlug: async (slug: string): Promise<ApiResponseItem<Watch>> => {
    const data = await fetcher<ApiResponseItem<Watch>>(`/watch/${slug}`);
    return data;
  },

  fetchWatchBySearch: async (keyword: string, page = 1, limit = 10) => {
    const data = await fetcher<ApiResponse<Watch>>(
      `/watch?keyword=${keyword}&page=${page}&limit=${limit}`
    );
    return data;
  },
};
