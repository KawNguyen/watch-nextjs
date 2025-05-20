import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[72%] h-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
        <div className="absolute top-10 left-10">
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={160} height={160} />
          </Link>
        </div>
        <Image
          src="/images/auth.webp"
          alt="logo"
          width={1600}
          height={900}
          className="w-full object-cover h-full"
        />
      </div>
      <div className="lg:w-[28%]">
        <div className="w-full flex justify-center items-center">
          <Image src="/images/logo.png" alt="logo" width={160} height={160} />
        </div>
        {children}
      </div>
    </div>
  )
};

export default layout;
