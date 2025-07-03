import { CustomerInfo } from "@/components/checkout/customer-info";
import { Invoice } from "@/components/checkout/invoice";
import { OrderSummary } from "@/components/checkout/order-summary";

const CheckoutPage = () => {
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
          <OrderSummary />
          <Invoice />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
