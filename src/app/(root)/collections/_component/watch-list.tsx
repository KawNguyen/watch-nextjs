import WatchCard from "@/components/watch-card";
import { Watch } from "@/types/watch";

interface WatchListProps {
  watchesData?: Watch[];
  isFetching?: boolean;
}

export default function WatchList({ watchesData, isFetching }: WatchListProps) {
  if (isFetching) return <WatchListSkeleton />;

  if (!watchesData?.length) {
    return (
      <div className="size-full flex items-center justify-center">
        No watches found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
      {watchesData.map((watch) => (
        <WatchCard key={watch.id} watchData={watch} />
      ))}
    </div>
  );
}

function WatchListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 h-48 rounded-lg"
        />
      ))}
    </div>
  );
}