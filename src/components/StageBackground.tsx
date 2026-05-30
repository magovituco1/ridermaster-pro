
'use client';

import React from 'react';

/**
 * Componente de fondo optimizado para RiderMaster Pro.
 * Utiliza un negro profundo y sutiles efectos de iluminación SVG para 
 * garantizar la legibilidad absoluta del texto técnico sin distracciones.
 */
export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black no-print">
      {/* Fondo negro base */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Haz de luz ámbar sutil (SVG) para estética de escenario */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M75% 0 L98% 100% L65% 100% Z" fill="url(#beam-gold)" className="animate-pulse" />
      </svg>
      
      {/* Degradado lateral para suavizar la zona de lectura principal */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
    </div>
  );
};
