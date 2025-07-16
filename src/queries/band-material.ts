import { bandMaterialApi } from "@/services/band-material";
import { useQuery } from "@tanstack/react-query";

export const useBandMaterials = () =>
  useQuery({
    queryKey: ["band-materials"],
    queryFn: bandMaterialApi.fetchAll,
  });