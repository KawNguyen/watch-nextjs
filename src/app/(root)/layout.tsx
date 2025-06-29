import Footer from "@/components/footer";
import Header from "@/components/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <TooltipProvider>
        <Header />
        {children}
        <Footer />
          <Toaster />
      </TooltipProvider>
    </main>
  );
};  

export default layout;
