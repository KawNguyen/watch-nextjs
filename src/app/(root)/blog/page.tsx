"use client";

import { Button } from "@/components/ui/button";

import { BlogCard } from "@/components/blogs/blog-card";
import { useBlogsQueries } from "@/queries/blog";
import { Blog } from "@/types/blog";

export default function WatchBlogPage() {
  const { data: blogs } = useBlogsQueries();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Khám Phá Đồng Hồ
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Khám phá những chiếc đồng hồ tinh tế cho mọi dịp
          </p>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-white hover:text-gray-900"
          >
            Mua Ngay
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
