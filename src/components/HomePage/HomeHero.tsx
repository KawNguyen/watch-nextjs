"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const poster = [
  {
    id: 1,
    url: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    text: "Time is Precious Shop Watches Effortlessly.",
  },
  {
    id: 2,
    url: "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl2.jpg",
    text: "Luxury Redefined Second by Second.",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1731759992339-1b079071ab89?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
    text: "Precision and Style ",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1731759992338-f44243163ba4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Timeless Prestige Seamlessly Yours.",
  },
];
export function HomeHero() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000 })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{ loop: true }}
      onMouseEnter={plugin.current.stop}
    >
      <CarouselContent>
        {poster.map((item, index) => (
          <CarouselItem key={index} className="h-screen w-screen">
            <Image
              src={item.url}
              alt={item.text}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
