import axiosInstance from "@/lib/axios-instance";

export const reviewApi = {
  getReviews: async (page: number) => {
    const response = await axiosInstance.get(`/review?page=${page}`);
    return response.data;
  },

  getReviewsBySlug: async (slug: string, page: number) => {
    const response = await axiosInstance.get(`/review/${slug}?page=${page}`);
    return response.data;
  },

  createReview: async (watchId: string, comment: string, rating: number) => {
    const response = await axiosInstance.post(`/review/create`, {
      watchId,
      comment,
      rating,
    });
    return response.data;
  },
};
