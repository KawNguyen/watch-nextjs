import WatchCard from "@/components/watch-card";
import { Watch } from "@/types/watch";

export default function WatchList({ watchesData }: { watchesData?: Watch[] }) {
  if (!watchesData?.length) {
    return (
      <div className="size-full flex items-center justify-center">
        No watches found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {watchesData.map((watch) => (
        <WatchCard key={watch.id} watchData={watch} />
      ))}
    </div>
  );
}
