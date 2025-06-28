"use client";

import { ShoppingCart, Trash2, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavoriteQuery } from "@/queries/favorite";
import { favoriteItem } from "@/types/favorite";

export function Favorite() {
  const { data } = useFavoriteQuery();

  const handleRemoveFromWishlist = (id: string) => {
    console.log("Remove from wishlist:", id);
  };

  const handleAddToCart = (id: string) => {
    console.log("Add to cart:", id);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pl-6 pt-4">
        <CardTitle className="flex items-center gap-2">
          My Wishlist ({data?.length} items)
        </CardTitle>
        <CardDescription>Items you've saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        {data?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Save items you love to buy them later
            </p>
            <Button>Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.map((item: favoriteItem) => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow">
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.images?.[0]?.absolute_url || "/placeholder.svg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-lg mb-1 line-clamp-1">
                              {item.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:bg-red-50"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {item.description || "No description available."}
                          </p>

                          <div className="flex items-center gap-2 mb-3">
                            {renderStars(0)}
                            <span className="text-sm text-gray-500">
                              (0 reviews)
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-green-600">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleAddToCart(item.id)}
                                size="sm"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
