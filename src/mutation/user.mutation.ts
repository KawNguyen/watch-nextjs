import { queryClient } from "@/components/providers/providers";
import { userAPI } from "@/services/user";
import { UpdateUserProps } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserMutation = () => {
  const updateProfile = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserProps }) =>
      await userAPI.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      toast.success("Your profile has been updated successfully.");
    },
    onError: (error: string) => {
      console.error("Error updating user:", error);
    },
  });

  const changeAvatar = useMutation({
    mutationFn: (avatar: { absolute_url: string; public_id: string }) =>
      userAPI.changeAvatar(avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Your avatar has been updated successfully.");
    },
    onError: (error: string) => {
      console.error("Failed to update avatar.", error);
    },
  });
  return { updateProfile, changeAvatar };
};
