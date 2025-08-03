import React from "react";
import { CartItem } from "@/types/cart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";

export const Invoice = ({
  items,
  discountValue,
  discountType,
}: {
  items: CartItem[];
  discountValue: number;
  discountType: string;
}) => {
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 1000
  )}`;
  const date = new Date().toLocaleDateString();

  if (discountType === "PERCENT") {
    discountValue = items.reduce(
      (sum, item) =>
        sum + (item.watch.price * item.quantity * discountValue) / 100,
      0
    );
  } else if (discountType === "FIXED") {
    discountValue = items.reduce((sum) => sum + discountValue, 0);
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.watch.price * item.quantity,
    0
  );

  const total = subtotal - discountValue;

  return (
    <Card className="p-4 bg-gray-100">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg">Invoice</CardTitle>
          <CardDescription>Invoice #: {invoiceNumber}</CardDescription>
          <CardDescription>Date: {date}</CardDescription>
        </div>
        <div className="text-right">
          <h3 className="font-bold text-xl text-gray-800">KronLux</h3>
          <p className="text-gray-500 text-sm">Premium Watch Store</p>
        </div>
      </CardHeader>

      <CardContent className="border-t border-gray-200 py-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="pb-2">Description</th>
              <th className="pb-2 text-center">Quantity</th>
              <th className="pb-2 text-right">Price</th>
              <th className="pb-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-gray-800 text-sm">
                <td className="py-2">{item.watch.name}</td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-right">
                  {formatMoney(item.watch.price)}
                </td>
                <td className="py-2 text-right">
                  {formatMoney(item.quantity * item.watch.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardHeader>
        <CardTitle className="text-base text-gray-800">
          Payment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-gray-900">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Coupon Discount</span>
          <span className="text-gray-900">
            {formatMoney(discountValue || 0)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-gray-900">
        <span>Total Amount</span>
        <span>{formatMoney(total)}</span>
      </CardFooter>
    </Card>
  );
};
