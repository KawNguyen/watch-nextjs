import { Watch } from "./watch";

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

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: number;
  originalPrice: number;
  couponId: string | null;
  coupon: any | null;
  cancellationReason: string | null;
  paymentMethod: paymentMethodEnum;
  shippingNotes: string;
  deliveryAddress: string;
  orderItems: OrderItem[];
  walkinInformation: any | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  watchId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  watch: Watch;
}
