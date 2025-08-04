import { ClockIcon, ShieldIcon, AwardIcon, RefreshCwIcon } from "lucide-react";
import { ProductTrailer } from "./product-trailer";
import { Watch } from "@/types/watch";

const features = [
  {
    icon: ClockIcon,
    title: "Chuyển động chính xác",
    description:
      "Bộ máy tự động Thụy Sĩ với 28.800 dao động mỗi giờ, mang lại độ chính xác tuyệt vời.",
  },
  {
    icon: ShieldIcon,
    title: "Vật liệu cao cấp",
    description:
      "Được chế tác từ thép không gỉ cấp phẫu thuật và mặt kính sapphire chống trầy xước.",
  },
  {
    icon: AwardIcon,
    title: "Chế tác thủ công tinh xảo",
    description:
      "Hoàn thiện thủ công bởi những nghệ nhân đồng hồ với hàng chục năm kinh nghiệm.",
  },
  {
    icon: RefreshCwIcon,
    title: "Di sản bền vững",
    description:
      "Được thiết kế để truyền lại qua nhiều thế hệ với sự chăm sóc và bảo dưỡng đúng cách.",
  },
];

const specifications = [
  {
    label: "Dự trữ năng lượng",
    value: "72 giờ",
  },
  {
    label: "Độ chính xác",
    value: "+/- 2 giây/ngày",
  },
  {
    label: "Bảo hành",
    value: "2 năm",
  },
];

export const ProductFeatures = ({ watch }: { watch: Watch }) => {
  return (
    <section className="py-16 my-4 rounded-md bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Sự hoàn hảo vượt trội
          </h2>
          <p className="mt-4 text-lg text-gray-600 w-full mx-auto">
            Chiếc
            <span className="m-1 strong font-bold">{watch?.name}</span>
            không chỉ là một chiếc đồng hồ mà còn là minh chứng cho độ chính xác
            và tay nghề tinh xảo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="flex justify-around items-center border-t border-b border-gray-200 py-5 px-4">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className={`text-left ${
                  index !== specifications.length - 1 ? "mr-8" : ""
                }`}
              >
                <p className="text-sm font-medium text-gray-900">
                  {spec.label}
                </p>
                <p className="text-2xl font-bold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full mt-16">
          <ProductTrailer videoUrl={watch?.videoUrl} />
        </div>
      </div>
    </section>
  );
};
