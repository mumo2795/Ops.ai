import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["thesvg", "@thesvg/icons"],
};

export default nextConfig;
