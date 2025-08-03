"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Package,
  Truck,
  Shield,
  Star,
  Download,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useOrderQuery } from "@/queries/order";
import { formatMoney } from "@/lib/utils";

export default function Component() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderInfo") ?? router.push("/");

  const { data, isLoading } = useOrderQuery(orderId as string);

  const orderDate = new Date(data?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-8" />
      </div>
    );

  const deliveryAddress = JSON.parse(data?.deliveryAddress as string);
  const fullName = data?.user
    ? `${data.user.firstName} ${data.user.lastName}`
    : JSON.parse(data.walkinInformation as string)?.firstName +
      " " +
      JSON.parse(data.walkinInformation as string)?.lastName;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold text-lg">{data?.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold">{orderDate}</p>
                  </div>
                </div>

                <Separator />
                {data?.orderItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={
                          item.watch.images[0]?.absolute_url ||
                          "https://placehold.co/96x96/png"
                        }
                        alt="Rolex Submariner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {item.watch.name}
                      </h3>
                      <p className="text-gray-600">Black Dial, Steel Case</p>
                      <p className="text-sm text-gray-500">Model: 126610LN</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          (4.9)
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Authentic Certified
                        </Badge>
                        <span className="font-bold text-xl">
                          {formatMoney(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Shipping Address</p>
                    <div className="mt-1">
                      <p className="font-medium">{fullName}</p>
                      <p className="text-gray-700">{deliveryAddress.street}</p>
                      <p className="text-gray-700">
                        {deliveryAddress.wardName},{" "}
                        {deliveryAddress.districtName},{" "}
                        {deliveryAddress.provinceName}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shipping Method</p>
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-gray-600">2-3 business days</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">Tracking Information</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Your tracking number will be sent to your email within 24
                    hours
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{"What's Next?"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Order Processing</p>
                      <p className="text-sm text-gray-600">
                        {"We're preparing your watch for shipment"} (1-2
                        business days)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Shipping Confirmation</p>
                      <p className="text-sm text-gray-600">
                        {"You'll receive tracking information via email"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-blue-600">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm text-gray-600">
                        Your watch will arrive in 2-3 business days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatMoney(data?.originalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon:</span>
                    <span>- {formatMoney(data?.coupon.discountValue)}</span>
                  </div>

                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Paid:</span>
                    <span>{formatMoney(data?.totalPrice)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    Payment Successful
                  </p>
                  <p className="text-xs text-green-700">
                    Charged to card ending in 3456
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button className="w-full" variant="outline">
                  <Package className="w-4 h-4 mr-2" />
                  Track Your Order
                </Button>
                <Button className="w-full" onClick={() => router.push("/")}>
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Warranty & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm">
                      2-Year International Warranty
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">30-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Authentication Certificate</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="font-medium text-sm">Need Help?</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>support@watchstore.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>1-800-WATCHES</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Confirmation Email Sent</p>
                <p className="text-sm text-gray-600">
                  {"We've sent a detailed confirmation email to "}{" "}
                  <strong>john@example.com</strong>{" "}
                  {" with your order details and tracking information."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
