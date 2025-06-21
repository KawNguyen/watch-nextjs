"use client";
import BlogCard, { BlogPost } from "@/components/blogs/blog-card";
import { useState } from "react";
import FilterTabs from "@/components/blogs/filter-tabs";

import Image from "next/image";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { allPosts } from "@/constant/routes";

export default function BlogPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen w-full  py-6 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-center ">
        Welcome to our KronLux blog
      </h1>
      <Carousel
        plugins={[plugin.current]}
        className="w-full  mx-auto my-8"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {BlogPost.map((post, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="p-0">
                    <BlogCard
                      image={post.image}
                      category={post.category}
                      title={post.title}
                      description={post.description}
                      date={post.date}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <FilterTabs onSelectCategory={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredPosts.map((post, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {post.image && (
              <div className="w-full h-40 relative mb-2 rounded overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-fit"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx < 3}
                />
              </div>
            )}
            <h2 className="text-xl font-semibold border-t">{post.title}</h2>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">{post.category}</p>
              <a
                href="#"
                className="text-blue-600 font-bold text-md hover:underline whitespace-nowrap ml-2"
              >
                Read more
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
