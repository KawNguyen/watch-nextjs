import { Headset } from "lucide-react";
import TimeLocation from "../time-location";
import SaleSlider from "./sale-slider";

const PanelWrapper = () => {
  return (
    <div className="bg-gray-900 text-white text-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Free shipping for all orders
            </span>
            <span className="hidden md:block">|</span>
            <span className="hidden md:block">2 - year warranty</span>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[560px] z-0">
            <SaleSlider />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex justify-center items-center">
              <Headset size={16} />: 1900-1234
            </span>
            <span className="hidden md:block">|</span>
            {/* <div className="flex items-center gap-2">
                <Button variant={"ghost"}>VN</Button>
                <span>/</span>
                <Button variant={"ghost"}>EN</Button>
              </div> */}
            <TimeLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelWrapper;
