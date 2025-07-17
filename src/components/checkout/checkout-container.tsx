"use client";

import { useCheckoutStore } from "@/store/checkout.store";
import { CustomerInfo } from "./customer-info";
import { Invoice } from "./invoice";
import { OrderSummary } from "./order-summary";

const CheckoutContainer = () => {
  const { selectedItems } = useCheckoutStore();

  return (
    <div className="container mx-auto py-4 ">
      <div className="text-left text-4xl font-bold pb-4">
        <h1>Checkout</h1>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <CustomerInfo />
        </div>
        <div className="col-span-5 space-y-4">
          <OrderSummary items={selectedItems} />
          <Invoice items={selectedItems} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
