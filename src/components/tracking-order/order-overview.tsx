"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, Copy} from "lucide-react";

import { OrderItem } from "@/types/order";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import { useTrackingOrderQuery } from "@/queries/order";

interface OrderOverviewProps {
  orderId: string;
  phoneLast4Digits: string;
  onCopyTrackingNumber: () => void;
}

function getStatusBadgeColor(status: string): string {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800";
    case "PROCESSING":
      return "bg-purple-100 text-purple-800";
    case "SHIPPED":
      return "bg-indigo-100 text-indigo-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "PROCESSING":
      return "Đang xử lý";
    case "SHIPPED":
      return "Đã gửi hàng";
    case "DELIVERED":
      return "Đã giao hàng";
    case "COMPLETED":
      return "Đã hoàn thành";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return status;
  }
}

export function OrderOverview({
  orderId,
  phoneLast4Digits,
  onCopyTrackingNumber,
}: OrderOverviewProps) {
  const { data: trackingData } = useTrackingOrderQuery(
    orderId,
    phoneLast4Digits
  );

  console.log(trackingData);

  const deliveryAddress = trackingData?.deliveryAddress
    ? JSON.parse(trackingData.deliveryAddress)
    : null;
  const statusColor = getStatusBadgeColor(trackingData?.status);
  const statusText = getStatusText(trackingData?.status);
  console.log(trackingData?.status);
  

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Đơn hàng #{trackingData?.id.slice(-8).toUpperCase()}
              <Button
                variant="ghost"
                size="sm"
                onClick={onCopyTrackingNumber}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </CardTitle>
            <CardDescription>
              Ngày đặt: {new Date(trackingData?.createdAt).toLocaleDateString()}{" "}
              • {trackingData?.orderItems.length} sản phẩm
            </CardDescription>
          </div>
          <Badge className={statusColor}>{statusText}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Địa chỉ giao hàng
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                {trackingData?.user.firstName} {trackingData?.user.lastName}
              </p>
              <p>{trackingData?.user.phone}</p>
              <p>{deliveryAddress?.street}</p>
              <p>
                {deliveryAddress?.wardName}, {deliveryAddress?.districtName}
              </p>
              <p>{deliveryAddress?.provinceName}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Sản phẩm đã đặt</h3>
            <div className="space-y-2">
              {trackingData?.orderItems.map((item: OrderItem) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex gap-3">
                    {item.watch?.images.length > 0 && (
                      <Image
                        src={
                          item.watch?.images[0].absolute_url ||
                          "/placeholder.svg"
                        }
                        alt={item.watch?.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.watch?.name}</p>
                      <p className="text-xs text-gray-500">
                        Mã: {item.watch?.code}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Số lượng: {item.quantity}</span>
                        <span>{formatMoney(item.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span>{formatMoney(trackingData?.originalPrice)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Tổng cộng</span>
                  <span>{formatMoney(trackingData?.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Phương thức thanh toán</span>
                  <span>
                    {trackingData?.paymentMethod === "COD"
                      ? "Thanh toán khi nhận hàng"
                      : trackingData?.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
