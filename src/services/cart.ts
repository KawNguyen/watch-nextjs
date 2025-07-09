import axiosInstance from "@/lib/axios-instance";

export const cartApi = {
  getMyCartItems: async () => {
    const response = await axiosInstance.get("/cart/my-cart");
    return response.data;
  },

  addCartItem: async (data: { watchId: string; quantity: number }) => {
    const response = await axiosInstance.post("/cart/add", data);
    return response.data;
  },

  updateQuantityCartItem: async (cartItemId: string, quantity: number) => {
    const response = await axiosInstance.patch(`/cart/update/${cartItemId}`, {
      quantity,
    });
    return response.data;
  },

  deleteCartItem: async (cartItemIds: string[]) => {
    const response = await axiosInstance.delete("/cart/delete", {
      data: { cartItemIds },
    });
    return response.data;
  },
};
