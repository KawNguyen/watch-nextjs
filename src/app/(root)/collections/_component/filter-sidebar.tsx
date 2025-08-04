import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import WatchFilters from "./watch-filters";

interface FilterSidebar {
  className?: string;
}

export default function FilterSidebar({ className }: FilterSidebar) {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline">
          <Filter className="size-4" />
          Bộ Lọc
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className={className}>
        <WatchFilters />
      </SheetContent>
    </Sheet>
  );
}
