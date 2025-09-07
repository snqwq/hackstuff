import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'shop.flipperzero.one',
      'www.rtl-sdr.com'
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
