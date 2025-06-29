import axiosInstance from "@/lib/axiosInstance";

export const favoriteApi = {
  getFavoriteMe: async () => {
    const response = await axiosInstance.get("/favorite/me-favorite");
    return response.data.data.item.items;
  },

  addToFavorites: async (favoriteId: string) => {
    const response = await axiosInstance.post(`/favorite/add/${favoriteId}`);
    return response.data;
  },

  removeFromFavorites: async (favoriteId: string) => {
    const response = await axiosInstance.post(`/favorite/delete`, {
      favoriteIds: [favoriteId],
    });
    return response.data;
  },
};
