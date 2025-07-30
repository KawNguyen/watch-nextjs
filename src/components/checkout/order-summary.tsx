import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/types/cart";
import { formatMoney } from "@/lib/utils";

export const OrderSummary = ({ items }: { items: CartItem[] }) => {
  return (
    <Card className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-2 overflow-y-scroll h-[150px]">
        {items.map((product: CartItem, index) => (
          <Card key={index} className="flex gap-4 items-start bg-gray-100 ">
            <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product.watch.images[0]?.absolute_url || ""}
                alt={product.watch.name}
                className="w-full h-full object-cover "
                width={160}
                height={160}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900">
                {product.watch.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Brand: {product.watch.brand.name}
              </p>
              <p className="font-semibold text-gray-900 mt-1">
                {formatMoney(product.watch.price)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};
