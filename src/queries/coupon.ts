import { couponApi } from "@/services/coupon";
import { useQuery } from "@tanstack/react-query";

export const useCouponsQuery = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: () => couponApi.getAllCoupons().then((res) => res.data.items),
  });
};

export const useCouponByCodeQuery = (code: string) => {
  return useQuery({
    queryKey: ["coupon", code],
    queryFn: () =>
      couponApi.getCouponsByCode(code).then((res) => res.data.item),
    enabled: !!code,
  });
};

export const useCouponsUserCanUseQuery = (orderValue: number) => {
  return useQuery({
    queryKey: ["coupons-available-user-can-use", orderValue],
    queryFn: () =>
      couponApi.geCouponUserCanUse(orderValue).then((res) => res.data.items),
    enabled: orderValue > 0,
  });
};
