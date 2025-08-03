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
import Link from "next/link";

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
  const deliveryAddress = orderDetails?.deliveryAddress
    ? JSON.parse(orderDetails.deliveryAddress)
    : {
        street: "",
        provinceName: "",
        districtName: "",
        wardName: "",
      };

  if (!orderDetails) return null;

  const statusConfig = getStatusConfig(orderDetails?.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-bold">
            <Package className="h-6 w-6 text-blue-600" />
            Order #{orderDetails?.id}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Placed on {orderDetails?.date} • {orderDetails?.orderItems.length}{" "}
            item{orderDetails?.orderItems.length > 1 ? "s" : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <StatusIcon className="h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={statusConfig.variant}
                className={`inline-flex items-center ${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color} text-sm px-4 py-1 rounded-full`}
              >
                <StatusIcon className="h-4 w-4 mr-1" />
                {statusConfig.label}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderDetails?.orderItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto,1fr,auto] gap-4 items-center"
                  >
                    <Link
                      href={`/collections/${item.watch.slug}`}
                      className="hover:opacity-90 transition"
                    >
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted">
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
                    </Link>
                    <div>
                      <h4 className="font-medium text-base">
                        {item.watch.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-primary mt-1">
                        {formatMoney(item.watch.price * item.quantity)}
                      </p>
                    </div>
                    <ReviewDialog watchId={item.watch.id} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {deliveryAddress.street}, {deliveryAddress.wardName},{" "}
                {deliveryAddress.districtName}, {deliveryAddress.provinceName}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="font-medium">{orderDetails?.paymentMethod}</p>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Original Price:</span>
                <span>{formatMoney(orderDetails.originalPrice)}</span>
              </div>

              {orderDetails?.coupon ? (
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-foreground">
                      Coupon:
                    </span>
                    <span className="font-semibold text-red-600">
                      - {formatMoney(orderDetails.coupon.discountValue)}
                    </span>
                  </div>
                  <div className="pl-2 text-xs text-gray-500">
                    <p>
                      <strong>Code:</strong> {orderDetails.coupon.code}
                    </p>
                    {orderDetails.coupon.discountPercent && (
                      <p>
                        <strong>Discount:</strong>{" "}
                        {orderDetails.coupon.discountPercent}%
                      </p>
                    )}
                    {orderDetails.coupon.minOrder && (
                      <p>
                        <strong>Min. Order:</strong>{" "}
                        {formatMoney(orderDetails.coupon.minOrder)}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Coupon:</span>
                  <span className="italic">None</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{formatMoney(orderDetails.totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
