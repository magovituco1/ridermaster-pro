
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export is required for Electron local file:// loading
  output: 'export',
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
      // Prevent bundling Node.js modules that are missing in the browser environment
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
    
    // Suppress warnings related to Node-only packages like Genkit/gRPC
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
