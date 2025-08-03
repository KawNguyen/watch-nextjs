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
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  PackageCheck,
} from "lucide-react";
import { formatDate, formatMoney } from "@/lib/utils";
import { OrderDetailsModal } from "./order-details-modal";
import { useCancelOrderMutation, useMyOrdersQuery } from "@/queries/order";
import { Order, OrderStatus } from "@/types/order";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { toast } from "sonner";
import { queryClient } from "../providers/providers";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderHistory() {
  const tabs: { label: string; value: OrderStatus }[] = [
    { label: "Pending", value: OrderStatus.PENDING },
    { label: "Processing", value: OrderStatus.PROCESSING },
    { label: "Shipping", value: OrderStatus.SHIPPING },
    { label: "Delivered", value: OrderStatus.DELIVERED },
    { label: "Completed", value: OrderStatus.COMPLETED },
    { label: "Canceled", value: OrderStatus.CANCELED },
  ];

  const [isCancelOrderOpen, setIsCancelOrderOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.PENDING);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { data: orders = [], isLoading, error } = useMyOrdersQuery(activeTab);
  const cancelOrderMutation = useCancelOrderMutation();

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
  };

  const handleCancelOrder = async (reason: string) => {
    cancelOrderMutation.mutate(
      { orderId: selectedOrderId as string, reason },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: ["my-orders"] });
        },
        onSettled: () => {
          setSelectedOrderId(null);
          setIsCancelOrderOpen(false);
        },
      }
    );
  };

  const handleOpenCancelOrderDialog = (orderId: string) => {
    setIsCancelOrderOpen(true);
    setSelectedOrderId(orderId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="p-4">
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            View and track your orders by status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                aria-selected={activeTab === tab.value}
                role="tab"
                className={`text-sm px-4 py-2 whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab.value
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">{renderOrderTable(orders, isLoading)}</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-red-500">
          <p>Error fetching orders: {(error as Error).message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle>Order History</CardTitle>
          <CardDescription>
            View and track your orders by status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                aria-selected={activeTab === tab.value}
                role="tab"
                className={`text-sm px-4 py-2 whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab.value
                    ? "border-b-2 border-primary text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">{renderOrderTable(orders, isLoading)}</div>
        </CardContent>
      </Card>{" "}
      {selectedOrderId && (
        <OrderDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          orderId={selectedOrderId}
        />
      )}
      <CancelOrderDialog
        open={isCancelOrderOpen}
        onOpenChange={setIsCancelOrderOpen}
        onConfirm={handleCancelOrder}
        isLoading={cancelOrderMutation.isPending}
      />
    </>
  );

  function renderOrderTable(orders: Order[], isLoading: boolean) {
    if (isLoading) {
      return (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found</p>
        </div>
      );
    }

    return (
      <>
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: Order) => {
                const statusConfig = getStatusConfig(order.status);
                const actionButton = getActionButton(order);
                const StatusIcon = statusConfig.icon;

                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium truncate max-w-[150px]">
                      {order.id}
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell className="font-semibold">
                      {formatMoney(order.totalPrice)}
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
                    <TableCell>
                      <div className="flex gap-2">
                        {actionButton.text !== "View Details" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(order.id)}
                          >
                            View Details
                          </Button>
                        )}
                        <Button
                          variant={actionButton.variant}
                          size="sm"
                          onClick={actionButton.onClick}
                          disabled={actionButton.disabled}
                        >
                          {actionButton.text}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="md:hidden space-y-4">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const actionButton = getActionButton(order);
            const StatusIcon = statusConfig.icon;

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg truncate max-w-[150px]">
                        {order.id}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={statusConfig.variant}
                      className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${statusConfig.color}`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">
                      {order.orderItems.length}
                    </span>
                    <span className="font-semibold text-lg">
                      {formatMoney(order.totalPrice)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={actionButton.variant}
                      size="sm"
                      onClick={actionButton.onClick}
                      className="flex-1"
                      disabled={actionButton.disabled}
                    >
                      {actionButton.text}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </>
    );
  }

  type BadgeVariant = "outline" | "secondary" | "default" | "destructive";

  function getStatusConfig(status: OrderStatus): {
    variant: BadgeVariant;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ElementType;
    label: string;
  } {
    switch (status) {
      case OrderStatus.PENDING:
        return {
          variant: "outline",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          icon: Clock,
          label: "Pending",
        };
      case OrderStatus.PROCESSING:
        return {
          variant: "secondary",
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: PackageCheck,
          label: "Processing",
        };
      case OrderStatus.SHIPPING:
        return {
          variant: "default",
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          icon: Truck,
          label: "Shipping",
        };
      case OrderStatus.DELIVERED:
      case OrderStatus.COMPLETED:
        return {
          variant: "secondary",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: CheckCircle,
          label: status === OrderStatus.DELIVERED ? "Delivered" : "Completed",
        };
      case OrderStatus.CANCELED:
        return {
          variant: "destructive",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: XCircle,
          label: "Canceled",
        };
    }
  }

  function getActionButton(order: Order): {
    text: string;
    variant:
      | "outline"
      | "secondary"
      | "default"
      | "destructive"
      | "link"
      | "ghost";
    onClick: () => void;
    disabled: boolean;
  } {
    switch (order.status) {
      case OrderStatus.PENDING:
        return {
          text: "Cancel Order",
          variant: "outline",
          onClick: () => handleOpenCancelOrderDialog(order.id),
          disabled: false,
        };
      case OrderStatus.PROCESSING:
        return {
          text: "View Details",
          variant: "outline",
          onClick: () => handleViewDetails(order.id),
          disabled: false,
        };
      case OrderStatus.SHIPPING:
      case OrderStatus.DELIVERED:
        return {
          text: "Reorder",
          variant: "outline",
          onClick: () => {},
          disabled: false,
        };
      case OrderStatus.COMPLETED:
      // return {
      //   text: "Review",
      //   variant: "default",
      //   onClick: () => {},
      //   disabled: false,
      // };
      case OrderStatus.CANCELED:
      default:
        return {
          text: "View Details",
          variant: "outline",
          onClick: () => handleViewDetails(order.id),
          disabled: false,
        };
    }
  }
}
