import { useState, useEffect } from "react";
import { useWatchesQuery } from "@/queries/watches";
import WatchCard from "../watch-card";

interface RelevantProductsProps {
  currentProductId: string;
  brandSlug: string;
}

export const RelevantProduct = ({
  currentProductId,
  brandSlug,
}: RelevantProductsProps) => {
  const { data: watchesData, isLoading } = useWatchesQuery(1, {
    brands: [brandSlug],
  });

  const [relevantProducts, setRelevantProducts] = useState<any[]>([]);

  useEffect(() => {
    if (watchesData?.data?.items) {
      const filtered = watchesData.data.items
        .filter(
          (product: any) =>
            product.id !== currentProductId && product.brand.slug === brandSlug
        )
        .slice(0, 4);
      setRelevantProducts(filtered);
    }
  }, [watchesData, currentProductId, brandSlug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div>Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Sản Phẩm Tương Tự
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relevantProducts?.map((product: any) => (
          <WatchCard key={product.id} watchData={product} />
        ))}
      </div>
    </div>
  );
};
