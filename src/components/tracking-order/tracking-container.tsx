"use client";

import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import { SearchSection } from "./search-section";
import { OrderOverview } from "./order-overview";
import { PhoneVerification } from "./phone-verification";
import { useOrdersQuery } from "@/queries/order";
import { toast } from "sonner";
import useDebounce from "@/hooks/use-debounce";

export default function TrackingContainer() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verifiedPhoneLast4, setVerifiedPhoneLast4] = useState("");

  const debouncedTrackingNumber = useDebounce(trackingNumber, 500);

  const { data: orders = [], isLoading } = useOrdersQuery(
    debouncedTrackingNumber
  );

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      toast.error("Vui lòng nhập mã đơn hàng");
      return;
    }

    setShowResults(false);
    setSelectedOrder(null);
    setShowVerification(false);
  };

  useEffect(() => {
    if (debouncedTrackingNumber && !isLoading) {
      if (orders.length > 0) {
        const exactMatch = orders.find(
          (order: Order) => order.id === debouncedTrackingNumber
        );

        if (exactMatch) {
          setSelectedOrder(exactMatch);
          setShowResults(false);
          setShowVerification(true);
          toast.success("Tìm thấy đơn hàng!");
        } else {
          setSelectedOrder(null);
          setShowResults(true);
          toast.success(`Tìm thấy ${orders.length} đơn hàng!`);
        }
      } else if (debouncedTrackingNumber.trim()) {
        setShowResults(false);
        setSelectedOrder(null);
        toast.error("Không tìm thấy đơn hàng");
      }
    }
  }, [orders, isLoading, debouncedTrackingNumber]);

  const copyTrackingNumber = () => {
    if (selectedOrder) {
      navigator.clipboard.writeText(selectedOrder.id);
      toast.success("Đã sao chép mã đơn hàng");
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowVerification(true);
    setShowResults(false);
  };

  const handlePhoneVerify = (phoneLast4Digits: string) => {
    setVerifiedPhoneLast4(phoneLast4Digits);
    setShowVerification(false);
  };

  const handleBackToSearch = () => {
    setShowVerification(false);
    setShowResults(true);
    setSelectedOrder(null);
  };

  // const fullName = trackingData?.user
  //   ? `${trackingData.user.firstName} ${trackingData.user.lastName}`
  //   : JSON.parse(trackingData?.walkinInformation as string)?.firstName + " " + JSON.parse(trackingData?.walkinInformation as string)?.lastName;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Tra cứu đơn hàng</h1>
          <p className="text-gray-600">
            Nhập mã đơn hàng để tìm kiếm đơn hàng của bạn
          </p>
        </div>

        <SearchSection
          trackingNumber={trackingNumber}
          onTrackingNumberChange={setTrackingNumber}
          onTrack={handleTrack}
        />

        {isLoading && debouncedTrackingNumber && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Đang tra cứu đơn hàng...</p>
          </div>
        )}

        {showVerification && selectedOrder && (
          <PhoneVerification
            orderId={selectedOrder.id}
            onVerify={handlePhoneVerify}
            onBack={handleBackToSearch}
          />
        )}

        {selectedOrder && verifiedPhoneLast4 && !showVerification && (
          <div className="space-y-6">
            <OrderOverview
              orderId={selectedOrder.id}
              phoneLast4Digits={verifiedPhoneLast4}
              onCopyTrackingNumber={copyTrackingNumber}
            />
          </div>
        )}

        {showResults && !selectedOrder && orders.length > 0 && !isLoading && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Kết quả tìm kiếm ({orders.length} đơn hàng)
              </h2>
              <div className="grid gap-4">
                {orders.map((order: Order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleOrderClick(order)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">#{order.id}</p>
                        <p>
                          {order.user
                            ? `${order.user?.firstName} ${order.user?.lastName}`
                            : `${
                                JSON.parse(order.walkinInformation as string)
                                  ?.firstName
                              } ${
                                JSON.parse(order.walkinInformation as string)
                                  ?.lastName
                              }`}
                        </p>
                        <p>
                          {order.user
                            ? order.user?.email
                            : JSON.parse(order.walkinInformation as string)
                                ?.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.orderItems?.length || 0} sản phẩm
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.totalPrice)}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            order.status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : order.status === "SHIPPING"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "PROCESSING"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "CANCELED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {debouncedTrackingNumber &&
          !isLoading &&
          !selectedOrder &&
          orders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                Không tìm thấy đơn hàng với mã "{trackingNumber}"
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
