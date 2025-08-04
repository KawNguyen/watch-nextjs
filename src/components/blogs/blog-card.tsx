import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Blog } from "@/types/blog";
import { formatDate } from "@/lib/utils";

function extractTextFromHtml(html: string, maxLength = 150): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ");
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export function BlogCard({ blog }: { blog: Blog }) {
  const excerpt = extractTextFromHtml(blog.content, 120);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={blog.thumbnail || "/placeholder.svg"}
            alt={blog.title}
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(blog.createdAt)}</span>
          {blog.isPublished && (
            <Badge variant="secondary" className="ml-auto">
              Đã xuất bản
            </Badge>
          )}
        </div>

        <Link href={`/blog/${blog.slug}`}>
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Link
          href={`/blog/${blog.slug}`}
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          Đọc thêm →
        </Link>
      </CardFooter>
    </Card>
  );
}
