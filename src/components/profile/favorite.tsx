"use client";

import { ShoppingCart, Trash2, Star, Heart } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { favoriteItem } from "@/types/favorite";
import { useFavoriteQuery } from "@/queries/favorite";
import { useCartMutation } from "@/mutation/cart.mutation";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavoriteMutation } from "@/mutation/favorite.mutation";
import { Badge } from "../ui/badge";

export function Favorite() {
  const { data = [], isLoading, isError } = useFavoriteQuery();
  const { addToCart } = useCartMutation();
  const { deleteFavorite } = useFavoriteMutation();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectChange = (id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((item) => item.id)));
    }
  };

  const handleRemoveSelected = () => {
    deleteFavorite.mutate(Array.from(selectedIds), {
      onSuccess: () => {
        setSelectedIds(new Set());
      },
    });
  };

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;
  const isIndeterminate =
    selectedIds.size > 0 && selectedIds.size < data.length;

  const selectedItems = useMemo(
    () => data.filter((item) => selectedIds.has(item.id)),
    [data, selectedIds],
  );

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pl-6 pt-4">
          <CardTitle>
            <Skeleton className="w-[200px] h-6" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-[300px] h-4 mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4">
              <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-500">Không thể tải danh sách yêu thích của bạn.</div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                Danh sách yêu thích của tôi
                <Badge variant="secondary" className="ml-2">
                  {data.length} mục
                </Badge>
              </CardTitle>
              <CardDescription>
                Các mục bạn đã lưu để mua sau
              </CardDescription>
            </div>
          </div>

          {data.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className="data-[state=indeterminate]:bg-blue-500 data-[state=indeterminate]:border-blue-500"
                  {...(isIndeterminate && { "data-state": "indeterminate" })}
                />
                <span className="text-sm text-gray-600">
                  {selectedItems.length > 0
                    ? `${selectedItems.length} selected`
                    : "Select all"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveSelected}
                title={`Remove selected (${selectedItems.length})`}
                className="hover:bg-red-50"
              >
                <Trash2 className="text-red-500" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">
              Danh sách yêu thích của bạn đang trống
            </h3>
            <p className="text-gray-600 mb-6">
              Lưu các mục bạn yêu thích để mua sau
            </p>
            <Button>Tiếp tục mua sắm</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((item: favoriteItem) => (
              <Card
                key={item.id}
                className="overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-4">
                    <div className="flex items-start gap-4 w-full">
                      <Checkbox
                        checked={selectedIds.has(item.id)}
                        onCheckedChange={(checked) =>
                          handleSelectChange(item.id, Boolean(checked))
                        }
                        className="mt-2"
                      />

                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.watch.images[0]?.absolute_url ||
                            "/placeholder.svg"
                          }
                          alt={item.watch.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg mb-1 line-clamp-1">
                            {item.watch.name}
                          </h4>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-red-50"
                              >
                                <Trash2 className="text-red-500" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Xác nhận xóa mục khỏi danh sách yêu thích?
                                </DialogTitle>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Hủy</Button>
                                </DialogClose>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    deleteFavorite.mutate([item.id])
                                  }
                                  disabled={deleteFavorite.isPending}
                                >
                                  {deleteFavorite.isPending
                                    ? "Đang xóa..."
                                    : "Xác nhận"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>

                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {item.watch.description ||
                            "Không có mô tả nào."}
                        </p>

                        {renderStars(0)}

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xl font-bold text-green-600">
                            ${item.watch.price}
                          </span>
                          <Button
                            onClick={() =>
                              addToCart.mutate({
                                watchId: item.watch.id,
                                quantity: 1,
                              })
                            }
                            size="sm"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Thêm vào giỏ hàng
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
