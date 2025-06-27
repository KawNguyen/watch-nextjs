import axiosInstance from "@/lib/axiosInstance";

export const authApi = {
  signIn: async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const response = await axiosInstance.post("/auth/register", {
      firstName,
      lastName,
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

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
};
