import axios from "axios";
const API_THANHPHO =
  process.env.NEXT_PUBLIC_API_THANHPHO || "https://provinces.open-api.vn/api";

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
};
