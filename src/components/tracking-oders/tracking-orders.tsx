"use client"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { orderData } from "@/constant/routes"

export default function Component() {
    const [orderNumber, setOrderNumber] = useState("WTH-2024-001234")



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">


            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">Track Your Order</CardTitle>
                            <p className="text-slate-600 text-center">Enter your order number to track your luxury timepiece</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 max-w-md mx-auto">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                                    <Input
                                        placeholder="Enter order number"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Button>Track Order</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <Package className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Order Status</p>
                                    <p className="text-lg font-semibold">{orderData.status}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 rounded-full">
                                    <Truck className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Estimated Delivery</p>
                                    <p className="text-lg font-semibold">{orderData.estimatedDelivery}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 rounded-full">
                                    <CheckCircle className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600">Tracking Number</p>
                                    <p className="text-lg font-semibold">{orderData.trackingNumber}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <Card>
                        <CardHeader className="p-5">
                            <CardTitle>Order Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {orderData.timeline.map((item, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-4 h-4 rounded-full border-2 ${item.completed
                                                    ? item.current
                                                        ? "bg-blue-500 border-blue-500"
                                                        : "bg-green-500 border-green-500"
                                                    : "bg-white border-slate-300"
                                                    }`}
                                            />
                                            {index < orderData.timeline.length - 1 && (
                                                <div className={`w-0.5 h-12 mt-2 ${item.completed ? "bg-green-200" : "bg-slate-200"}`} />
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4
                                                    className={`font-semibold ${item.current ? "text-blue-600" : item.completed ? "text-green-600" : "text-slate-400"
                                                        }`}
                                                >
                                                    {item.status}
                                                </h4>
                                                {item.current && <Badge variant="secondary">Current</Badge>}
                                            </div>
                                            <p className="text-sm text-slate-600 mb-1">{item.date}</p>
                                            <p className="text-sm text-slate-500">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>


                    <div className="space-y-6">

                        <Card>
                            <CardHeader className="p-5">
                                <CardTitle>Product Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={orderData.product.image || "/placeholder.svg"}
                                        alt={orderData.product.name}
                                        width={80}
                                        height={80}
                                        className="rounded-lg border"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{orderData.product.name}</h3>
                                        <p className="text-slate-600">Model: {orderData.product.model}</p>
                                        <p className="text-lg font-bold text-slate-900 mt-1">{orderData.product.price}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                        <Card>
                            <CardHeader className="p-5">
                                <CardTitle>Order Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Order Number:</span>
                                    <span className="font-semibold">{orderData.orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Order Date:</span>
                                    <span className="font-semibold">{orderData.orderDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Amount:</span>
                                    <span className="font-semibold">{orderData.totalAmount}</span>
                                </div>
                                <Separator />
                                <div>
                                    <h4 className="font-semibold mb-2 flex items-center">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        Shipping Address
                                    </h4>
                                    <div className="text-sm text-slate-600 space-y-1">
                                        <p>{orderData.shippingAddress.name}</p>
                                        <p>{orderData.shippingAddress.address}</p>
                                        <p>{orderData.shippingAddress.city}</p>
                                        <p className="flex items-center">
                                            <Phone className="h-3 w-3 mr-1" />
                                            {orderData.shippingAddress.phone}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                        <Card>
                            <CardHeader className="p-5">
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Call Support: 1-800-TIMEKEEPER
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start bg-transparent">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email: support@timekeeper.com
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
