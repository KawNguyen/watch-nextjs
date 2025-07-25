"use client";

import { useCheckoutStore } from "@/store/checkout.store";
import { CustomerInfo } from "./customer-info";
import { useState, useEffect } from "react";
import { useOrderMutation } from "@/mutation/order.mutation";
import { Invoice } from "./invoice";
import { OrderSummary } from "./order-summary";
import { CartItems, OrderPayload } from "@/types/order";
import { CartItem } from "@/types/cart";
import { paymentMethodEnum } from "@/types/order";
import { Button } from "../ui/button";
import { useAuth } from "@/mutation/auth.mutation";
import { Loader2 } from "lucide-react";

interface CustomerInfoType {
  street: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  payment: string;
}

const CheckoutContainer = () => {
  const { isAuthenticated, profile } = useAuth();
  const { selectedItems } = useCheckoutStore();
  const [isMounted, setIsMounted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoType | null>(
    null
  );
  const [shippingNotes, setShippingNotes] = useState("");
  const [couponId, setCouponId] = useState("");
  const { createOrderFromCart, createOrderWalkin } = useOrderMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="container mx-auto py-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-5">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    if (!customerInfo) return;

    const deliveryAddress = {
      street: customerInfo.street,
      provinceName: customerInfo.provinceName,
      districtName: customerInfo.districtName,
      wardName: customerInfo.wardName,
    };

    const paymentMethod =
      customerInfo.payment === "cod"
        ? paymentMethodEnum.COD
        : paymentMethodEnum.MOMO;

    const cartItems = selectedItems.map((item: CartItem) => ({
      id: item.id || undefined,
      watchId: item.watch.id,
      quantity: item.quantity,
      price: item.watch.price,
    }));

    const totalPrice = cartItems.reduce(
      (sum: number, i: CartItems) => sum + i.price * i.quantity,
      0
    );

    const basePayload: OrderPayload = {
      deliveryAddress,
      couponId: couponId || undefined,
      shippingNotes: shippingNotes ?? "",
      paymentMethod,
      totalPrice,
      originalPrice: totalPrice,
      cartItems,
      walkinInformation: !isAuthenticated
        ? {
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            email: customerInfo.email,
            phone: customerInfo.phone,
          }
        : undefined,
    };

    if (!isAuthenticated) {
      createOrderWalkin.mutate(basePayload);
    } else {
      createOrderFromCart.mutate(basePayload);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold pb-4">Checkout</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <CustomerInfo
            profile={profile || undefined}
            setCustomerInfo={setCustomerInfo}
            customerInfo={customerInfo}
          />

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <label className="block text-sm font-medium mb-2">
              Shipping Notes (Optional)
            </label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows={3}
              placeholder="Any special delivery instructions..."
              value={shippingNotes}
              onChange={(e) => setShippingNotes(e.target.value)}
            />
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <label className="block text-sm font-medium mb-2">
              Coupon Code (Optional)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter coupon code"
              value={couponId}
              onChange={(e) => setCouponId(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-5 space-y-4">
          <OrderSummary items={selectedItems} />
          <Invoice items={selectedItems} />
          <Button
            className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-900"
            onClick={handleOrder}
            disabled={
              createOrderFromCart.isPending || createOrderWalkin.isPending
            }
          >
            {createOrderFromCart.isPending || createOrderWalkin.isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Order is being placed...
              </>
            ) : (
              "Order Now"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
