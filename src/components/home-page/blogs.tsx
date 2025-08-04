"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlogsQueries } from "@/queries/blog";
import { Blog } from "@/types/blog";
import { Skeleton } from "../ui/skeleton";

function BlogSkeleton() {
  return (
    <Card className="flex flex-col md:flex-row border-2 border-gray-200 p-1 h-full min-h-[400px] md:min-h-[350px] lg:min-h-[400px]">
      <div className="w-full md:w-2/3 flex-shrink-0 p-1 md:p-4 flex items-center justify-center">
        <Skeleton className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-md" />
      </div>
      <div className="w-full md:w-1/3 flex flex-col justify-between h-full p-2 md:p-4">
        <div>
          <div className="flex items-center justify-center md:p-4 mb-2 md:mb-4">
            <Skeleton className="w-2/3 h-6 md:h-8" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Skeleton className="w-1/2 h-4" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-5/6 h-20" />
          </div>
        </div>
        <CardFooter className="flex items-center justify-center mt-2">
          <Skeleton className="w-full h-10" />
        </CardFooter>
      </div>
    </Card>
  );
}

function extractTextFromHtml(html: string, maxLength = 150): string {
  const text = html?.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
  return text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export default function Blogs() {
  const { data, isLoading } = useBlogsQueries();

  return (
    <div className="container mx-auto my-4">
      <div>
        <h2 className="text-3xl justify-center text-center font-bold text-gray-900 ">
          Blogs
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          News and insights from our blog.
        </p>
      </div>
      <Carousel>
        <CarouselContent className="mt-4 p-1">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <CarouselItem key={i} className="pt-2">
                  <BlogSkeleton />
                </CarouselItem>
              ))
            : data.map((item: Blog, index: number) => (
                <CarouselItem key={index} className="pt-2">
                  <div>
                    <Card className="flex flex-col md:flex-row border-2 border-gray-200 p-1 h-full min-h-[400px] md:min-h-[350px] lg:min-h-[400px]">
                      <div className="w-full md:w-2/3 flex-shrink-0 p-1 md:p-4 flex items-center justify-center">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          width={1000}
                          height={1000}
                          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-md object-cover"
                        />
                      </div>
                      <div className="w-full md:w-1/3 flex flex-col h-full p-2 md:p-4">
                        <div>
                          <div className="flex items-center justify-center md:p-4 mb-2 md:mb-4">
                            <span className="text-lg md:text-2xl font-semibold text-center">
                              {item.title}
                            </span>
                          </div>
                          <div className="flex flex-wrap justify-center gap-4 mb-4">
                            <p className="text-sm text-gray-500">
                              {item.createdAt}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            {extractTextFromHtml(item.content, 120)}
                          </div>
                        </div>
                        <CardFooter className="flex items-center justify-end mt-2">
                          <Button className="w-full text-white">
                            Read More
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
