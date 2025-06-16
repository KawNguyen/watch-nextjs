"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const routes = [
  {
    title: "Our Products",
    children: [
      { path: "/products", title: "All products" },
      { path: "/products?gender=Men", title: "Men" },
      { path: "/products?gender=Women", title: "Women" },
      { path: "/products?gender=Unisex", title: "Unisex" },
    ],
  },
  {
    title: "Support",
    children: [
      { path: "/support/about-us", title: "About Us" },
      { path: "/support/contact", title: "Contact" },
      { path: "/support/faq", title: "FAQ" },
    ],
  },
  {
    title: "Policy",
    children: [
      { path: "/policy/term-of-use", title: "Term Of Use" },
      { path: "/policy/privacy-policy", title: "Privacy Policy" },
      { path: "/policy/shipping-return", title: "Shipping And Returns" },
      { path: "/policy/refund-policy", title: "Refund Policy" },
    ],
  },
];

const icons = [
  {
    icon_social: <Facebook size={24} />,
    url: "https://www.facebook.com/iambot710?locale=vi_VN",
  },
  {
    icon_social: <Instagram size={24} />,
    url: "https://www.instagram.com/iamkhoa29/",
  },
  {
    icon_social: <Youtube size={24} />,
    url: "https://www.youtube.com/@hailoc3403",
  },
];
const Footer = () => {
  return (
    <div className="bg-white text-black border-t">
      <div className="container mx-auto py-10 grid md:grid-cols-4 gap-8">
        {/* Logo & Social */}
        <div className="px-4 flex flex-col justify-between space-y-4">
          <div className="font-bold text-xl">FROM LUXWATCH INC</div>
          <div>THE LUXURIOUS WATCH</div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="icon"
              width={160}
              height={160}
              className="object-contain"
            />
          </Link>
          <div className="flex space-x-4">
            {icons.map((icon, index) => (
              <Link
                key={index}
                href={icon.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary-600"
              >
                {icon.icon_social}
              </Link>
            ))}
          </div>
        </div>

        {/* Routes */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 px-4 md:px-0 gap-4">
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
        </div>
      </div>

      {/* Bottom info */}
      <div className="border-t mt-6">
        <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center text-sm px-4">
          <p>tranhailoc7@gmail.com</p>
          <p>khoanguyencool12@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
