/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config, { isServer }) => {
    // Fix Leaflet image assets in CSS - webpack can fail on node_modules/leaflet PNGs
    if (isServer) {
      config.externals = [...(config.externals || []), "leaflet", "react-leaflet"];
    }
    return config;
  }
};

export default nextConfig;

