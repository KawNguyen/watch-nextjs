import axiosInstance from "@/lib/axiosInstance";

export const authApi = {
  signIn: async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
  verifyOTP: async (email: string, otp: string) => {
    const response = await axiosInstance.post("/auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  },
};
