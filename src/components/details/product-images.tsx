import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WatchImage } from "@/types/watch";
import Image from "next/image";

interface PossibleImages {
  images: WatchImage[];
  name: string;
}

export function ProductImages({ images, name }: PossibleImages) {
  return (
    <div className="relative bg-gray-100 rounded-lg p-6">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={image.absolute_url}
                  alt={`${name} - ${index + 1}`}
                  
                  fill
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
