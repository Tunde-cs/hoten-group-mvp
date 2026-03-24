import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
};

export default nextConfig;