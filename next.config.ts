
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Exportación estática obligatoria para Electron local
  output: 'export',
  // Genera carpetas con index.html para rutas limpias en el sistema de archivos
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
      // Evita que Electron intente cargar módulos de servidor de Node
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
      };
    }
    // Ignora telemetría y logs de Genkit que requieren conexión en build time
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /@genkit-ai/ }
    ];
    return config;
  },
};

export default nextConfig;
