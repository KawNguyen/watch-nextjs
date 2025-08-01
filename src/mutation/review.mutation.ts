import { queryClient } from "@/components/providers/providers";
import { reviewApi } from "@/services/review";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useReviewMutation = () => {
  const createReview = useMutation({
    mutationFn: (data: { watchId: string; comment: string; rating: number }) =>
      reviewApi.createReview(data.watchId, data.comment, data.rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch-reviews"] });
      toast.success("Bạn đã gửi đánh giá thành công.");
    },
    onError: () => {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    },
  });

  return {
    createReview,
  };
};
