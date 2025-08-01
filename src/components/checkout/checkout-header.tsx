import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CheckoutHeader() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Shop
            </Link>
          </div>
          {/* <div className="text-2xl font-bold text-gray-900">KronLux</div> */}
          <Image
            src="/images/logo/logo-black.png"
            alt="KronLux"
            width={80}
            height={80}
            className="h-16 w-auto object-contain"
          />
          <div className="w-24"></div>
        </div>
      </div>
    </header>
  );
}
