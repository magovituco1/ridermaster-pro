
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Exportación estática obligatoria para aplicaciones Electron
  output: 'export',
  // Genera carpetas con index.html para que las rutas funcionen sin servidor (file://)
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  typescript: {
    // Evitamos bloqueos por errores menores en desarrollo local
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Evita que Electron intente cargar módulos de Node que no existen en el navegador durante el build de Next.js
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
      };
    }
    // Ignora advertencias y errores de módulos que solo funcionan en servidor
    config.ignoreWarnings = [
      { module: /@opentelemetry/ },
      { module: /@genkit-ai/ },
      { module: /google-auth-library/ }
    ];
    return config;
  },
};

export default nextConfig;
