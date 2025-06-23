"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "#ORD-001",
    date: "Dec 15, 2023",
    items: "3 items",
    total: "$299.99",
    status: "Delivered",
    statusVariant: "secondary" as const,
    action: "View Details",
  },
  {
    id: "#ORD-002",
    date: "Dec 10, 2023",
    items: "1 item",
    total: "$89.99",
    status: "Shipped",
    statusVariant: "default" as const,
    action: "Track Order",
  },
  {
    id: "#ORD-003",
    date: "Dec 5, 2023",
    items: "2 items",
    total: "$159.98",
    status: "Processing",
    statusVariant: "outline" as const,
    action: "View Details",
  },
]

export function OrderHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge variant={order.statusVariant}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    {order.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
