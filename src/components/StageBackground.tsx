
'use client';

import React from 'react';
import Image from 'next/image';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black no-print">
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop"
          alt="Stage Lighting Background"
          fill
          className="object-cover object-right grayscale-[0.3]"
          priority
          data-ai-hint="concert stage"
        />
      </div>
      
      {/* Degradado oscuro para legibilidad - más fuerte a la izquierda */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      {/* Haces de luz sutiles posicionados a la derecha */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M70% 0 L85% 100% L55% 100% Z" fill="url(#beam)" className="animate-pulse" />
        <path d="M85% 0 L95% 100% L75% 100% Z" fill="url(#beam)" className="animate-pulse" />
      </svg>
    </div>
  );
};
