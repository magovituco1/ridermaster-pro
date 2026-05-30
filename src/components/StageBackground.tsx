
'use client';

import React from 'react';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505] no-print">
      {/* Fondo negro sólido y profundo */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Sutil haz de luz ámbar animado para mantener la estética de escenario sin usar imágenes externas */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M70% 0 L95% 100% L60% 100% Z" fill="url(#beam-gold)" className="animate-pulse" />
      </svg>
      
      {/* Degradado suave para asegurar que el contenido a la izquierda sea perfectamente legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
    </div>
  );
};
