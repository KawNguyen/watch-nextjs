export interface CreateOrderDto {
  addressId?: string;
  couponId?: string;
  shippingNotes: string;
  paymentMethod: paymentMethodEnum.COD;

  walkinInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    provinceName: string;
    districtName: string;
    wardName: string;
  };

  totalPrice: number;
  originalPrice: number;

  orderItems: {
    watchId: string;
    quantity: number;
    price: number;
  }[];
}

export enum paymentMethodEnum {
  COD = "COD",
  MOMO = "MOMO",
}
