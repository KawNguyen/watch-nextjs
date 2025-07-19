import { CartItem } from "@/types/cart";
import { Watch } from "@/types/watch";
import { create } from "zustand";
import { createUUId } from "@/lib/utils";
import { toast } from "sonner";

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
        toast.success(
          `Updated ${watch.name} quantity to ${existing.quantity + quantity}`
        );
        return {
          items: state.items.map((item) =>
            item.watch.id === watch.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      toast.success(`Added item to cart successfully.`);
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
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (quantity === 0) {
          toast.success(`Removed ${item.watch.name} from cart`);
        } else {
          toast.success(`Updated ${item.watch.name} quantity to ${quantity}`);
        }
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    });
  },

  removeFromCartStore: (id) => {
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        toast.success(`Removed ${item.watch.name} from cart`);
      }
      return {
        items: state.items.filter((item) => item.id !== id),
      };
    });
  },

  clearCartStore: () => {
    toast.success("Cart cleared");
    set({ items: [] });
  },
}));
