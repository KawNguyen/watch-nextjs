"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selected: boolean;
};

const mockProducts: CartItem[] = [
  {
    id: 1,
    name: "Đồng hồ Rolex Datejust",
    price: 250000000,
    image: "/images/watch.jpg",
    quantity: 1,
    selected: true, // Mặc định được chọn
  },
  {
    id: 2,
    name: "Đồng hồ Omega Seamaster",
    price: 180000000,
    image: "/images/watch.jpg",
    quantity: 1,
    selected: true, // Mặc định được chọn
  },
  {
    id: 3,
    name: "Đồng hồ Cartier Tank",
    price: 150000000,
    image: "/images/watch.jpg",
    quantity: 1,
    selected: true, // Mặc định được chọn
  },
];

function CartItemCard({
  item,
  onQuantityChange,
  onSelectChange,
  isLastItem,
}: {
  item: CartItem;
  onQuantityChange: (id: number, quantity: number) => void;
  onSelectChange: (id: number, selected: boolean) => void;
  isLastItem: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-4 py-2 rounded-lg">
        <Checkbox
          checked={item.selected}
          onCheckedChange={(checked) =>
            onSelectChange(item.id, checked as boolean)
          }
          className="h-4 w-4"
        />
        <Image
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
          width={200}
          height={200}
        />
        <div className="flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-gray-600">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price)}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onQuantityChange(item.id, Math.max(0, item.quantity - 1))
              }
            >
              -
            </Button>
            <span>{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      {!isLastItem && <Separator className="my-4" />}
    </div>
  );
}

export function CartSheet() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockProducts);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleSelectChange = (id: number, selected: boolean) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, selected } : item))
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.selected ? item.price * item.quantity : 0),
    0
  );

  const selectedCount = cartItems.filter((item) => item.selected).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative h-full w-full">
          <ShoppingBag />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {selectedCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Giỏ hàng</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onSelectChange={handleSelectChange}
                  isLastItem={item === cartItems[cartItems.length - 1]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">Giỏ hàng trống</div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Tổng tiền:</span>
              <span className="font-bold text-lg">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
              </span>
            </div>
            <Button className="w-full" size="lg">
              Thanh toán ({selectedCount})
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
