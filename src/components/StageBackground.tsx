'use client';

import React from 'react';
import Image from 'next/image';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505] no-print">
      <div className="absolute inset-0 opacity-40">
        <Image 
          src="https://images.unsplash.com/photo-1514525253361-bee8718a3427?q=80&w=2000&auto=format&fit=crop"
          alt="Technical Stage Background"
          fill
          className="object-cover object-center grayscale-[0.3] contrast-[1.1]"
          priority
          data-ai-hint="concert stage"
        />
      </div>
      
      {/* Dark overlay to ensure text legibility as seen in the RiderMaster aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <g className="animate-pulse">
          <path d="M10% 0 L20% 100% L0% 100% Z" fill="url(#beam)">
            <animateTransform attributeName="transform" type="rotate" from="-10 10% 0" to="10 10% 0" dur="10s" repeatCount="indefinite" />
          </path>
          <path d="M90% 0 L100% 100% L80% 100% Z" fill="url(#beam)">
            <animateTransform attributeName="transform" type="rotate" from="10 90% 0" to="-10 90% 0" dur="12s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
};