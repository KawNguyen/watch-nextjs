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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCouponsUserCanUseQuery } from "@/queries/coupon";
import { formatMoney } from "@/lib/utils";

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

interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: "PERCENT" | "FIXED";
  discountValue: number;
  minOrderValue?: number;
  count?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;

  discountAmount: number;
  finalPrice: number;
  canUse: boolean;
  reason: string;
}

const CheckoutContainer = () => {
  const { isAuthenticated, profile } = useAuth();
  const { selectedItems } = useCheckoutStore();
  const [isMounted, setIsMounted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoType | null>(
    null
  );
  const [shippingNotes, setShippingNotes] = useState("");
  const { createOrderFromCart, createOrderWalkin } = useOrderMutation();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | undefined>(
    undefined
  );
  const { data: availableCoupons } = useCouponsUserCanUseQuery(
    selectedItems.reduce(
      (sum, item) => sum + item.watch.price * item.quantity,
      0
    )
  );

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
      couponId: selectedCoupon?.id || undefined,
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
      <h1 className="text-4xl font-bold pb-4">Thanh Toán</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <CustomerInfo
            profile={profile || undefined}
            setCustomerInfo={setCustomerInfo}
            customerInfo={customerInfo}
          />

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <label className="block text-sm font-medium mb-2">
              Ghi Chú Giao Hàng (Tùy Chọn)
            </label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows={3}
              placeholder="Nhập ghi chú giao hàng của bạn tại đây..."
              value={shippingNotes}
              onChange={(e) => setShippingNotes(e.target.value)}
            />
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <label className="block text-sm font-medium mb-2">
              Mã Giảm Giá (Tùy Chọn)
            </label>

            <Select
              value={selectedCoupon?.id}
              onValueChange={(id) => {
                const coupon: Coupon | undefined = availableCoupons?.find(
                  (c: Coupon) => c.id === id
                );
                setSelectedCoupon(coupon);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn mã giảm giá" />
              </SelectTrigger>
              <SelectContent>
                {availableCoupons?.map((coupon: Coupon) => (
                  <SelectItem key={coupon.id} value={coupon.id}>
                    {coupon.code} -{" "}
                    {coupon.discountType === "PERCENT"
                      ? `${coupon.discountValue}%`
                      : `${formatMoney(coupon.discountValue)}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="col-span-5 space-y-4">
          <OrderSummary items={selectedItems} />
          <Invoice
            items={selectedItems}
            discountValue={selectedCoupon?.discountValue ?? 0}
            discountType={selectedCoupon?.discountType ?? "FIXED"}
          />
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
                Đang xử lý...
              </>
            ) : (
              "Đặt Hàng"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
