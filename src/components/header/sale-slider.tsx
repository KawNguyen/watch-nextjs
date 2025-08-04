"use client";

import { useEffect, useState } from "react";
import { Flame, Truck, Clock } from "lucide-react";

const messages = [
  {
    icon: <Flame className="text-red-600" />,
    text: "Giảm giá sốc 50% cho sản phẩm mới",
  },
  {
    icon: <Truck className="text-green-500" />,
    text: "Miễn phí vận chuyển toàn quốc",
  },
  {
    icon: <Clock className="text-yellow-500" />,
    text: "Ưu đãi có thời hạn - Mua ngay!",
  },
];

const SaleSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[560px] mx-auto overflow-hidden relative">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {messages.map((msg, index) => (
          <span
            key={index}
            className="w-full flex-shrink-0 flex justify-center items-center gap-1 text-sm md:text-base"
          >
            {msg.icon}
            {msg.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SaleSlider;
