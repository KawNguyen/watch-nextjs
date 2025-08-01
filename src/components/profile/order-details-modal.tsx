"use client";

import {
  Package,
  Truck,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrderQuery } from "@/queries/order";
import { formatMoney } from "@/lib/utils";
import ReviewDialog from "./review-modal";

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return {
        variant: "outline" as const,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: Clock,
        label: "PENDING",
      };
    case OrderStatus.PROCESSING:
      return {
        variant: "secondary" as const,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: Package,
        label: "PROCESSING",
      };
    case OrderStatus.SHIPPING:
      return {
        variant: "default" as const,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        icon: Truck,
        label: "SHIPPING",
      };
    case OrderStatus.DELIVERED:
      return {
        variant: "secondary" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        label: "DELIVERED",
      };
    case OrderStatus.COMPLETED:
      return {
        variant: "default" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        label: "COMPLETED",
      };
    case OrderStatus.CANCELED:
      return {
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: X,
        label: "CANCELED",
      };
    default:
      return {
        variant: "outline" as const,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        icon: Clock,
        label: "UNKNOWN",
      };
  }
};

export function OrderDetailsModal({
  isOpen,
  onClose,
  orderId,
}: OrderDetailsModalProps) {
  const { data: orderDetails } = useOrderQuery(orderId);
  const deliveryAddress = orderDetails?.item.deliveryAddress
    ? JSON.parse(orderDetails.item.deliveryAddress)
    : {
        street: "",
        provinceName: "",
        districtName: "",
        wardName: "",
      };

  if (!orderDetails) return null;

  const statusConfig = getStatusConfig(orderDetails?.item.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Package className="h-5 w-5 text-blue-600" />
            Order Details - {orderDetails?.item.id}
          </DialogTitle>
          <DialogDescription>
            Placed on {orderDetails?.item.date} •{" "}
            {orderDetails?.item.orderItems.length} item
            {orderDetails?.item.orderItems.length > 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <StatusIcon className="h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge
                  variant={statusConfig.variant}
                  className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color} text-sm px-3 py-1`}
                >
                  <StatusIcon className="h-4 w-4 mr-2" />
                  {statusConfig.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails?.item.orderItems.map(
                  (item: any, index: number) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={
                              item.watch.images[0]?.absolute_url ||
                              "/placeholder.svg"
                            }
                            alt={item.watch.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.watch.name}</h4>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-600">
                                Qty: {item.quantity}
                              </span>
                              <span className="font-semibold">
                                {formatMoney(item.watch.price * item.quantity)}
                              </span>
                            </div>
                            <ReviewDialog watchId={item.watch.id} />
                          </div>
                        </div>
                      </div>
                      {index < orderDetails?.item.orderItems.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {deliveryAddress.street}, {deliveryAddress.wardName},{" "}
                {deliveryAddress.districtName}, {deliveryAddress.provinceName}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">
                    {orderDetails?.item.paymentMethod}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatMoney(orderDetails?.item.totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
