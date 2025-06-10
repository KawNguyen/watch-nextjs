import { formatTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MapPin } from "lucide-react";

const TimeLocation = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentTime) return <Skeleton className="w-16 h-4 bg-gray-700" />;

  return (
    <div className="flex items-center justify-center">
      <MapPin size={16} />: {formatTime(currentTime)}
    </div>
  );
};

export default TimeLocation;
