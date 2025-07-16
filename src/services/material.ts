import axiosInstance from "@/lib/axios-instance"

export const materialApi = {
    async fetchAll() {
        const response = await axiosInstance.get("/material");
        return response.data;
    }
}