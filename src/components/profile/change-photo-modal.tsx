"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadImage } from "@/services/upload-image";
import { useAuth } from "@/mutation/auth.mutation";

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  fallbackText?: string;
  userId: string;
}

export function ChangePhotoModal({
  isOpen,
  onClose,
  currentImage,
  fallbackText = "U",
}: ChangePhotoModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { changeAvatar } = useAuth();

  const displayImage = previewImage || currentImage;

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (uploadedImage) => {
      changeAvatar.mutate(uploadedImage);
    },
    onError: (error: string) => {
      console.error("Upload failed. Please try again.", error);
    },
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePreview = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    if (!selectedFile) return;
    uploadMutation.mutate(selectedFile);
  };

  const handleClose = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const isLoading = uploadMutation.isPending || changeAvatar.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
          <DialogDescription>
            Tải lên một bức ảnh đại diện mới. Kích thước khuyến nghị là 400x400px.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-gray-200">
                <AvatarImage src={displayImage} alt="Profile preview" />
                <AvatarFallback className="text-2xl">
                  {fallbackText}
                </AvatarFallback>
              </Avatar>
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={isLoading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Chọn tệp
            </Button>
            {previewImage && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemovePreview}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={!selectedFile || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Lưu ảnh"
            )}
          </Button>
        </DialogFooter>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
}
