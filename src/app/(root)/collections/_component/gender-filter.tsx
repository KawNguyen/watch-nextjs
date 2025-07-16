"use client";

import { cn } from "@/lib/utils";
import { type Gender } from "@/hooks/use-watches-filters";

interface GenderFilterProps {
  selectedGenders: Gender[];
  onToggleGender: (gender: Gender) => void;
}

const genderOptions: { value: Gender; label: string }[] = [
  { value: "MEN", label: "Men" },
  { value: "WOMEN", label: "Women" },
  { value: "UNISEX", label: "Unisex" },
];

export default function GenderFilter({
  selectedGenders,
  onToggleGender,
}: GenderFilterProps) {
  return (
    <div className="space-y-2">
      <span className="text-lg font-medium">Gender</span>
      <div className="flex items-center flex-wrap gap-2">
        {genderOptions.map((option) => {
          const isSelected = selectedGenders.includes(option.value);

          return (
            <button
              type="button"
              key={option.value}
              onClick={() => onToggleGender(option.value)}
              className={cn(
                "font-medium duration-300 rounded-full border px-5 py-1 transition-colors",
                isSelected
                  ? "bg-black text-white border-black"
                  : "text-gray-500 hover:border-black hover:text-black"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}