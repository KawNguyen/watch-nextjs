"use client";

import type { Review } from "@/types/review";
import { ReviewCard } from "./review-card";
import { useReviews } from "@/queries/review";

export function Review() {
  const { data: reviews } = useReviews();

  const allReviews: Review[] =
    reviews?.pages?.flatMap((page: any) => page.reviews) || [];

  return (
    <div className="w-full py-12 bg-gray-50 overflow-hidden">
      <div className="text-center mb-10 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100 to-blue-100 blur-3xl opacity-30 rounded-full"></div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Chia sẻ trải nghiệm của bạn
        </h2>
        <p className="text-gray-800 mb-4">
          Bạn cảm nhận như thế nào về KRONLUX?
        </p>
      </div>

      <div className="relative w-full overflow-x-hidden">
        <div className="flex justify-center w-full animate-marquee">
          {allReviews.map((review: Review, index: number) => (
            <div
              key={`${review.id}-${index}`}
              className="inline-block mx-4 w-[300px] align-top"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
