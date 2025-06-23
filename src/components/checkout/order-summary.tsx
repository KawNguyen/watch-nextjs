import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const OrderSummary = () => {
  const order = [
    {
      item: "Chronograph Classic Watch",
      model: "CX-5123",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1604&q=80",
    },
    {
      item: "Luxury Leather Strap Watch",
      model: "LX-8831",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1604&q=80",
    },
    {
      item: "Luxury Leather Strap Watch",
      model: "LX-8831",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1604&q=80",
    },
  ];

  return (
    <Card className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-2 overflow-y-scroll h-[150px]">
        {order.map((product, index) => (
          <Card key={index} className="flex gap-4 items-start bg-gray-100 ">
            <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product.image}
                alt={product.item}
                className="w-full h-full object-cover "
                width={160}
                height={160}
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900">{product.item}</h3>
              <p className="text-gray-500 text-sm">Model: {product.model}</p>
              <p className="font-semibold text-gray-900 mt-1">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};
