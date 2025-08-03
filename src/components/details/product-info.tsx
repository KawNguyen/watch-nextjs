import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import { useAuth } from "@/mutation/auth.mutation";
import { useCartMutation } from "@/mutation/cart.mutation";
import { useCartStore } from "@/store/cart.store";
import { Watch } from "@/types/watch";
import { Minus, Plus, Heart } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  watchData: Watch;
  price: number;
}
export function ProductInfo({ watchData, price }: ProductInfoProps) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCartMutation();
  const { addToCartStore } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart.mutate({ watchId: watchData.id, quantity: 1 });
    } else {
      addToCartStore(watchData, 1);
    }
  };
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-around">
        <div className="flex items-center  border-2 rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="hover:bg-gray-100"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-16 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <p className="text-3xl font-semibold text-primary">
            {formatMoney(totalPrice)}
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            className="flex-1 h-12 text-base"
            onClick={() => handleAddToCart()}
            disabled={watchData.inventory.quantity === 0}
            variant={"destructive"}
          >
            {watchData.inventory.quantity === 0 ? `Hết hàng` : `Thêm vào giỏ hàng`}
          </Button>
          <Button className="h-12 w-12" variant="outline">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
