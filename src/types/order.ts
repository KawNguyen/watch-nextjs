export interface OrderPayload {
  deliveryAddress: {
    street: string;
    provinceName: string;
    districtName: string;
    wardName: string;
  };
  couponId?: string;
  shippingNotes?: string;
  paymentMethod: paymentMethodEnum;
  walkinInformation?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
  originalPrice: number;
  cartItems: {
    id?: string;
    watchId: string;
    quantity: number;
    price: number;
  }[];
}

export interface CartItems {
  id?: string;
  watchId: string;
  quantity: number;
  price: number;
}

export enum paymentMethodEnum {
  COD = "COD",
  MOMO = "MOMO",
}
