
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
      // Prevents Electron/Next from trying to load Node modules in the browser bundle
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
        http2: false,
        perf_hooks: false,
        async_hooks: false,
        canvas: false,
        "inspector": false,
        "undici": false,
      };
    }
    // Ignore warnings and errors for modules that only work on the server (like Genkit/gRPC)
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /@genkit-ai/ },
      { module: /google-auth-library/ },
      { module: /@grpc\/grpc-js/ },
      { module: /genkit/ },
      { module: /async_hooks/ }
    ];
    return config;
  },
};

export default nextConfig;
