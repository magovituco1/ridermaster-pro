'use client';

import React from 'react';

/**
 * Fondo oficial RiderMaster Pro - Negro profundo con iluminación de escenario sutil.
 * Garantiza legibilidad máxima en cualquier entorno de producción.
 */
export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505] no-print">
      {/* Capa de atmósfera oscura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#080808] to-[#0a0a0a]" />
      
      {/* Sutiles haces de luz de escenario */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M70% 0 L95% 100% L60% 100% Z" fill="url(#beam-gold)" className="animate-pulse" />
        <path d="M20% 0 L40% 100% L0% 100% Z" fill="url(#beam-gold)" className="animate-pulse" style={{ animationDelay: '1s' }} />
      </svg>
      
      {/* Textura de grano sutil para profundidad visual */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
    </div>
  );
};
