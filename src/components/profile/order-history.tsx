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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: OrderStatus;
  trackingNumber?: string;
}

const allOrders: Order[] = [
  {
    id: "#ORD-001",
    date: "Dec 15, 2023",
    items: "3 items",
    total: "$299.99",
    status: OrderStatus.DELIVERED,
    trackingNumber: "TRK123456789",
  },
  {
    id: "#ORD-002",
    date: "Dec 10, 2023",
    items: "1 item",
    total: "$89.99",
    status: OrderStatus.SHIPPED,
    trackingNumber: "TRK987654321",
  },
  {
    id: "#ORD-003",
    date: "Dec 5, 2023",
    items: "2 items",
    total: "$159.98",
    status: OrderStatus.PROCESSING,
  },
  {
    id: "#ORD-004",
    date: "Dec 1, 2023",
    items: "1 item",
    total: "$49.99",
    status: OrderStatus.PENDING,
  },
  {
    id: "#ORD-005",
    date: "Nov 28, 2023",
    items: "4 items",
    total: "$399.99",
    status: OrderStatus.CANCELED,
  },
  {
    id: "#ORD-006",
    date: "Nov 25, 2023",
    items: "2 items",
    total: "$129.98",
    status: OrderStatus.DELIVERED,
    trackingNumber: "TRK456789123",
  },
  {
    id: "#ORD-007",
    date: "Nov 20, 2023",
    items: "1 item",
    total: "$79.99",
    status: OrderStatus.PROCESSING,
  },
  {
    id: "#ORD-008",
    date: "Nov 15, 2023",
    items: "3 items",
    total: "$249.97",
    status: OrderStatus.PENDING,
  },
];

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return {
        variant: "outline" as const,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: Clock,
        label: "Pending",
      };
    case OrderStatus.PROCESSING:
      return {
        variant: "secondary" as const,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: Package,
        label: "Processing",
      };
    case OrderStatus.SHIPPED:
      return {
        variant: "default" as const,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        icon: Truck,
        label: "Shipped",
      };
    case OrderStatus.DELIVERED:
      return {
        variant: "secondary" as const,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle,
        label: "Delivered",
      };
    case OrderStatus.CANCELED:
      return {
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: XCircle,
        label: "Canceled",
      };
  }
};

const getActionButton = (order: Order) => {
  switch (order.status) {
    case OrderStatus.PENDING:
      return { text: "Cancel Order", variant: "outline" as const };
    case OrderStatus.PROCESSING:
      return { text: "View Details", variant: "outline" as const };
    case OrderStatus.SHIPPED:
      return { text: "Track Order", variant: "outline" as const };
    case OrderStatus.DELIVERED:
      return { text: "View Details", variant: "outline" as const };
    case OrderStatus.CANCELED:
      return { text: "Reorder", variant: "outline" as const };
    default:
      return { text: "View Details", variant: "outline" as const };
  }
};

export function OrderHistory() {
  const [activeTab, setActiveTab] = useState("all");

  const getFilteredOrders = (status?: OrderStatus) => {
    if (!status) return allOrders;
    return allOrders.filter((order) => order.status === status);
  };

  const getOrderCount = (status?: OrderStatus) => {
    return getFilteredOrders(status).length;
  };

  const renderOrderTable = (orders: Order[]) => {
    if (orders.length === 0) {
      return (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found</p>
        </div>
      );
    }

    return (
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
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const actionButton = getActionButton(order);
            const StatusIcon = statusConfig.icon;

            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
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
                  <Button variant={actionButton.variant} size="sm">
                    {actionButton.text}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader className="pl-6 pt-4"> 
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your orders by status</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none gap-1">
            <TabsTrigger
              value="all"
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              All ({getOrderCount()})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Pending ({getOrderCount(OrderStatus.PENDING)})
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Processing ({getOrderCount(OrderStatus.PROCESSING)})
            </TabsTrigger>
            <TabsTrigger
              value="shipped"
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Shipped ({getOrderCount(OrderStatus.SHIPPED)})
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Delivered ({getOrderCount(OrderStatus.DELIVERED)})
            </TabsTrigger>
            <TabsTrigger
              value="canceled"
              className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Canceled ({getOrderCount(OrderStatus.CANCELED)})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {renderOrderTable(allOrders)}
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            {renderOrderTable(getFilteredOrders(OrderStatus.PENDING))}
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            {renderOrderTable(getFilteredOrders(OrderStatus.PROCESSING))}
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            {renderOrderTable(getFilteredOrders(OrderStatus.SHIPPED))}
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            {renderOrderTable(getFilteredOrders(OrderStatus.DELIVERED))}
          </TabsContent>

          <TabsContent value="canceled" className="mt-6">
            {renderOrderTable(getFilteredOrders(OrderStatus.CANCELED))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
