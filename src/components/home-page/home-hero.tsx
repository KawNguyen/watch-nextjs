"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useGetAdvertisements } from "@/queries/advertisement";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeHero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const { data = [], isLoading } = useGetAdvertisements();

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{ loop: true }}
      onMouseEnter={plugin.current.stop}
    >
      <CarouselContent>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="relative h-[40vw] min-h-[300px] max-h-[600px] w-full"
              >
                <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
              </CarouselItem>
            ))
          : data.map((item: any, index: number) => (
              <CarouselItem
                key={index}
                className="relative h-[40vw] min-h-[300px] max-h-[600px] w-full"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full"
                  priority
                  sizes="100vw"
                />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
}
