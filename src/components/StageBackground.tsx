'use client';

import React from 'react';
import Image from 'next/image';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black no-print">
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop"
          alt="RiderMaster Tech Stage"
          fill
          className="object-cover object-right grayscale-[0.2]"
          priority
          data-ai-hint="concert stage"
        />
      </div>
      
      {/* Degradado oscuro profundo para legibilidad en la parte izquierda */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Haces de luz dinámicos sutiles en la zona derecha */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M75% 0 L90% 100% L60% 100% Z" fill="url(#beam)" className="animate-pulse" />
        <path d="M88% 0 L98% 100% L78% 100% Z" fill="url(#beam)" className="animate-pulse" style={{ animationDelay: '1s' }} />
      </svg>
    </div>
  );
};