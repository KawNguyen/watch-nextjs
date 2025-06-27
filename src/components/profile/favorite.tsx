"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavoriteQuery } from "@/queries/favorite";
import { favoriteItem } from "@/types/favorite";

export function Favorite() {
  const { data, isLoading } = useFavoriteQuery();

  const SkeletonCard = () => (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="aspect-square bg-muted rounded-lg relative overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
        </div>

          <Skeleton className="h-8 w-full rounded-md" />
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pl-6 pt-4">
          <CardTitle>
            <Skeleton className="h-7 w-1/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-2/4 mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>Your wishlist is empty.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pl-6 pt-4">
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>Items you&#39;ve saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item: favoriteItem) => {
            const imageUrl = item.images[0]?.absolute_url;
            return (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <h4 className="font-medium mb-2">{item.name}</h4>
                  <p className="text-lg font-semibold mb-3">${item.price}</p>
                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}