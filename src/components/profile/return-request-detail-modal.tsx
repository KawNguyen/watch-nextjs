"use client";

import {
  RotateCcw,
  Package,
  DollarSign,
  User,
  MessageSquare,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetReturnRequest } from "@/queries/return-request";
import { formatDateTime } from "@/lib/utils";

enum ReturnStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
}

interface ReturnRequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

const getStatusConfig = (status: ReturnStatus) => {
  switch (status) {
    case ReturnStatus.PENDING:
      return {
        variant: "outline" as const,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        label: "Pending Review",
      };
    case ReturnStatus.APPROVED:
      return {
        variant: "secondary" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        label: "Approved",
      };
    case ReturnStatus.REJECTED:
      return {
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        label: "Rejected",
      };

    case ReturnStatus.COMPLETED:
      return {
        variant: "secondary" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        label: "Completed",
      };
  }
};

const getReasonLabel = (reason: string) => {
  const reasonMap: Record<string, string> = {
    damaged: "Item Damaged",
    wrong_item: "Wrong Item Received",
    defective: "Defective Product",
    not_as_described: "Not as Described",
    changed_mind: "Changed Mind",
    size_issue: "Size Issue",
    quality_issue: "Quality Issue",
  };
  return reasonMap[reason] || reason;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export function ReturnRequestDetailsModal({
  isOpen,
  onClose,
  requestId,
}: ReturnRequestDetailsModalProps) {
  const { data: request } = useGetReturnRequest(requestId);
  console.log(request);

  const statusConfig = getStatusConfig(request?.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-orange-600" />
            Chi tiết yêu cầu đổi trả
          </DialogTitle>
          <DialogDescription>
            Mã đổi trả: #{request?.id.slice(0, 8)} • Ngày gửi:{" "}
            {formatDateTime(request?.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 pr-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Trạng thái yêu cầu</span>
                  <Badge
                    variant={statusConfig?.variant}
                    className={`${statusConfig?.bgColor} ${statusConfig?.borderColor} ${statusConfig?.color} text-sm px-3 py-1`}
                  >
                    {statusConfig?.label}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ngày gửi</p>
                    <p className="font-medium">
                      {formatDateTime(request?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Cập nhật lần cuối
                    </p>
                    <p className="font-medium">
                      {formatDateTime(request?.updatedAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Thông tin sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        request?.orderItem.watch?.images[0].absolute_url ||
                        "/placeholder.svg"
                      }
                      alt={request?.orderItem.watch.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">
                      {request?.orderItem.watch.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Giá gốc</p>
                        <p className="font-semibold">
                          {formatPrice(
                            request?.orderItem.price * request?.returnQuantity
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Số lượng trả lại</p>
                        <p className="font-medium">
                          {request?.returnQuantity} of{" "}
                          {request?.orderItem.quantity}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Số tiền hoàn trả</p>
                        <p className="font-semibold text-green-600">
                          {formatPrice(request?.order.totalPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Mã đơn hàng</p>
                        <p className="font-mono">#{request?.orderId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Lý do trả hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-sm">
                    {getReasonLabel(request?.reason)}
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {request?.reason === "damaged" &&
                    "Sản phẩm bị hư hỏng và không thể sử dụng."}
                  {request?.reason === "wrong_item" &&
                    "Sản phẩm nhận được không đúng với đơn hàng."}
                  {request?.reason === "defective" &&
                    "Sản phẩm có lỗi sản xuất hoặc không hoạt động đúng cách."}
                  {request?.reason === "not_as_described" &&
                    "Sản phẩm không khớp với mô tả hoặc hình ảnh đã hiển thị."}
                  {request?.reason === "changed_mind" &&
                    "Khách hàng đã thay đổi ý định về việc mua hàng."}
                  {request?.reason === "size_issue" &&
                    "Sản phẩm không vừa hoặc sai kích cỡ."}
                  {request?.reason === "quality_issue" &&
                    "Chất lượng sản phẩm không đạt yêu cầu."}
                </p>
              </CardContent>
            </Card>
            {request?.images && request?.images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Hình ảnh mô tả ({request?.images.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {request?.images.map((image: any, index: number) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Evidence ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tên khách hàng</p>
                    <p className="font-medium">
                      {request?.user.firstName} {request?.user.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Địa chỉ email</p>
                    <p className="font-medium">{request?.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Mã khách hàng</p>
                    <p className="font-mono text-sm">
                      #{request?.user.id.slice(0, 8)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tổng đơn hàng</p>
                    <p className="font-semibold">
                      {formatPrice(request?.order.totalPrice)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4">
              {request?.status === ReturnStatus.PENDING && (
                <>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Liên hệ hỗ trợ
                  </Button>
                </>
              )}
              {request?.status === ReturnStatus.APPROVED && (
                <Button className="flex-1">
                  <Package className="h-4 w-4 mr-2" />
                  In nhãn hoàn trả
                </Button>
              )}
              {request?.status === ReturnStatus.COMPLETED && (
                <Button variant="outline" className="flex-1 bg-transparent">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Xem chi tiết hoàn tiền
                </Button>
              )}
              <Button variant="outline" className="flex-1 bg-transparent">
                Tải hóa đơn
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
