import axiosInstance from "@/lib/axios-instance"

export const bandMaterialApi = {
    async fetchAll() {
        const response = await axiosInstance.get("/band-material");
        return response.data;
    }
}