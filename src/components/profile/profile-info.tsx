"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { UpdateUserProps, UserGender, UserProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { userAPI } from "@/services/user";
import { queryClient } from "../providers/providers";
import { ChangePhotoModal } from "./change-photo-modal";

export function ProfileInfo({ user }: { user: UserProps | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        gender: user.gender || "",
        avatar: user.avatar?.absolute_url || "",
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const mutateUpdateUser = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserProps }) =>
      await userAPI.updateUser(id, data),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const handleSave = () => {
    mutateUpdateUser.mutate({
      id: user?.id || "",
      data: {
        avatar: formData.avatar,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender:
          UserGender[formData.gender as keyof typeof UserGender] || undefined,
      },
    });
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        gender: user.gender || "",
        avatar: user.avatar?.absolute_url || "",
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Card>
        <CardHeader className="pl-6 pt-4">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and profile details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData?.avatar ?? undefined} alt="Profile" />
              <AvatarFallback>
                {formData.firstName.charAt(0).toUpperCase()}
                {formData.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {user?.email || ""}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            {!isEditing ? (
              <Button onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <ChangePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentImage={formData.avatar}
        fallbackText={`${formData.firstName
          .charAt(0)
          .toUpperCase()}${formData.lastName.charAt(0).toUpperCase()}`}
        userId={user?.id || ""}
      />
    </>
  );
}
