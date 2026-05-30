
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
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />

      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <g className="animate-pulse">
          <path d="M15% 0 L25% 100% L5% 100% Z" fill="url(#beam)" transform="rotate(-10 15% 0)">
            <animateTransform attributeName="transform" type="rotate" from="-15 15% 0" to="5 15% 0" dur="12s" repeatCount="indefinite" />
          </path>
          <path d="M85% 0 L95% 100% L75% 100% Z" fill="url(#beam)" transform="rotate(10 85% 0)">
            <animateTransform attributeName="transform" type="rotate" from="15 85% 0" to="-5 85% 0" dur="15s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
};
