import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step1FormProps = {
  formData: {
    reason: string;
    description?: string;
  };
  setFormData: (data: any) => void;
  product: {
    orderId: string;
    orderItemId: string;
  };
};

export function Step1Form({ formData, setFormData, product }: Step1FormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Mã đơn hàng</Label>
          <Input value={product.orderId} disabled />
        </div>
        <div>
          <Label>Mã sản phẩm đơn hàng</Label>
          <Input value={product.orderItemId} disabled />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Lý do đổi trả *</Label>
        <Select
          value={formData.reason}
          onValueChange={(val) =>
            setFormData({
              ...formData,
              reason: val,
              description: "", // reset mô tả nếu chuyển từ "other" sang khác
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn lý do" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="defective">Sản phẩm bị lỗi kỹ thuật</SelectItem>
            <SelectItem value="damaged">
              Sản phẩm bị hư hỏng khi giao
            </SelectItem>
            <SelectItem value="wrong_item">Sản phẩm giao sai</SelectItem>
            <SelectItem value="not_as_described">Không đúng mô tả</SelectItem>
            <SelectItem value="changed_mind">Đổi ý không muốn mua</SelectItem>
            <SelectItem value="size_issue">Sai kích cỡ / không vừa</SelectItem>
            <SelectItem value="quality_issue">Chất lượng không đạt</SelectItem>
            <SelectItem value="other">Lý do khác</SelectItem>
          </SelectContent>
        </Select>

        {formData.reason === "other" && (
          <div className="space-y-1">
            <Label>Mô tả lý do khác *</Label>
            <Input
              type="text"
              placeholder="Nhập lý do..."
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
