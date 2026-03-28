import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath: "/reimagined-succotash",
  images: { unoptimized: true },
};

export default nextConfig;
