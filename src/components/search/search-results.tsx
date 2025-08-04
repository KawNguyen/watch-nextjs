import { Clock, Loader2 } from "lucide-react";
import { Fragment } from "react";
import { ProductItem } from "./product-item";

import type { Watch, ApiResponse } from "@/types/watch";
import { useInfiniteScroll } from "@/hooks/use-observer";

interface SearchResultsProps {
  isSearching?: boolean;
  query: string;
  products?: { pages: ApiResponse<Watch>[] };
  onBuy?: (product: Watch) => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function SearchResults({
  isSearching,
  query,
  products,
  onBuy,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SearchResultsProps) {
  const observerRef = useInfiniteScroll(
    () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
    { rootMargin: "200px" }
  );

  if (isSearching) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const totalItems = products?.pages[0]?.meta.totalItems ?? 0;

  if (totalItems === 0) {
    return (
      <div className="p-8 text-center">
        <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <div className="text-sm font-medium mb-1">Không có sản phẩm nào</div>
        <div className="text-xs text-muted-foreground">
          Thử các từ khóa khác hoặc kiểm tra chính tả
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-4 border-b bg-muted/50">
        <div className="text-sm font-medium">
          Kết quả tìm kiếm cho "{query}" ({totalItems} sản phẩm)
        </div>
      </div>

      <div className="divide-y">
        {products?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.items.map((product) => (
              <ProductItem key={product.id} product={product} onBuy={onBuy} />
            ))}
          </Fragment>
        ))}
      </div>

      <div ref={observerRef} className="h-1" />

      {isFetchingNextPage && (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      )}

      {!hasNextPage && totalItems > 0 && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          Bạn đã đến cuối danh sách.
        </div>
      )}
    </div>
  );
}
