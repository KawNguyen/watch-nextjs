import { Brand } from "./brand";

export interface Material {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movement {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WatchPoster {
  id: string;
  url: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Watch {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  gender: string;
  brandId: string;
  materialId: string;
  bandMaterialId: string;
  movementId: string;
  diameter: number;
  waterResistance: number;
  warranty: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  brand: Brand;
  material: Material;
  bandMaterial: Material;
  movement: Movement;
  poster: WatchPoster[];
  rating: number;
  banner:WatchBanner;
}
export interface WatchBanner{
  id: string;
  url: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  total: number;
  page: number;
  totalPages: number;
  lastPage: number;
  itemsPerPage: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: {
    items: T[];
  };
  meta: Meta;
}
export interface ApiResponseItem<T> {
  status: number;
  message: string;
  data: {
    item:T;
  };
  meta: Meta;
}
