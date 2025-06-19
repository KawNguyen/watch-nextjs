import { Heart, Maximize2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

import { Watch } from "@/types/watch";

export default function WatchCard({ watchData }: { watchData: Watch }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="relative rounded-md aspect-square overflow-hidden bg-zinc-100">
        <Image
          src={watchData.images[0].url}
          alt={watchData.name}
          fill
          sizes="25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 flex justify-center items-center">
          <div className="flex gap-2">
            <Button
              size="icon"
              className="rounded-full h-10 w-10 bg-white text-black hover:bg-white/90 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Add to cart</span>
            </Button>

            <Button
              size="icon"
              className="rounded-full h-10 w-10 bg-white text-black hover:bg-white/90 cursor-pointer"
            >
              <Maximize2 className="h-5 w-5" />
              <span className="sr-only">Quick view</span>
            </Button>
          </div>
        </div>

        <div className="absolute right-2 top-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 cursor-pointer"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
      </div>

      <div className="pt-3">
        <div className="mb-1 text-xs text-muted-foreground">
          {watchData.brand.name}
        </div>
        <h3 className="font-medium leading-tight">
          <Link
            href={`/product/${watchData.slug}`}
            className="text-sm hover:underline"
          >
            {watchData.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`size-4 ${
                    i < Math.floor(watchData.rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "fill-yellow-500 text-yellow-500"
                  }`}
                />
              ))}
          </div>
          <div className="text-xs text-muted-foreground">
            {watchData.rating}
          </div>
        </div>

        <div className="mt-2">
          <span className="font-medium">${watchData.price}</span>
        </div>
      </div>
    </div>
  );
}
