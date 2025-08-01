import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CartItem } from "@/types/cart";
import { formatMoney } from "@/lib/utils";
import { useCartMutation } from "@/mutation/cart.mutation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";

export function CartItemCard({
  item,
  onSelectChange,
  isLastItem,
}: {
  item: CartItem & { selected: boolean };
  onSelectChange: (id: string, selected: boolean) => void;
  isLastItem: boolean;
}) {
  const { updateQuantity } = useCartMutation();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [localInput, setLocalInput] = useState(item.quantity.toString());

  const { isAuthenticated } = useAuthStore();
  const { updateQuantityCartItemStore } = useCartStore();

  const handleUpdateQuantity = (delta: number) => {
    const nextQuantity = Math.max(1, localQuantity + delta);
    if (isAuthenticated) {
      updateQuantity.mutate({
        cartItemId: item.id,
        newQuantity: nextQuantity,
      });
    } else {
      updateQuantityCartItemStore(item.id, nextQuantity);
    }
    setLocalQuantity(nextQuantity);
  };

  useEffect(() => {
    setLocalInput(localQuantity.toString());
  }, [localQuantity]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuantity !== item.quantity) {
        updateQuantity.mutate({
          cartItemId: item.id,
          newQuantity: localQuantity,
        });
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [localQuantity, item.id, item.quantity, updateQuantity]);

  return (
    <div>
      <div className="flex items-center gap-4 py-2 rounded-lg">
        <Checkbox
          checked={item.selected}
          onCheckedChange={(checked) =>
            onSelectChange(item.id, Boolean(checked))
          }
          className="h-4 w-4"
        />

        <Image
          src={item.watch.images[0]?.absolute_url}
          alt={item.watch.name}
          className="w-20 h-20 object-cover rounded-md"
          width={200}
          height={200}
        />

        <div className="flex-1">
          <h3 className="font-medium">{item.watch.name}</h3>
          <p className="text-gray-600">{formatMoney(item.watch.price)}</p>

          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateQuantity(-1)}
              disabled={localQuantity <= 1 || updateQuantity.isPending}
            >
              −
            </Button>

            <input
              type="number"
              inputMode="numeric"
              className="w-12 text-center border rounded-md h-8 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={localInput}
              onChange={(e) => {
                const raw = e.target.value;
                setLocalInput(raw);

                const parsed = parseInt(raw);
                if (!isNaN(parsed) && parsed >= 1) {
                  setLocalQuantity(parsed);
                }
              }}
            />

            <Button
              variant="outline"
              size="sm"
              disabled={updateQuantity.isPending}
              onClick={() => handleUpdateQuantity(+1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {!isLastItem && <Separator className="my-4" />}
    </div>
  );
}
