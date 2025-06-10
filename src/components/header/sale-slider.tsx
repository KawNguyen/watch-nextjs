"use client";

import { useEffect, useState } from "react";
import { Flame, Truck, Clock } from "lucide-react";

const messages = [
  <span className="flex justify-center items-center gap-1">
    <Flame className="text-red-600" /> Big Sale up to 50% off on selected models!
  </span>,
  <span className="flex justify-center items-center gap-1">
    <Truck className="text-green-500"/> Free worldwide shipping
  </span>,
  <span className="flex justify-center items-center gap-1">
    <Clock className="text-yellow-500"/> Limited time offer – Shop now!
  </span>,
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
          <div
            key={index}
            className="w-full flex-shrink-0 flex justify-center items-center"
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleSlider;
