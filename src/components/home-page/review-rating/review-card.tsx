import React from "react";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Review } from "@/types/review";

export function ReviewCard({ review }: { review: Review }) {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <StarIcon
          key={index}
          size={20}
          className={`${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          } transition-all duration-300`}
        />
      ));
  };
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Image
            src={review?.user?.avatar?.absolute_url || ""}
            alt={`${review.user?.firstName} ${review.user?.lastName} avatar`}
            width={140}
            height={140}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-800 text-lg">
            {review.user?.firstName} {review.user?.lastName}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            {renderStars(review.rating)}
          </div>
        </div>
      </div>
      <div className="relative">
        <p className="text-gray-600 mb-4 leading-relaxed">
          &quot;{review.comment}&quot;
        </p>
        <div className="text-sm text-gray-400 flex items-center gap-2">
          {review.createdAt}
        </div>
      </div>
    </div>
  );
}
