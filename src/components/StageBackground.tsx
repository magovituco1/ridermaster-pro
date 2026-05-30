'use client';

import React from 'react';
import Image from 'next/image';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505] no-print">
      {/* Background Image inspired by the user request */}
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop"
          alt="Stage Background"
          fill
          className="object-cover object-center grayscale-[0.5] contrast-[1.2]"
          priority
        />
      </div>
      
      {/* Heavy Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <g className="animate-pulse">
          <path d="M10% 0 L20% 100% L0% 100% Z" fill="url(#beam)" transform="rotate(-15 10% 0)">
            <animateTransform attributeName="transform" type="rotate" from="-10 10% 0" to="10 10% 0" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M80% 0 L90% 100% L70% 100% Z" fill="url(#beam)" transform="rotate(15 80% 0)">
            <animateTransform attributeName="transform" type="rotate" from="10 80% 0" to="-10 80% 0" dur="10s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
};
