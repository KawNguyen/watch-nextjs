// "use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
