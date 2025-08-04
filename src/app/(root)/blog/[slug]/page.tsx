"use client";

import Link from "next/link";
// import { getBlogBySlug, formatDate } from "@/lib/blog-data"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useBlogBySlugQuery } from "@/queries/blog";

interface BlogDetailPageProps {
  params: { slug: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { data: blog } = useBlogBySlugQuery(params.slug);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog?.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Quản trị viên</span>
            </div>
            {blog?.isPublished && (
              <Badge variant="secondary">Đã xuất bản</Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-8 leading-tight">
            {blog?.title}
          </h1>

          <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={blog?.thumbnail || "/placeholder.svg"}
              alt={blog?.title}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <Separator className="mb-8" />

          <div
            className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Cập nhật lần cuối: {formatDate(blog?.updatedAt)}</p>
              </div>

              <Link href="/blog">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Xem thêm bài viết
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
