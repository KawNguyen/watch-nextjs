import axiosInstance from "@/lib/axios-instance";

export const favoriteApi = {
  getMyFavorite: async () => {
    const response = await axiosInstance.get("/favorite/my-favorite");
    return response.data;
  },

  addToFavorites: async (watchId: string) => {
    const response = await axiosInstance.post(`/favorite/add`, { watchId });
    return response.data;
  },

  removeFromFavorites: async (favoriteIds: string[]) => {
    const response = await axiosInstance.delete(`/favorite/delete`, {
      data: { favoriteIds },
    });
    return response.data;
  },
};
