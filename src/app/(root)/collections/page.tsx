import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import WatchesContainer from "./_component/watch-container";
import { watchesApi } from "@/services/watches";

export default async function WatchesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["watches", 1],
    queryFn: () => watchesApi.fetchAll(1),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <WatchesContainer />
    </HydrationBoundary>
  );
}
