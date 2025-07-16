import { materialApi } from "@/services/material";
import { useQuery } from "@tanstack/react-query";

export const useMaterials = () =>
  useQuery({
    queryKey: ["materials"],
    queryFn: materialApi.fetchAll,
  });