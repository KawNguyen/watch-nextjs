"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useCartQuery } from "@/queries/cart";
import { CartItemCard } from "./cart-item-card";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart";
import { Checkbox } from "@/components/ui/checkbox";
import { formatMoney } from "@/lib/utils";
import { useCartMutation } from "@/mutation/cart.mutation";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { useCheckoutStore } from "@/store/checkout.store";

export function CartSheet() {
  const router = useRouter();
  const { data: cartItems = [] } = useCartQuery();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const { deleteCartItem } = useCartMutation();
  const { isAuthenticated } = useAuthStore();
  const { items: cartItemsStore } = useCartStore();

  const cartItemsToDisplay = isAuthenticated ? cartItems : cartItemsStore;

  const handleSelectChange = (id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(
        new Set(cartItemsToDisplay.map((item: CartItem) => item.id))
      );
    } else {
      setSelectedIds(new Set());
    }
  };

  const { setSelectedItems } = useCheckoutStore();
  const handleCheckout = () => {
    setSelectedItems(selectedItems);
    setOpen(false);
    router.push("/checkout");
  };

  const selectedItems = cartItemsToDisplay.filter((item: CartItem) =>
    selectedIds.has(item.id)
  );

  const totalPrice = selectedItems.reduce(
    (sum: number, item: CartItem) => sum + item.watch.price * item.quantity,
    0
  );

  const isAllSelected = selectedIds.size === cartItemsToDisplay.length;
  const isIndeterminate =
    selectedIds.size > 0 && selectedIds.size < cartItemsToDisplay.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <div className="relative h-full w-full cursor-pointer">
              <ShoppingCart />
              {cartItemsToDisplay.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsToDisplay.length}
                </span>
              )}
            </div>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Cart</p>
        </TooltipContent>
      </Tooltip>

      <SheetContent className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cartItemsToDisplay.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                  className="h-4 w-4"
                  aria-label="Select all"
                  ref={(el) => {
                    if (el) {
                      (el as HTMLInputElement).indeterminate = isIndeterminate;
                    }
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {isAllSelected
                    ? "Deselect All"
                    : isIndeterminate
                    ? "Some items selected"
                    : "Select All"}
                </span>
              </div>

              <div className="space-y-4">
                {cartItemsToDisplay.map((item: CartItem, index: number) => (
                  <CartItemCard
                    key={item.id}
                    item={{
                      ...item,
                      selected: selectedIds.has(item.id),
                    }}
                    onSelectChange={handleSelectChange}
                    isLastItem={index === cartItems.length - 1}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        {cartItemsToDisplay.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-lg">
                {formatMoney(totalPrice, "en-US", "USD")}
              </span>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  {selectedItems.length} item
                  {selectedItems.length > 1 ? "s" : ""} selected
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    deleteCartItem.mutate(Array.from(selectedIds), {
                      onSuccess: () => setSelectedIds(new Set()),
                    })
                  }
                  disabled={deleteCartItem.isPending}
                  className="hover:bg-red-50"
                >
                  <Trash2 className="text-red-500" />
                </Button>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              Checkout ({selectedItems.length})
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
