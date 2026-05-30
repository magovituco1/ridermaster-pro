
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Mandatory static export for Electron applications
  output: 'export',
  // Generate folders with index.html so routes work without a server (file://)
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevents Electron from trying to load Node modules that don't exist in the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        os: false,
        path: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        child_process: false,
        dns: false,
        readline: false,
        http2: false, // Added http2 fallback to fix Genkit/OpenTelemetry build errors
      };
    }
    // Ignore warnings and errors for modules that only work on the server
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /@genkit-ai/ },
      { module: /google-auth-library/ },
      { module: /@grpc\/grpc-js/ }
    ];
    return config;
  },
};

export default nextConfig;
