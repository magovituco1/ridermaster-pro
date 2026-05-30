
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 'export' es obligatorio para aplicaciones Electron que se distribuyen en pendrive
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Necesario para que las imágenes funcionen sin un servidor Next.js activo
  },
  typescript: {
    ignoreBuildErrors: true, // Acelera el empaquetado para distribución
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
