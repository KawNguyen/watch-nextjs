import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export function Step3Success({ returnId }: { returnId: string | null }) {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Yêu cầu đổi trả đã được gửi thành công
        </h3>
        <p className="text-gray-600">
          Yêu cầu đổi trả của bạn đã được gửi thành công. Bạn sẽ nhận được email
          xác nhận trong vòng 1 giờ.
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Mã yêu cầu:</span>
          <Badge variant="secondary"></Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">
            Thời gian xử lý dự kiến:
          </span>
          <span className="text-sm font-medium">48-72 tiếng</span>
        </div>
      </div>
    </div>
  );
}
