import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WatchPoster } from "@/types/watch";
import Image from "next/image";

interface PossibleImages {
  posters: WatchPoster[];
}

export function ProductImages({ posters }: PossibleImages) {
    console.log(posters);
  return (
    <div className="relative bg-gray-100 rounded-lg p-6">
      <Carousel className="w-full">
        <CarouselContent>
          {posters.map((poster, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={poster.url}
                  alt={`${name} - ${index + 1}`}
                  width={1000}
                  height={1000}
                  priority={true}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

    </div>
  );
}
