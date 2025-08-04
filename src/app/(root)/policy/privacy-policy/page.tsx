"use client";

import { useState } from "react";
import {
  Shield,
  Eye,
  Lock,
  UserCircle,
  Bell,
  Server,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Shield className="w-8 h-8 mx-auto mb-4 text-gray-700" />
          <h1 className="text-3xl font-light mb-3">Chính sách bảo mật</h1>
          <p className="text-gray-600">
            LuxWatch - Nền tảng thương mại điện tử đồng hồ cao cấp
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cập nhật lần cuối: 15 tháng 1, 2024
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-light mb-4">Quyền riêng tư của bạn rất quan trọng</h2>
          <p className="text-gray-600 leading-relaxed">
            Tại LuxWatch, chúng tôi coi trọng quyền riêng tư của bạn. Chính sách này phác thảo
            cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn
            sử dụng trang web và dịch vụ của chúng tôi. Chúng tôi cam kết duy trì
            sự tin tưởng và tự tin của khách hàng quý giá.
          </p>
        </div>

        {/* Key Privacy Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg">
            <Lock className="w-6 h-6 text-blue-600 mb-3" />
            <h3 className="font-medium mb-2">Mua sắm an toàn</h3>
            <p className="text-sm text-gray-600">Giao dịch được mã hóa SSL</p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <Eye className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-medium mb-2">Minh bạch dữ liệu</h3>
            <p className="text-sm text-gray-600">Chính sách sử dụng dữ liệu rõ ràng</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600 mb-3" />
            <h3 className="font-medium mb-2">Tuân thủ GDPR</h3>
            <p className="text-sm text-gray-600">Tiêu chuẩn bảo mật dữ liệu châu Âu</p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("information")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-gray-600" />
                <span className="font-light">Thông tin chúng tôi thu thập</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "information" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "information" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Chúng tôi thu thập thông tin cá nhân mà bạn tự nguyện cung cấp
                  cho chúng tôi khi bạn đăng ký trên trang web của chúng tôi, đặt hàng,
                  đăng ký nhận bản tin hoặc liên hệ với dịch vụ khách hàng của chúng tôi.
                  Thông tin này có thể bao gồm tên, địa chỉ email, địa chỉ giao hàng,
                  số điện thoại và thông tin thanh toán của bạn.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Chúng tôi cũng tự động thu thập một số thông tin về thiết bị của bạn,
                  bao gồm địa chỉ IP, loại trình duyệt và các mẫu duyệt web thông qua
                  cookie và các công nghệ tương tự.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("usage")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-gray-600" />
                <span className="font-light">Chúng tôi sử dụng dữ liệu của bạn như thế nào</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "usage" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "usage" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Chúng tôi sử dụng thông tin cá nhân của bạn để xử lý và hoàn tất
                  đơn hàng, giao tiếp với bạn về các giao dịch mua hàng, cung cấp
                  hỗ trợ khách hàng và gửi cho bạn các thông báo tiếp thị nếu bạn
                  đã đồng ý.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Chúng tôi cũng sử dụng dữ liệu của bạn để cải thiện trang web,
                  phân tích các mẫu sử dụng, ngăn chặn gian lận và tuân thủ các
                  nghĩa vụ pháp lý.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("security")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="font-light">Bảo mật dữ liệu</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "security" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "security" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Chúng tôi thực hiện các biện pháp kỹ thuật và tổ chức phù hợp
                  để bảo vệ dữ liệu cá nhân của bạn khỏi việc truy cập trái phép,
                  thay đổi, tiết lộ hoặc phá hủy.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Tất cả các giao dịch thanh toán đều được mã hóa bằng công nghệ SSL,
                  và chúng tôi không lưu trữ thông tin thẻ tín dụng đầy đủ của bạn trên
                  máy chủ của mình.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("communication")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-light">Tùy chọn giao tiếp</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "communication" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "communication" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bạn có thể quản lý tùy chọn giao tiếp của mình bằng cách cập nhật
                  cài đặt tài khoản hoặc nhấp vào liên kết hủy đăng ký trong các
                  email tiếp thị của chúng tôi.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Chúng tôi vẫn sẽ gửi cho bạn các thông báo liên quan đến dịch vụ,
                  chẳng hạn như xác nhận đơn hàng và thông báo tài khoản quan trọng,
                  ngay cả khi bạn chọn không nhận các thông báo tiếp thị.
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("rights")}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <span className="font-light">Quyền riêng tư của bạn</span>
              </div>
              <span className="text-gray-400">
                {expandedSection === "rights" ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </span>
            </button>
            {expandedSection === "rights" && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tùy thuộc vào vị trí của bạn, bạn có thể có một số quyền nhất định
                  liên quan đến dữ liệu cá nhân của mình, bao gồm quyền truy cập,
                  chỉnh sửa, xóa hoặc hạn chế việc xử lý dữ liệu của bạn.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi tại
                  privacy@luxwatch.com với yêu cầu cụ thể của bạn.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Đối với các yêu cầu liên quan đến quyền riêng tư, vui lòng liên hệ với chúng tôi tại:</p>
          <p className="mt-1">kronlux@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
