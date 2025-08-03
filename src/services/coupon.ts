import axiosInstance from "@/lib/axios-instance";

export const couponApi = {
  getAllCoupons: async () => {
    const response = await axiosInstance.get("/coupon");
    return response.data;
  },

  getCouponsByCode: async (code: string) => {
    const response = await axiosInstance.get(`/coupon/${code}`);
    return response.data;
  },

  geCouponUserCanUse: async (orderValue: number) => {
    const response = await axiosInstance.get(
      `/coupon/available?orderValue=${orderValue}`
    );
    return response.data;
  },
};
