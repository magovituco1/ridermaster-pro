'use client';

import React from 'react';
import Image from 'next/image';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black no-print">
      <div className="absolute inset-0 opacity-50">
        <Image 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop"
          alt="Stage Lighting Background"
          fill
          className="object-cover object-center grayscale-[0.2]"
          priority
          data-ai-hint="stage lights"
        />
      </div>
      
      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M5% 0 L15% 100% L-5% 100% Z" fill="url(#beam)" className="animate-pulse" />
        <path d="M95% 0 L105% 100% L85% 100% Z" fill="url(#beam)" className="animate-pulse" />
      </svg>
    </div>
  );
};