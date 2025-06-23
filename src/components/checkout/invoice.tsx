import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const Invoice = () => {
  const invoiceDetails = {
    invoiceNumber: "INV-2023-001",
    date: new Date().toLocaleDateString(),
    items: [
      {
        description: "Chronograph Classic Watch",
        quantity: 1,
        price: 299.99,
      },
      {
        description: "Chronograph Classic Watch",
        quantity: 1,
        price: 299.99,
      },
    ],
    subtotal: 299.99 * 2,
    shipping: 9.99,
    tax: 24.0,
  };

  const total =
    invoiceDetails.subtotal + invoiceDetails.shipping + invoiceDetails.tax;

  return ( 
      <Card className="p-4 bg-gray-100">
        <CardHeader className="flex flex-row justify-between items-start">
          <div>
            <CardTitle className="text-lg">Invoice</CardTitle>
            <CardDescription>
              Invoice #: {invoiceDetails.invoiceNumber}
            </CardDescription>
            <CardDescription>Date: {invoiceDetails.date}</CardDescription>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-xl text-gray-800">Chrono</h3>
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
              {invoiceDetails.items.map((item, index) => (
                <tr key={index} className="text-gray-800 text-sm">
                  <td className="py-2">{item.description}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-2 text-right">
                    ${(item.quantity * item.price).toFixed(2)}
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
            <span className="text-gray-900">
              ${invoiceDetails.subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className="text-gray-900">
              ${invoiceDetails.shipping.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax</span>
            <span className="text-gray-900">${invoiceDetails.tax.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-gray-900">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </CardFooter>
      </Card>
  );
};
