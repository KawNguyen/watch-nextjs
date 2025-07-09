import axiosInstance from "@/lib/axios-instance";
import { Address } from "@/types/address";
import axios from "axios";

const API_THANHPHO = "http://provinces.open-api.vn/api";

export const addressAPI = {
  getProvince: async () => {
    const response = await axios.get(`${API_THANHPHO}/p/`);
    return response.data;
  },

  getDistrict: async (provinceId: string) => {
    const response = await axios.get(API_THANHPHO + `/p/${provinceId}?depth=2`);
    return response.data;
  },

  getWard: async (districtId: string) => {
    const response = await axios.get(API_THANHPHO + `/d/${districtId}?depth=2`);
    return response.data;
  },

  getAllAddressByUserId: async () => {
    const response = await axiosInstance.get(`/address/my-address`);
    return response.data;
  },

  create: async (userId: string, data: Address) => {
    const response = await axiosInstance.post(
      `/address/user/${userId}/add`,
      data
    );
    return response.data;
  },

  delete: async (userId: string, id: string) => {
    const response = await axiosInstance.delete(
      `/address/user/${userId}/delete/${id}`
    );
    return response.data;
  },

  update: async (userId: string, id: string, data: Partial<Address>) => {
    const response = await axiosInstance.patch(
      `/address/user/${userId}/update/${id}`,
      data
    );
    return response.data;
  },
};
