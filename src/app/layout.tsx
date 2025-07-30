import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/providers/providers";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KronLux - Watch Store",
  description: "Your one-stop shop for luxury watches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error:
                "flex items-center w-full h-20 p-4 py-2 rounded-lg gap-x-2 bg-red-500 text-black",
              success:
                "flex items-center w-full h-10 p-4 py-2 rounded-lg gap-x-2 bg-green-400 text-white",
              warning:
                "flex items-center w-full h-10 p-4 py-2 rounded-lg gap-x-2 bg-yellow-400 text-black",
              info: "bg-blue-400 w-full h-10  text-white p-4 rounded-lg",
            },
          }}
        />
      </body>
    </html>
  );
}
