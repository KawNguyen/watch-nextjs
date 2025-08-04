"use client";

import { useState } from "react";
import {
  Truck,
  RotateCcw,
  Package,
  Clock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  {
    key: "shipping",
    icon: <Truck className="w-5 h-5 text-emerald-600" />,
    title: "Chính sách vận chuyển",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Chúng tôi cung cấp dịch vụ giao hàng miễn phí toàn cầu cho tất cả đơn hàng. Đơn hàng sẽ được xử lý trong vòng 1–2 ngày làm việc. Thời gian giao hàng tùy thuộc vào địa điểm:
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
          <li>Nội địa (Việt Nam): 2–5 ngày làm việc</li>
          <li>Châu Á: 5–10 ngày làm việc</li>
          <li>Quốc tế: 7–14 ngày làm việc</li>
        </ul>
        <p className="text-sm text-gray-600 leading-relaxed mt-2">
          Tất cả các đơn hàng đều có mã theo dõi, sẽ được gửi đến email của bạn sau khi đơn hàng được gửi đi.
        </p>
      </>
    ),
  },
  {
    key: "packaging",
    icon: <Package className="w-5 h-5 text-blue-600" />,
    title: "Đóng gói & Bảo hiểm",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Mỗi chiếc đồng hồ được đóng gói an toàn trong hộp đựng có thương hiệu LuxWatch và được bảo hiểm toàn bộ giá trị trong quá trình vận chuyển. Vui lòng kiểm tra kỹ kiện hàng khi nhận và liên hệ với chúng tôi ngay nếu có bất kỳ hư hại nào.
        </p>
      </>
    ),
  },
  {
    key: "returns",
    icon: <RotateCcw className="w-5 h-5 text-purple-600" />,
    title: "Chính sách đổi trả",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ khi giao hàng đối với đồng hồ chưa sử dụng, không bị hư hại và còn nguyên trong bao bì gốc. Để bắt đầu quy trình đổi/trả, vui lòng liên hệ đội ngũ hỗ trợ tại support@luxwatch.com.
        </p>
        <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
          <li>
            Khách hàng chịu chi phí vận chuyển khi đổi/trả, trừ khi lỗi do chúng tôi gây ra.
          </li>
          <li>
            Khoản hoàn tiền sẽ được xử lý trong vòng 5–7 ngày làm việc sau khi chúng tôi nhận và kiểm tra sản phẩm hoàn trả.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "warranty",
    icon: <Clock className="w-5 h-5 text-yellow-600" />,
    title: "Bảo hành & Sửa chữa",
    content: (
      <>
        <p className="text-sm text-gray-600 leading-relaxed">
          Tất cả đồng hồ LuxWatch được bảo hành quốc tế 2 năm đối với lỗi sản xuất và hỏng hóc kỹ thuật khi sử dụng bình thường. Để yêu cầu bảo hành hoặc sửa chữa, vui lòng gửi email đến warranty@luxwatch.com kèm thông tin đơn hàng của bạn.
        </p>
      </>
    ),
  },
];

export default function ShippingReturnPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <Truck className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-light mb-3">Vận chuyển & Đổi trả</h1>
          <p className="text-gray-600">LuxWatch - Nền tảng thương mại đồng hồ cao cấp</p>
          <p className="text-sm text-gray-500 mt-2">Cập nhật lần cuối: 15/01/2024</p>
        </div>
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.key}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <span className="font-light">{section.title}</span>
                </div>
                <span className="text-gray-400">
                  {expanded === section.key ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </span>
              </button>
              {expanded === section.key && (
                <div className="p-4 bg-gray-50 border-t">{section.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
