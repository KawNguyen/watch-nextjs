"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { useBlog } from "@/queries/blog";
import { Blog } from "@/types/blog";
import { extractThumbnailAndDescription } from "@/lib/utils";

// Dữ liệu mẫu
// const filteredWatches = [
//   {
//     id: "5dbaac70-d788-4cb5-a4d4-907b8d685ef3",
//     title: "ádasd",
//     slug: "adasd",
//     description: "Day la noi dep de hen ho",
//     image:
//       "https://images.unsplash.com/photo-1587387119725-9d6bac0f22fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9yaXpvbnRhbHxlbnwwfHwwfHx8MA%3D%3D",
//     category: "Luxury",
//   },
// ];

export default function WatchBlogPage() {
  const { data: blogs } = useBlog();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the finest watches for every occasion
          </p>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-white hover:text-gray-900"
          >
            Shop Now
          </Button>
        </div>
      </section>
      <section className="py-12 container mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog: Blog) => (
          <Card key={blog.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="pl-2">{blog.title}</CardTitle>
              <CardDescription className="pl-2">
                {extractThumbnailAndDescription(blog.content).description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                width={300}
                height={300}
                className="object-contain w-full h-60 rounded"
              />
            </CardContent>
            <CardFooter className="p-2">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
