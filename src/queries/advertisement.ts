import { advertisementAPI } from "@/services/advertisement";
import { useQuery } from "@tanstack/react-query";

export const useGetAdvertisements = () => {
  return useQuery({
    queryKey: ["advertisements"],
    queryFn: () =>
      advertisementAPI.getAdvertisements().then((res) => res.data.items),
  });
};
