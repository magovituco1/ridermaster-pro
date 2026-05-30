'use client';

import React from 'react';

export const StageBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0D0D0D] no-print">
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated Beams */}
        <g className="animate-pulse">
          <path d="M10% 0 L20% 100% L0% 100% Z" fill="url(#beam)" transform="rotate(-15 10% 0)">
            <animateTransform attributeName="transform" type="rotate" from="-10 10% 0" to="10 10% 0" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M80% 0 L90% 100% L70% 100% Z" fill="url(#beam)" transform="rotate(15 80% 0)">
            <animateTransform attributeName="transform" type="rotate" from="10 80% 0" to="-10 80% 0" dur="10s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Rigging Silhouettes */}
        <g stroke="#222" strokeWidth="2" opacity="0.5">
          <line x1="0" y1="50" x2="100%" y2="50" />
          <line x1="0" y1="60" x2="100%" y2="60" />
          <path d="M50 50 L45 80 M150 50 L145 80 M250 50 L245 80" />
        </g>
        
        {/* Drifting silhouettes (dust/smoke feel) */}
        <circle cx="20%" cy="40%" r="100" fill="#D4AF37" opacity="0.03" filter="blur(60px)">
          <animate attributeName="cx" values="20%;25%;20%" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="70%" cy="60%" r="120" fill="#B35F37" opacity="0.03" filter="blur(80px)">
          <animate attributeName="cy" values="60%;55%;60%" dur="15s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
};
