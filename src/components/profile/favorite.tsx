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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { favoriteItem } from "@/types/favorite";
import { favoriteApi } from "@/services/favorite";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "../providers/providers";
import { useFavoriteQuery } from "@/queries/favorite";

export function Favorite() {
  const { data, isLoading, isError } = useFavoriteQuery();

  const removeFromWishlist = useMutation({
    mutationFn: (id: string) => favoriteApi.removeFromFavorites(id),
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["favorite"] });
    },
    onError: () => {
      toast.error("Failed to remove item. Please try again.");
    },
  });

  // const handleAddToCart = (id: string) => {
  //   toast.success("Item added to cart");
  // };

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

  if (isLoading) return <div className="p-4">Loading wishlist...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load wishlist.</div>;

  return (
    <Card>
      <CardHeader className="pl-6 pt-4">
        <CardTitle className="flex items-center gap-2">
          My Wishlist ({data?.length} items)
        </CardTitle>
        <CardDescription>Items you have saved for later</CardDescription>
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
              <Card
                key={item.id}
                className="overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.images[0]?.absolute_url || "/placeholder.svg"}
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

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Xác nhận xoá sản phẩm khỏi wishlist?
                                  </DialogTitle>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">Huỷ</Button>
                                  </DialogClose>
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      removeFromWishlist.mutate(item.id)
                                    }
                                    disabled={removeFromWishlist.isPending}
                                  >
                                    {removeFromWishlist.isPending
                                      ? "Đang xoá..."
                                      : "Xác nhận"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
                                ${item.price}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                // onClick={() => handleAddToCart(item.id)}
                                size="sm"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
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
