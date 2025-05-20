import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { watchesApi } from "@/services/watches";
import WatchesContainer from "@/app/(root)/watches/_component/watch-container";

interface BrandPageProps {
  params: {
    brand: string;
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["watches", "brand", params.brand, 1],
    queryFn: () => watchesApi.fetchByBrand(1, params.brand),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <WatchesContainer brand={params.brand} />
    </HydrationBoundary>
  );
}
