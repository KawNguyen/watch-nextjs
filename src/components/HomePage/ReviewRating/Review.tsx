import React from "react";
import { ReviewCard } from "./ReviewCard";
import { StarIcon } from "lucide-react";
import { ReviewForm } from "./ReviewForm";
export function Review() {
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "15/06/2023",
      review:
        "Sản phẩm tuyệt vời, chất lượng vượt xa mong đợi. Tôi rất hài lòng với trải nghiệm mua hàng và sẽ quay lại trong tương lai!",
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      date: "02/07/2023",
      review:
        "Dịch vụ khách hàng rất tốt, nhân viên nhiệt tình và thân thiện. Sản phẩm đúng như mô tả, giao hàng nhanh chóng.",
    },
    {
      id: 3,
      name: "Lê Minh C",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      date: "20/07/2023",
      review:
        "Tôi đã mua sản phẩm này như một món quà cho bạn bè và họ rất thích nó! Chất lượng sản phẩm tốt, đóng gói cẩn thận.",
    },
    {
      id: 4,
      name: "Phạm Hoàng D",
      avatar: "https://randomuser.me/api/portraits/men/81.jpg",
      rating: 4,
      date: "05/08/2023",
      review:
        "Giá cả hợp lý cho chất lượng nhận được. Tôi đã sử dụng sản phẩm được một tháng và mọi thứ vẫn hoạt động tốt.",
    },
  ];
  return (
    <div className="w-full container mx-auto py-12">
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100 to-blue-100 blur-3xl opacity-30 rounded-full"></div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Share with us your experience
        </h2>
        <p className="text-gray-800 mb-4">How do you feel about KRONLUX?</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="animate-fade-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 lg:sticky lg:top-6 h-fit">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
}
