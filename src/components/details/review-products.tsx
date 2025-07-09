import React from "react";
import { Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
export const reviews = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "October 12, 2023",
    rating: 5,
    title: "Best headphones I've ever owned",
    content:
      "These headphones are absolutely incredible. The sound quality is crystal clear, and the noise cancellation is top-notch. I use them daily for work calls and listening to music, and they never disappoint. Battery life is impressive too!",
    helpful: 24,
    replies: 3,
  },
  {
    id: 2,
    user: "Sarah Miller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "September 28, 2023",
    rating: 4,
    title: "Great sound, slight comfort issue",
    content:
      "The sound quality and noise cancellation are excellent. My only complaint is that they get a bit uncomfortable after wearing them for 3+ hours. Otherwise, these are fantastic headphones that I would recommend to anyone looking for premium audio quality.",
    helpful: 18,
    replies: 1,
  },
  {
    id: 3,
    user: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    date: "October 5, 2023",
    rating: 5,
    title: "Worth every penny",
    content:
      "I was hesitant about spending this much on headphones, but after using these for a month, I can confidently say they're worth every penny. The sound is incredible, they're comfortable for long periods, and the battery life is amazing. Highly recommended!",
    helpful: 32,
    replies: 0,
  },
];

const ReviewProduct = ({ slug }: { slug: string }) => {
  console.log(slug);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold text-black ">Customer Reviews</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-12 space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Image
                    src={review.avatar}
                    alt={review.user}
                    className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-blue-100"
                    width={40}
                    height={40}
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">
                      {review.user}
                    </h4>
                    <div className="text-sm text-gray-600 font-medium">
                      {review.date}
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
              <h3 className="font-bold mt-4 text-lg text-gray-900">
                {review.title}
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
          <Button className="w-full mt-8  py-4 border border-black rounded-full text-gray-600 hover:text-white font-medium bg-white  flex items-center justify-center group">
            Load More Reviews
            <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ReviewProduct;
