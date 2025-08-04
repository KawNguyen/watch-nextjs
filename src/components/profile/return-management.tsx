"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RotateCcw, Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import Image from "next/image";
import { ReturnRequestDetailsModal } from "./return-request-detail-modal";
import { ReturnRequest, ReturnStatus } from "@/types/return-request";
import { useGetMyReturnRequests } from "@/queries/return-request";

const tabs = [
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Completed", value: "COMPLETED" },
];

const getStatusConfig = (status: ReturnStatus) => {
  switch (status) {
    case ReturnStatus.PENDING:
      return {
        variant: "outline" as const,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: Clock,
        label: "Pending Review",
      };
    case ReturnStatus.APPROVED:
      return {
        variant: "secondary" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        label: "Approved",
      };
    case ReturnStatus.REJECTED:
      return {
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: XCircle,
        label: "Rejected",
      };

    case ReturnStatus.COMPLETED:
      return {
        variant: "secondary" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        label: "Completed",
      };
    case ReturnStatus.CANCELLED:
      return {
        variant: "outline" as const,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
        icon: XCircle,
        label: "Cancelled",
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function ReturnManagement() {
  const [status, setStatus] = useState<ReturnStatus | "PENDING">("PENDING");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: returnRequests } = useGetMyReturnRequests(status);

  const handleViewDetails = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsDetailsModalOpen(true);
  };

  const renderRequestTable = (requests: ReturnRequest[]) => {
    if (requests.length === 0) {
      return (
        <div className="text-center py-12">
          <RotateCcw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            No return requests found
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't submitted any return requests yet
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => {
                const statusConfig = getStatusConfig(request.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={request.images[0] || "/placeholder.svg"}
                            alt={request.orderItem.watch.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {request.orderItem.watch.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            #{request.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      #{request.orderId.slice(0, 8)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {getReasonLabel(request.reason)}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.returnQuantity}</TableCell>
                    <TableCell className="font-semibold">
                      {formatPrice(
                        request.orderItem.price * request.returnQuantity
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusConfig.variant}
                        className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(request.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(request.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {returnRequests.map((request: ReturnRequest) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={request.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-3 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={request.images[0] || "/placeholder.svg"}
                        alt={request.orderItem.watch.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1">
                        {request.orderItem.watch.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        Return ID: #{request.id.slice(0, 8)}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {getReasonLabel(request.reason)}
                        </Badge>
                        <Badge
                          variant={statusConfig.variant}
                          className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color} text-xs`}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Order ID</p>
                      <p className="font-mono">
                        #{request.orderId.slice(0, 8)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-medium">{request.returnQuantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-semibold text-green-600">
                        {formatPrice(
                          request.orderItem.price * request.returnQuantity
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p>{formatDate(request.createdAt)}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(request.id)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <RotateCcw className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>Return Requests</CardTitle>
              <CardDescription>
                Manage your product return requests and track their status
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatus(tab.value as ReturnStatus)}
                aria-selected={status === tab.value}
                role="tab"
                className={`text-sm px-4 py-2 whitespace-nowrap transition-colors flex-shrink-0 ${
                  status === tab.value
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">{renderRequestTable(returnRequests || [])}</div>
        </CardContent>
      </Card>

      {selectedRequestId && (
        <ReturnRequestDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          requestId={selectedRequestId}
        />
      )}
    </>
  );
}
