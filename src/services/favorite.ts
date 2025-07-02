import axiosInstance from "@/lib/axios-instance";

export const favoriteApi = {
  getFavoriteMe: async () => {
    const response = await axiosInstance.get("/favorite/my-favorite");
    return response.data;
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
