/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/v1/storage/buckets/**",
      },
      {
        protocol: "https",
        hostname: "s.wordpress.com",
        pathname: "/mshots/v1/**",
      },
    ],
  },
};

export default nextConfig;