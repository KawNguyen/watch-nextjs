import {
  ShieldCheckIcon,
  TruckIcon,
  RefreshCwIcon,
  ClockIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const benefits = [
    {
      icon: <ShieldCheckIcon size={32} className="text-gray-900" />,
      title: "Cam kết chính hãng",
      description:
        "Mỗi chiếc đồng hồ đều đi kèm giấy chứng nhận chính hãng và bảo hành 5 năm.",
    },
    {
      icon: <TruckIcon size={32} className="text-gray-900" />,
      title: "Miễn phí vận chuyển",
      description:
        "Miễn phí giao hàng nhanh trên toàn thế giới cho tất cả đơn hàng.",
    },
    {
      icon: <RefreshCwIcon size={32} className="text-gray-900" />,
      title: "Đổi trả dễ dàng",
      description:
        "Không hài lòng? Đổi trả trong vòng 30 ngày để nhận hoàn tiền 100%.",
    },
    {
      icon: <ClockIcon size={32} className="text-gray-900" />,
      title: "Hỗ trợ trọn đời",
      description:
        "Đội ngũ thợ đồng hồ của chúng tôi luôn sẵn sàng bảo trì và sửa chữa.",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Vì sao chọn KRONLUX
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
