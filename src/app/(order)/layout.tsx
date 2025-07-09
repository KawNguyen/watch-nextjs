import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <CheckoutHeader />
      {children}
    </main>
  );
};

export default layout;
