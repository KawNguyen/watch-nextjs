import { CartItem } from "@/types/cart";
import { create } from "zustand";

const LOCAL_KEY = "checkout_selected_items";

function getInitialSelectedItems(): CartItem[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(LOCAL_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
  }
  return [];
}

interface CheckoutState {
  selectedItems: CartItem[];
  setSelectedItems: (items: CartItem[]) => void;
  clearSelectedItems: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  selectedItems: getInitialSelectedItems(),
  setSelectedItems: (items) => {
    set({ selectedItems: items });
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    }
  },
  
  clearSelectedItems: () => {
    set({ selectedItems: [] });
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_KEY);
    }
  },
}));
