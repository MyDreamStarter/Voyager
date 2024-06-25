/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{missingSuspenseWithCSRBailout: false},
  images: {
    domains: ["img.freepik.com"],
  },
  output: "standalone",
};

export default nextConfig;
