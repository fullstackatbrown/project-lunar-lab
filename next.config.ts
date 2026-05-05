import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoBasePath = "/project-lunar-lab";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? repoBasePath : "",
  assetPrefix: isProd ? `${repoBasePath}/` : "",
  trailingSlash: true,
};

export default nextConfig;
