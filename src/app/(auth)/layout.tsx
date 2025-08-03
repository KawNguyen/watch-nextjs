import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen w-screen flex bg-gray-100">
      <div className="hidden lg:block w-[68%] relative">
        <Image
          src="/images/auth.webp"
          alt="auth background"
          width={1600}
          height={900}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-10 left-10 z-10">
          <Link href="/">
            <Image src="/images/logo/logo-white-text.png" alt="logo" width={160} height={160} />
          </Link>
        </div>
      </div>

      <div className="lg:w-[32%] w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image
                src="/images/logo/logo-black.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
