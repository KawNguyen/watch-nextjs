import axiosInstance from "@/lib/axiosInstance";

export const favoriteApi = {
  getFavoriteMe: async () => {
    const response = await axiosInstance.get("/favorite/me");
    return response.data;
  },

  addToFavorites: async (movieId: string) => {
    const response = await axiosInstance.post(`/favorite/add/${movieId}`);
    return response.data;
  },

  removeFromFavorites: async (movieId: string) => {
    const response = await axiosInstance.delete(`/favorite/remove/${movieId}`);
    return response.data;
  },
};
