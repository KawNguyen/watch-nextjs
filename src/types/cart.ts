import { Watch } from "./watch";

export interface Images {
  absolute_url: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  watch: Watch;
}
