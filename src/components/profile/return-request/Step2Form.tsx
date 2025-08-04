"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/services/upload-image";
import { toast } from "sonner";

export function Step2Form({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: (data: any) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    console.log("uploadedFiles updated:", uploadedFiles);
    if (uploadedFiles.length > 0) {
      setFormData({
        ...formData,
        images: uploadedFiles.map((file: any) => file.absolute_url),
      });
    }
  }, [uploadedFiles]);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (uploadedImage: any) => {
      setUploadedFiles((uploadImages) => [...uploadImages, uploadedImage]);
      toast.success("Hình ảnh đã được tải lên thành công");
    },
    onError: (error: any) => {
      toast.error(
        "Tải lên hình ảnh thất bại. Vui lòng thử lại sau. " +
          (error?.data?.response?.message || "")
      );
    },
    onSettled: () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
  });

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      const fileArray = Array.from(files);

      try {
        for (const file of fileArray) {
          await uploadMutation.mutateAsync(file);
        }
        // Không cần setFormData ở đây vì đã handle trong useEffect
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    // formData sẽ được cập nhật trong useEffect
  };
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Thêm hình ảnh (Nên cung cấp)</Label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <Input
            type="file"
            multiple
            accept="image/*"
            id="upload"
            onChange={handleFileUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <Label htmlFor="upload">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={triggerFileInput}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Đang tải..." : "Chọn hình ảnh"}
            </Button>
          </Label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {uploadedFiles.map((url: any, i) => (
              <div key={i} className="relative">
                <img
                  src={url.absolute_url}
                  alt={`uploaded-${i}`}
                  className="w-full h-auto rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveFile(i)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
