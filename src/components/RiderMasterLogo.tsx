import React from 'react';

export const RiderMasterLogo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full aspect-square drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded Container */}
        <rect width="100" height="100" rx="16" fill="#0D0D0D" />
        <rect x="2" y="2" width="96" height="96" rx="14" stroke="#D4AF37" strokeWidth="2" />
        
        {/* Clipboard Body */}
        <path d="M30 25C30 22.7909 31.7909 21 34 21H66C68.2091 21 70 22.7909 70 25V75C70 77.2091 68.2091 79 66 79H34C31.7909 79 30 77.2091 30 75V25Z" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="1.5" />
        <path d="M42 18H58V23H42V18Z" fill="#D4AF37" rx="2" />
        <circle cx="50" cy="19.5" r="1.5" fill="#0D0D0D" />

        {/* Technical Lines/Icons inside clipboard */}
        <g stroke="#D4AF37" strokeWidth="1" opacity="0.6">
          <line x1="38" y1="32" x2="62" y2="32" />
          <line x1="38" y1="40" x2="55" y2="40" />
          <line x1="38" y1="48" x2="60" y2="48" />
          <line x1="38" y1="56" x2="50" y2="56" />
          <line x1="38" y1="64" x2="58" y2="64" />
        </g>

        {/* The Spotlight Overlay (The characteristic icon feature) */}
        <circle cx="72" cy="72" r="18" fill="#0D0D0D" stroke="#D4AF37" strokeWidth="2" />
        <g transform="translate(62, 62) scale(0.6)">
          <path d="M10 5L20 25L0 25Z" fill="#D4AF37" opacity="0.4" transform="rotate(45 10 15)">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M8 8L16 20L4 20Z" fill="#D4AF37" />
        </g>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black tracking-tighter text-primary">RIDER<span className="text-foreground">MASTER</span></span>
        <span className="text-[9px] font-bold tracking-[0.4em] text-accent uppercase">Technical v2.1</span>
      </div>
    </div>
  );
};
