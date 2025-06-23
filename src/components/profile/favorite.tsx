"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const wishlistItems = [
  { id: 1, name: "Wireless Headphones", price: "$199.99" },
  { id: 2, name: "Smart Watch", price: "$299.99" },
  { id: 3, name: "Bluetooth Speaker", price: "$89.99" },
];

export function Favorite() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>Items you&#39;ve saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Product"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                <h4 className="font-medium mb-2">{item.name}</h4>
                <p className="text-lg font-semibold mb-3">{item.price}</p>
                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
