import { movementApi } from "@/services/movement";
import { useQuery } from "@tanstack/react-query";

export const useMovements = () =>
  useQuery({
    queryKey: ["movements"],
    queryFn: movementApi.fetchAll,
  });
