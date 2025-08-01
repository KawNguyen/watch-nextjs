"use client";
import Image from "next/image";
import Link from "next/link";

import { icons, routes } from "@/constant/routes";

const Footer = () => {
  return (
    <div className="bg-white text-black border-t">
      <div className="container mx-auto py-10 grid md:grid-cols-4 gap-8">
        <div className="px-4 flex flex-col space-y-4">
          <div className="font-bold text-xl">WELCOME TO KRONLUX INC</div>
          <div>THE LUXURIOUS WATCH</div>
          <Link href="/">
            <Image
              src="/images/logo/logo-black.png"
              alt="icon"
              width={160}
              height={160}
              className="object-contain"
            />
            <span className="text-3xl font-semibold">KronLux</span>
          </Link>
          <div className="flex-1" />
          <div className="pt-2"></div>
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 px-4 md:px-0 gap-4">
          {routes.map((route, index) => (
            <div key={index}>
              <div className="mb-4 font-bold text-xl">{route.title}</div>
              <div className="flex flex-col space-y-2">
                {route.children.map((subRoute, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subRoute.path}
                    className="text-black hover:text-secondary-600 relative group"
                  >
                    {subRoute.title}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="w-full col-span-2 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px] xl:min-h-[400px] flex items-center">
            <div className="relative w-full h-full min-h-[inherit] rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3779998049076!2d106.67510361062003!3d10.737439289364799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fad3fb62a95%3A0xa9576c84a879d1fe!2zMTgwIENhbyBM4buXLCBQaMaw4budbmcgNCwgUXXhuq1uIDgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaWV0bmFt!5e1!3m2!1sen!2s!4v1750660661217!5m2!1sen!2s"
                className="absolute top-0 left-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t mt-6">
        <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center text-sm px-4">
          <p>kronLux@gmailskibidi.com</p>
          <div className="flex space-x-4 justify-start">
            {icons.map((icon, index) => (
              <Link
                key={index}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary-600 "
              >
                <icon.icon_social className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
