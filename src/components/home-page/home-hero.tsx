"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { poster } from "@/constant/routes";


export function HomeHero() {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{ loop: true }}
      onMouseEnter={plugin.current.stop}
    >
      <CarouselContent>
        {poster.map((item, index) => (
          <CarouselItem key={index} className="relative h-[40vw] min-h-[300px] max-h-[600px] w-full">
            <Image
              src={item.url}
              alt={item.text}
              fill
              className="object-cover w-full h-full "
              priority
              sizes="100vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
