import axiosInstance from "@/lib/axios-instance";

export const blogApi = {
  getAllBlogs: async () => {
    const res = await axiosInstance.get("/blogs");
    return res.data;
  },
  getBlogById: async (blogId: string) => {
    const res = await axiosInstance.get(`/blogs/${blogId}`);
    return res.data;
  },
};
