export interface ReturnRequestDto {
  orderId: string;
  orderItemId: string;
  returnQuantity: number;
  reason: string;
  images: string[];
}

export interface ReturnRequestResponse {
  data: { item: ReturnRequest };
  status: string;
  message: string;
}

export enum ReturnStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface ReturnRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  images: string[];
  orderId: string;
  orderItemId: string;
  userId: string;
  reason: string;
  returnQuantity: number;
  status: ReturnStatus;
  processedAt: string | null;
  order: {
    id: string;
    totalPrice: number;
  };
  orderItem: {
    id: string;
    orderId: string;
    watchId: string;
    price: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    watch: {
      id: string;
      name: string;
      price: number;
    };
  };
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
