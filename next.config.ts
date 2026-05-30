
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
        inspector: false,
        undici: false,
        "node:async_hooks": false,
        "node:events": false,
        "node:util": false,
        "node:path": false,
        "node:os": false,
        "node:crypto": false,
        "node:buffer": false,
        "node:stream": false,
        "node:url": false,
        "node:http": false,
        "node:https": false,
        "node:zlib": false,
      };
    }
    
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /@genkit-ai/ },
      { module: /google-auth-library/ },
      { module: /@grpc\/grpc-js/ },
      { module: /genkit/ },
      { module: /async_hooks/ },
      { module: /node:/ }
    ];
    
    return config;
  },
};

export default nextConfig;
