import axiosInstance from "@/lib/axios-instance";

export const blogApi = {
  getAllBlogs: async (isPublished: true) => {
    const res = await axiosInstance.get(`/blogs?isPublished=${isPublished}`);
    return res.data;
  },

  getBlogBySlug: async (slug: string) => {
    const res = await axiosInstance.get(`/blogs/${slug}`);
    return res.data;
  },
};
