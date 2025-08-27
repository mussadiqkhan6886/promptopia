import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Define the option at the root level—not inside `experimental`
  serverExternalPackages: ["mongoose"],

  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
