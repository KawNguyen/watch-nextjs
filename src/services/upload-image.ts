import axiosInstance from "@/lib/axios-instance";

export const uploadImage = async (
  file: File,
): Promise<{ absolute_url: string; public_id: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const url = `/cloudinary/upload-single?width=300&height=300`;

  const response = await axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return {
    absolute_url: response.data.data.item.secure_url,
    public_id: response.data.data.item.public_id,
  };
};
