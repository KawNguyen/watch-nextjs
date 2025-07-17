import { CartItem } from "@/types/cart";
import { Watch } from "@/types/watch";
import { create } from "zustand";
import { createUUId } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  addToCartStore: (watch: Watch, quantity?: number) => void;
  updateQuantityCartItemStore: (id: string, quantity: number) => void;
  removeFromCartStore: (id: string) => void;
  clearCartStore: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCartStore: (watch, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((item) => item.watch.id === watch.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.watch.id === watch.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: createUUId(),
            quantity,
            watch,
          },
        ],
      };
    });
  },

  updateQuantityCartItemStore: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  removeFromCartStore: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  clearCartStore: () => set({ items: [] }),
}));
