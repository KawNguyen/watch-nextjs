"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const articles = [
  {
    id: 1,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "09/05/2025",
    tag: "Kiến thức đồng hồ",
    title: "Đồng Hồ – Món Quà Ý Nghĩa Để Tặng ",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 2,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "18/04/2025",
    tag: "Kiến thức đồng hồ",
    title: "Các Phân Khúc Đồng Hồ Trên Thị Trường",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 3,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "01/04/2025",
    tag: "Kiến thức đồng hồ",
    title: "5 Mẫu Đồng Hồ Đáng Mua Nhất Năm 2025",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 4,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "25/03/2025",
    tag: "Kiến thức đồng hồ",
    title: "Top Đồng Hồ Dưới 10 Triệu Đáng Mua Nhất",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
  {
    id: 5,
    image:
      "https://luxatch-store-newdemo.myshopify.com/cdn/shop/files/h1sl1.jpg",
    date: "10/03/2025",
    tag: "Kiến thức đồng hồ",
    title: "Hướng Dẫn Chọn Đồng Hồ Cho Nam",
    description:
      "Đồng hồ là món quà ý nghĩa dành cho người yêu thời trang và những người yêu thời trang.",
  },
];
export default function Blogs() {
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
        <CarouselContent className="mt-4 max-h-[440px]  md:min-h-[500px] p-1">
          {articles.map((item, index) => (
            <CarouselItem key={index} className="md:pt-2">
              <div>
                <Card className="grid grid-cols-1 md:grid-cols-12 border-collapse md:h-[450px] border-2 p-1 border-gray-200">
                  <div className="md:col-span-7 p-1 md:p-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1000}
                      height={1000}
                      priority
                      className="w-full h-full rounded-md  object-cover"
                    />
                  </div>
                  <div className="md:col-span-5 md:flex md:flex-col justify-between h-full p-2 md:p-4 ">
                    <div>
                      <div className="flex items-center justify-center md:p-4 mb-2 md:mb-4">
                        <span className="text-lg md:text-2xl font-semibold">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex justify-evenly mb-4">
                        <p className="text-sm text-gray-500">{item.date}</p>
                        <p className="text-sm text-purple-700">{item.tag}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-lg mb-4 text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <CardFooter className="flex items-center justify-center">
                      <Button className="w-full text-white">Read More</Button>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block"/> 
      </Carousel>
    </div>
  );
}
