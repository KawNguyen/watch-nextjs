import React from "react";
import { Star, ChevronRight, User } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useInfiniteReviews } from "@/queries/review";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  watchId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string | null;
  };
}

const ReviewProduct = ({ slug }: { slug: string }) => {
  const {
    data: reviews,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteReviews(slug);
  console.log(reviews);
  

  const allReviews: Review[] =
    reviews?.pages?.flatMap((page: any) => page.reviews) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold text-black">Customer Reviews</h2>
        <div className="text-sm text-gray-600">
          {allReviews.length} review{allReviews.length !== 1 ? "s" : ""}
        </div>
      </div>

      {allReviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No reviews yet</div>
          <p className="text-gray-600">Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {allReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage
                      src={review.user?.avatar || ""}
                      alt={`${review.user?.firstName} ${review.user?.lastName}`}
                    />
                    <AvatarFallback>
                      <User className="w-6 h-6 text-gray-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">
                      {review.user?.firstName} {review.user?.lastName}
                    </h4>
                    <div className="text-sm text-gray-600 font-medium">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-400 bg-yellow-50 px-3 py-1 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {review.comment || (
                  <span className="italic text-gray-400">
                    No comment provided
                  </span>
                )}
              </p>
            </div>
          ))}

          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full mt-8 py-4 border border-black rounded-full text-gray-600 hover:text-white font-medium bg-white flex items-center justify-center group"
            >
              {isFetchingNextPage ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Loading...
                </>
              ) : (
                <>
                  Load More Reviews
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewProduct;
