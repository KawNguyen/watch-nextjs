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
import { useBlogsQueries } from "@/queries/blog";
import { Blog } from "@/types/blog";
import { extractThumbnailAndDescription } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { BlogCard } from "@/components/blogs/blog-card";

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
  const router = useRouter();
  const { data: blogs } = useBlogsQueries();

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
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </section>
    </div>
  );
}
