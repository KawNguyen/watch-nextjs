/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.seikowatches.com",
      },
      {
        protocol: "https",
        hostname: "www.danielwellington.com",
      },
      {
        protocol: "https",
        hostname: "assets.tissotwatches.com",
      },
      {
        protocol: "https",
        hostname: "www.omegawatches.com",
      },
      {
        protocol: "https",
        hostname: "media.richardmille.com",
      },
      {
        protocol: "https",
        hostname: "media.rolex.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.gq-magazine.co.uk",
      }
      
    ],
  },
};

export default nextConfig;
