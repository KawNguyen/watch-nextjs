"use client";

import { useState } from "react";

const categories = [
  "All",
  "Featured",
  "Men Watch",
  "Open source",
  "Research",
  "Women Watch",
  "Hardware",
  "Unisex Watch",
];

interface Props {
  onSelectCategory: (category: string) => void;
}

export default function FilterTabs({ onSelectCategory }: Props) {
  const [active, setActive] = useState("All");

  return (
    <div className="flex items-center flex-wrap gap-2 py-4 px-4">
      <span className="font-medium text-gray-700">Filter:</span>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => {
            setActive(category);
            onSelectCategory(category);
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition 
            ${
              active === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
