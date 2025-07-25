import Footer from "@/components/footer";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <TooltipProvider>
        <Header />
        {children}
        <Footer />
      </TooltipProvider>
    </main>
  );
};

export default layout;
