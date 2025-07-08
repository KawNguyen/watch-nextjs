"use client";

import { cn } from "@/lib/utils";

interface FilterListProps {
  name: string;
  data: any;
  selectedItems: string[];
  onToggleItem: (itemId: string) => void;
}

export default function FilterList({
  name,
  data,
  selectedItems,
  onToggleItem,
}: FilterListProps) {
  if (!data?.data?.items) return null;

  return (
    <div className="space-y-2">
      <span className="text-lg font-medium">{name}</span>
      <div className="flex items-center flex-wrap gap-2">
        {data.data.items.map((item: any) => {
          const isSelected = selectedItems.includes(item.name);

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onToggleItem(item.name)}
              className={cn(
                "font-medium duration-300 rounded-full border px-5 py-1 transition-colors",
                isSelected
                  ? "bg-black text-white border-black"
                  : "text-gray-500 hover:border-black hover:text-black"
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
